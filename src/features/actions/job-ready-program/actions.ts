"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getCustomerByEmail } from "../customers/actions";
import { Customer, JobReadyProgram } from "@prisma/client";
import { JobReadyProgramInput } from "@/types/schema";
import { checkAuth } from "@/lib/checkAuth";

export async function createJrpApplication(data: JobReadyProgramInput) {
  try {
    await checkAuth();

    // Find the customer by email
    const customer = await getCustomerByEmail(data.email);

    if (!customer || !customer.data) {
      return {
        success: false,
        error: `Customer with email ${data.email} not found`,
      };
    }
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { firstName, middleName, lastName, email, ...applicationData } = data;
    // Create the visa application and connect it to the existing customer
    const application = await prisma.jobReadyProgram.create({
      data: {
        ...applicationData,
        customer: {
          connect: {
            id: customer.data.id,
          },
        },
      },
    });
    revalidatePath("/job-ready-program");
    return { success: true, data: application };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create application record" };
  }
}

export async function updateJrpApplication(
  id: string,
  data: Partial<JobReadyProgramInput & { customer: Customer }>,
) {
  await checkAuth();

  const {
    firstName,
    middleName,
    lastName,
    email,
    customer,
    ...applicationData
  } = data;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  try {
    const updatedApplication = await prisma.jobReadyProgram.update({
      where: { id },
      data: applicationData,
    });
    revalidatePath("/job-ready-program");

    return { success: true, data: updatedApplication };
  } catch (error) {
    console.error("Error updating application record:", error);
    return { success: false, error: "Failed to update application record" };
  }
}

export async function getJrpApplication(
  id: string,
): Promise<(JobReadyProgram & { customer: Customer }) | null> {
  await checkAuth();

  try {
    const application = await prisma.jobReadyProgram.findFirst({
      where: {
        id,
      },
      include: {
        customer: true,
      },
    });
    return application;
  } catch (error) {
    console.error("Error fetching visa application:", error);
    throw new Error("Failed to fetch visa application");
  }
}
export async function getAllJrpApplication(): Promise<
  (JobReadyProgram & { customer: Customer })[] | null
> {
  await checkAuth();

  try {
    const applications = await prisma.jobReadyProgram.findMany({
      include: {
        customer: true,
      },
    });
    return applications;
  } catch (error) {
    console.error("Error fetching JRP applications:", error);
    throw new Error("Failed to fetch JRP applications");
  }
}

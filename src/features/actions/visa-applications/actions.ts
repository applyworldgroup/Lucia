"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getCustomerByEmail } from "../customers/actions";
import { Customer, VisaApplication } from "@prisma/client";
import { VisaApplicationInput } from "@/types/schema";
export async function createVisaApplication(data: VisaApplicationInput) {
  try {
    console.log(data);

    // Find the customer by email
    const customer = await getCustomerByEmail(data.email);

    if (!customer || !customer.data) {
      return {
        success: false,
        error: `Customer with email ${data.email} not found`,
      };
    }
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      firstName,
      middleName,
      lastName,
      email,
      address,
      passportNumber,

      ...applicationData
    } = data;
    // Create the visa application and connect it to the existing customer
    const application = await prisma.visaApplication.create({
      data: {
        ...applicationData,
        customer: {
          connect: {
            id: customer.data.id,
          },
        },
      },
    });
    revalidatePath("/visa-applications");
    return { success: true, data: application };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create application record" };
  }
}

export async function updateVisaApplication(
  id: string,
  data: Partial<VisaApplicationInput & { customer: Customer }>,
) {
  const {
    firstName,
    middleName,
    lastName,
    email,
    address,
    customer,
    passportNumber,

    ...applicationData
  } = data;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  try {
    const updatedApplication = await prisma.visaApplication.update({
      where: { id },
      data: applicationData,
    });
    revalidatePath("/visa-applications");

    return { success: true, data: updatedApplication };
  } catch (error) {
    console.error("Error updating application record:", error);
    return { success: false, error: "Failed to update application record" };
  }
}

export async function getVisaApplication(
  id: string,
): Promise<(VisaApplication & { customer: Customer }) | null> {
  try {
    const application = await prisma.visaApplication.findFirst({
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
export async function getAllVisaApplication(): Promise<
  (VisaApplication & { customer: Customer })[] | null
> {
  try {
    const applications = await prisma.visaApplication.findMany({
      include: {
        customer: true,
      },
    });
    return applications;
  } catch (error) {
    console.error("Error fetching visa applications:", error);
    throw new Error("Failed to fetch visa applications");
  }
}

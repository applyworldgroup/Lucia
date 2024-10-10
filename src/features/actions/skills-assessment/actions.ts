"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getCustomerByEmail } from "../customers/actions";
import { Customer, SkillsAssessment } from "@prisma/client";
import { SkillsAssessmentInput } from "@/types/schema";

export async function createSkillsAssessment(data: SkillsAssessmentInput) {
  try {
    console.log(data);

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

      ...applicationData
    } = data;
    // Create the visa application and connect it to the existing customer
    const application = await prisma.skillsAssessment.create({
      data: {
        ...applicationData,
        customer: {
          connect: {
            id: customer.data.id,
          },
        },
      },
    });
    revalidatePath("/skills-assessment");
    return { success: true, data: application };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Failed to create skills assessment record",
    };
  }
}

export async function updateSkillsAssessment(
  id: string,
  data: Partial<SkillsAssessmentInput & { customer: Customer }>,
) {
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
    const updatedApplication = await prisma.skillsAssessment.update({
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

export async function getSkillsAssessment(
  id: string,
): Promise<(SkillsAssessment & { customer: Customer }) | null> {
  try {
    const application = await prisma.skillsAssessment.findFirst({
      where: {
        id,
      },
      include: {
        customer: true,
      },
    });
    return application;
  } catch (error) {
    console.error("Error fetching skills assessment application:", error);
    throw new Error("Failed to fetch skills assessment application");
  }
}
export async function getAllSkillsAssessment(): Promise<
  (SkillsAssessment & { customer: Customer })[] | null
> {
  try {
    const applications = await prisma.skillsAssessment.findMany({
      include: {
        customer: true,
      },
    });
    return applications;
  } catch (error) {
    console.error("Error fetching skills assessment applications:", error);
    throw new Error("Failed to fetch skills assessment applications");
  }
}

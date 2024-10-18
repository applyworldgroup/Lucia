"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { Company } from "@prisma/client";
import { checkAuth } from "@/lib/checkAuth";

export async function createCompany(data: Company) {
  await checkAuth();

  try {
    const newCompany = await prisma.company.create({
      data,
    });
    revalidatePath("/companies");
    return { success: true, data: newCompany };
  } catch (error) {
    console.error("Error creating company:", error);
    return { success: false, error: "Failed to create company" };
  }
}

export async function updateCompany(id: string, data: Partial<Company>) {
  await checkAuth();
  try {
    const updatedCustomer = await prisma.company.update({
      where: { id },
      data,
    });
    revalidatePath("/companies");

    return { success: true, data: updatedCustomer };
  } catch (error) {
    console.error("Error updating customer:", error);
    return { success: false, error: "Failed to update customer" };
  }
}

export async function getAllCompanies(): Promise<Company[]> {
  await checkAuth();

  try {
    const companies = await prisma.company.findMany();
    return companies;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw new Error("Failed to fetch companies");
  }
}

export async function getCompanyById(id: string): Promise<Company | null> {
  await checkAuth();

  const company = await prisma.company.findUnique({ where: { id } });
  return company;
}
export async function getCompanyByEmail(email: string) {
  const company = await prisma.company.findUnique({ where: { email } });
  return { success: true, data: company };
}

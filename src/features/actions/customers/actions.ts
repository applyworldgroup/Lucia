"use server";

// import { Customer } from '@/types/schema'
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { Customer } from "@prisma/client";
import { checkAuth } from "@/lib/checkAuth";

export async function createCustomer(data: Customer) {
  await checkAuth();
  try {
    const newCustomer = await prisma.customer.create({
      data,
    });
    revalidatePath("/customers");
    return { success: true, data: newCustomer };
  } catch (error) {
    console.error("Error creating customer:", error);
    return { success: false, error: "Failed to create customer" };
  }
}

export async function updateCustomer(id: string, data: Partial<Customer>) {
  await checkAuth();

  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data,
    });
    revalidatePath("/customers");

    return { success: true, data: updatedCustomer };
  } catch (error) {
    console.error("Error updating customer:", error);
    return { success: false, error: "Failed to update customer" };
  }
}

export async function getAllCustomers(): Promise<Customer[]> {
  await checkAuth();

  try {
    const customers = await prisma.customer.findMany();
    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to fetch customers");
  }
}

export async function getCustomerById(id: string) {
  await checkAuth();

  const customer = await prisma.customer.findUnique({ where: { id } });
  return { success: true, data: customer };
}

export async function getCustomerByEmail(email: string) {
  const customer = await prisma.customer.findUnique({ where: { email } });
  return { success: true, data: customer };
}

export async function getCustomerByPassportNumber(passportNumber: string) {
  const customer = await prisma.customer.findUnique({
    where: { passportNumber },
  });
  return { success: true, data: customer };
}

export async function deleteCustomer(id: string) {
  await checkAuth();
  try {
    await prisma.customer.delete({
      where: {
        id,
      },
    });
    revalidatePath("/customers");
    return { success: true };
  } catch (error) {
    console.error("Error deleting customer data :", error);
    return { success: false, error: "Failed to delete customer data" };
  }
}

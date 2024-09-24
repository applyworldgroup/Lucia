"use server";

// import { Customer } from '@/types/schema'
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { Customer } from "@prisma/client";
export async function createCustomer(data: Customer) {
  try {
    const newCustomer = await prisma.customer.create({
      data,
    });

    console.log("New Customer Created", newCustomer);
    revalidatePath("/customers");

    return { success: true, data: newCustomer };
  } catch (error) {
    console.error("Error creating customer:", error);
    return { success: false, error: "Failed to create customer" };
  }
}

export async function updateCustomer(id: string, data: Partial<Customer>) {
  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data,
    });

    console.log("Customer Updated", updatedCustomer);
    revalidatePath("/customers");

    return { success: true, customer: updatedCustomer };
  } catch (error) {
    console.error("Error updating customer:", error);
    return { success: false, error: "Failed to update customer" };
  }
}

export async function getCustomerById(id: string) {
  const customer = await prisma.customer.findUnique({ where: { id } });
  return { success: true, data: customer };
}
export async function getCustomerByEmail(email: string) {
  const customer = await prisma.customer.findUnique({ where: { email } });
  return { success: true, data: customer };
}

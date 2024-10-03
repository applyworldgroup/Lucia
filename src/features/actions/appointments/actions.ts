"use server";

import prisma from "@/lib/db";
import { Appointment } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createAppointment(data: Appointment) {
  console.log(data);
  try {
    const newAppointment = await prisma.appointment.create({
      data,
    });
    revalidatePath("/appointments");
    console.log(newAppointment);
    return { success: true, data: newAppointment };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { success: false, error: "Failed to create appointment" };
  }
}

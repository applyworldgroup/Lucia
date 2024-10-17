"use server";

import { checkAuth } from "@/lib/checkAuth";
import prisma from "@/lib/db";
import { Appointment } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createAppointment(data: Appointment) {
  await checkAuth();
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

export async function UpdateAppointment(
  id: string,
  data: Partial<Appointment>,
) {
  await checkAuth();

  try {
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    revalidatePath("/appointments");
    console.log(updatedAppointment);
    return { success: true, data: updatedAppointment };
  } catch (error) {
    console.error("Error updating appointment:", error);
    return { success: false, error: "Failed to update appointment" };
  }
}

export async function getAllAppointments(): Promise<Appointment[]> {
  await checkAuth();

  try {
    const appointments = await prisma.appointment.findMany({});
    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw new Error("Failed to fetch appointments");
  }
}
export async function deleteAppointment(appointmentId: string) {
  await checkAuth();
  try {
    await prisma.appointment.delete({ where: { id: appointmentId } });
  } catch (error) {
    console.error("Error deleting appointments:", error);
    throw new Error("Failed to delete appointments");
  }
}

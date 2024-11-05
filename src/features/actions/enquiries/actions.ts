"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { checkAuth } from "@/lib/checkAuth";
import { GeneralEnquiry } from "@prisma/client";

export async function getAllEnquiries(): Promise<GeneralEnquiry[]> {
  await checkAuth(); // Ensure user is authenticated

  try {
    const enquiries = await prisma.generalEnquiry.findMany();
    const sortedEnquiries = enquiries
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) 
      .map((enquiry) => ({
        ...enquiry,
        followUpDates: enquiry.follow_up_dates.map(
          (date) => (date instanceof Date ? date.toISOString() : date), 
        ),
      }));

    console.log(sortedEnquiries);
    return sortedEnquiries; // Return sorted result
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    throw new Error("Failed to fetch enquiries");
  }
}


export async function updateEnquiry(
  id: string,
  data: {
    followed_up_by?: string | null;
    follow_up_dates?: string[];
  },
) {
  await checkAuth();

  try {
    const updatedEnquiry = await prisma.generalEnquiry.update({
      where: { id },
      data: {
        ...data,
        follow_up_dates: data.follow_up_dates
          ? data.follow_up_dates.map((date) => new Date(date))
          : undefined,
      },
    });
    revalidatePath("/enquiries");

    return { success: true, data: updatedEnquiry };
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return { success: false, error: "Failed to update enquiry" };
  }
}

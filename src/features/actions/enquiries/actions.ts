"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { checkAuth } from "@/lib/checkAuth";
import { GeneralEnquiry } from "@prisma/client";

export async function getAllEnquiries(): Promise<GeneralEnquiry[]> {
  await checkAuth(); // Ensure user is authenticated

  try {
    const enquiries = await prisma.generalEnquiry.findMany();
    console.log("Fetched enquiries:", enquiries); // Check the structure

    // Map the results to ensure followUpDates are strings
    const result = enquiries.map((enquiry) => ({
      ...enquiry,
      followUpDates: enquiry.follow_up_dates.map(
        (date) => (date instanceof Date ? date.toISOString() : date), // Convert Date to string
      ),
    }));
    console.log(result);
    return result; // No need for casting now
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

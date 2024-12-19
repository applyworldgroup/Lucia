import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { sendEmail } from "@/lib/nodemailer";

export async function GET(request: NextRequest) {
  const token = request.headers.get("cron-job-token");

  if (!token) {
    return NextResponse.json({ error: "No Token provided" }, { status: 401 });
  }

  if (token !== process.env.CRON_JOB_SECRET) {
    return NextResponse.json(
      { error: "Invalid token provided" },
      { status: 401 },
    );
  }

  try {
    const currentDate = new Date();
    const threeMonthsFromNow = new Date(
      currentDate.getTime() + 90 * 24 * 60 * 60 * 1000,
    );
    const oneMonthFromNow = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000,
    );
    const oneWeekFromNow = new Date(
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000,
    );

    const visaApplications = await prisma.visaApplication.findMany({
      include: {
        customer: true,
      },
    });

    for (const application of visaApplications) {
      // Assuming visa expiry is 1 year from applied date. Adjust as needed.
      const visaExpiryDate = new Date(application.visaAppliedDate);
      visaExpiryDate.setFullYear(visaExpiryDate.getFullYear() + 1);

      if (
        visaExpiryDate <= threeMonthsFromNow &&
        visaExpiryDate > oneMonthFromNow
      ) {
        await sendEmail({
          to: application.customer.email,
          subject: "Visa Expiring in 3 Months",
          html: `Dear ${application.customer.firstName}, your visa will expire in 3 months on ${visaExpiryDate.toDateString()}.`,
        });
      } else if (
        visaExpiryDate <= oneMonthFromNow &&
        visaExpiryDate > oneWeekFromNow
      ) {
        await sendEmail({
          to: application.customer.email,
          subject: "Visa Expiring in 1 Month",
          html: `Dear ${application.customer.firstName}, your visa will expire in 1 month on ${visaExpiryDate.toDateString()}.`,
        });
      } else if (visaExpiryDate <= oneWeekFromNow) {
        await sendEmail({
          to: application.customer.email,
          subject: "Visa Expiring in 1 Week",
          html: `Dear ${application.customer.firstName}, your visa will expire in 1 week on ${visaExpiryDate.toDateString()}.`,
        });
      }
    }

    return NextResponse.json({
      message: "Visa expiry checks completed and notifications sent",
      count: visaApplications.length,
    });
  } catch (error) {
    console.error("Error checking visa applications:", error);
    return NextResponse.json(
      { error: "An error occurred while checking visa applications" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

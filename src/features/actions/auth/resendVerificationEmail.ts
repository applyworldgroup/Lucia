"use server"

import jwt from "jsonwebtoken"
import prisma from '@/lib/db';
import { sendEmail } from "@/lib/nodemailer";
export const resendVerificationEmail = async (email: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email }
    });

    if (!existingUser || !existingUser.hashedPassword) {
      return { message: "User not found" };
    }

    if (existingUser.email_verified) {
      return { message: "Email already verified" };
    }

    const existedCode = await prisma.emailVerificationCode.findFirst({
      where: {
        userId: existingUser.id
      }
    })
    //todo: if email is verified and then changed the email_verified to false in user database then when resending the email there won't be code to update it. and it will throw this error. fix it !
    if (!existedCode) {
      return {
        message: "Code not found"
      }
    }

    const sentAt = new Date(existedCode.sentAt);
    const isRequiredTimePassed = new Date().getTime() - sentAt.getTime() > 60000;

    if (!isRequiredTimePassed) {
      return {
        error: "Email already sent, next email in " + (60 - Math.floor((new Date().getTime()) - sentAt.getTime()) / 1000) + " seconds."
      }
    }

    const code = Math.random().toString(36).substring(2, 8)
    const token = jwt.sign({ email: email, code }, process.env.JWT_SECRET!, { expiresIn: '5m' });

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`

    await sendEmail({
      html: `<a href="${url}">Verify your email</a>`,
      subject: "Email Verification link (Hamro Khata)",
      to: email
    })
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    await prisma.emailVerificationCode.upsert({
      where: {
        userId: existingUser.id
      },
      update: {
        code,
        expiresAt
      },
      create: {
        code,
        email,
        expiresAt,
        userId: existingUser.id,
        sentAt: new Date()
      }
    });

    return {
      success: true,
    };

  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: 'An unknown error occurred' };
    }
  }
}
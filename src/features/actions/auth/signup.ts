"use server";

import prisma from "@/lib/db";
import { SignUpInput } from "@/app/auth/signup/page";
import * as argon from "argon2";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/lib/nodemailer";
import { AuthenticatingUserResponse } from "@/types/global-types";

const signUpUser = async (
  data: SignUpInput,
): Promise<AuthenticatingUserResponse> => {
  const { email, password, firstName, lastName } = data;
  const hashedPassword = await argon.hash(password);

  try {
    const allowedDomain = "@applyworldgroup.com.au";
    const specialEmails = ["sisir.phca@gmail.com", "banswikriti123@gmail.com"];

    if (!email.endsWith(allowedDomain) && !specialEmails.includes(email)) {
      throw new Error(
        `Sign-up is restricted to specific company domains or special emails.`,
      );
    }
    const emailInUse = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailInUse) {
      return { error: "Email is already in use." };
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword,
        email_verified: false,
      },
    });

    const code = Math.random().toString(36).substring(2, 8);
    const token = jwt.sign(
      { email: data.email, code },
      process.env.JWT_SECRET!,
      { expiresIn: "5m" },
    );

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`;
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await sendEmail({
      to: data.email,
      subject: "Email Verification link",
      html: `<a href="${url}">Verify your email</a>`,
    });

    await prisma.emailVerificationCode.create({
      data: {
        code,
        email,
        expiresAt,
        userId: user.id,
        sentAt: new Date(),
      },
    });

    return {
      success: true,
      data: {
        user,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "An unknown error occurred",
      };
    }
  }
};

export { signUpUser };

'use server';
import jwt from "jsonwebtoken"
import prisma from '@/lib/db';
import { emailInput } from '@/app/auth/forgot-password/page';
import { AuthenticatingUserResponse } from '@/types/global-types';
import { sendEmail } from "@/lib/nodemailer";

const forgotPassword = async (data: emailInput): Promise<AuthenticatingUserResponse> => {
    const { email } = data;

    try {
        const existingUser = await prisma.user.findFirst({
            where: { email }
        });

        if (!existingUser || !existingUser.hashedPassword) {
            return { error: "User not found" };
        }

        const existingToken = await prisma.resetToken.findFirst({
            where: {
                userId: existingUser.id
            }
        })

        if (existingToken) {
            if (existingToken.expiresAt > new Date()) {
                return { error: "Reset token has already been sent!" }
            }
            else {
                //token expired, delete it
                await prisma.resetToken.delete({
                    where: {
                        id: existingToken.id,
                    }
                })
            }
        }

        const code = Math.random().toString(36).substring(2, 8)
        const token = jwt.sign({ userId: existingUser.id, code }, process.env.JWT_SECRET!, { expiresIn: '5m' });

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await prisma.resetToken.create({
            data: {
                code,
                userId: existingUser.id,
                expiresAt,
            },
        });
        await sendEmail({
            html: `<a href="${url}">Reset your password</a>`,
            subject: "Password Reset Link (Hamro Khata)",
            to: email
        })

        return {
            message: 'If this user exists, they will receive an reset password link in their email.',
            success: true,
        };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        } else {
            return { error: 'An unknown error occurred' };
        }
    }
};

export { forgotPassword };

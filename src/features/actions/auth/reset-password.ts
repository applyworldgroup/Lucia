'use server';
import jwt from "jsonwebtoken"
import prisma from '@/lib/db';
import { AuthenticatingUserResponse } from '@/types/global-types';
import * as argon from 'argon2';
import { resetInput } from "@/app/auth/reset-password/page";

const resetPassword = async (data: resetInput, token: string | null): Promise<AuthenticatingUserResponse> => {
    const { password } = data;
    const hashedPassword = await argon.hash(password);
    if (!token) {
        return {
            error: "Token not found"
        };
    }
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as {
            userId: string
            code: string;
        };
        const passwordResetResult = await prisma.resetToken.findFirst({
            where: {
                userId: decoded.userId,
                code: decoded.code,
            }
        })

        if (!passwordResetResult) {
            return {
                error: "Invalid or expired code was present in your token."
            };
        }
        // await prisma.emailVerificationCode.deleteMany({});
        await prisma.resetToken.delete({
            where: {
                id: passwordResetResult.id
            }
        })

        await prisma.user.update({
            where: {
                id: passwordResetResult.userId
            },
            data: {
                hashedPassword,
            }
        });
        return {
            message: 'Password reset successful',
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

export { resetPassword };

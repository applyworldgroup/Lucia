import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from '@/lib/db';
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { SessionCookie } from "@/types/global-types";

export const GET = async (req: NextRequest) => {
    const url = new URL(req.url)
    const searchParams = url.searchParams
    const token = searchParams.get("token")

    if (!token) {
        return Response.json({
            error: "Invalid token"
        }, {
            status: 400
        })
    }
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as {
            email: string;
            code: string;
        };
        const emailVerificationResult = await prisma.emailVerificationCode.findFirst({
            where: {
                email: decoded.email,
                code: decoded.code,
            }
        })

        if (!emailVerificationResult) {
            return Response.json({
                error: "Invalid token",
            }, {
                status: 400
            })
        }
        // await prisma.emailVerificationCode.deleteMany({});
        await prisma.emailVerificationCode.delete({
            where: {
                id: emailVerificationResult.id
            }
        })

        const user = await prisma.user.update({
            where: {
                id: emailVerificationResult.userId
            },
            data: {
                email_verified: true
            }
        });
        const session = await lucia.createSession(user.id, {});

        const sessionCookie: SessionCookie = lucia.createSessionCookie(session.id);

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );
        return Response.redirect(new URL(process.env.NEXT_PUBLIC_BASE_URL!), 302)
    } catch (error) {
        if (error instanceof Error) {
            return Response.json({
                error: error.message
            }, {
                status: 400
            })
        } else {
            Response.json({
                error: "An unknown error occoured"
            }, {
                status: 400
            })
        }
    }
}
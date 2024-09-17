'use server';

import { lucia } from '@/lib/auth';
import { cookies } from 'next/headers';
import prisma from '@/lib/db';
import * as argon from 'argon2';
import { SignInInput } from '@/app/auth/signin/page';
import { AuthenticatingUserResponse, SessionCookie } from '@/types/global-types';

const signInUser = async (data: SignInInput): Promise<AuthenticatingUserResponse> => {
  const { email, password } = data;
  console.log(data);

  try {
    const existingUser = await prisma.user.findFirst({
      where: { email }
    });

    if (!existingUser || !existingUser.hashedPassword) {
      return { error: "User not found" };
    }

    const hasValidPassword = await argon.verify(existingUser.hashedPassword, password);

    if (!hasValidPassword) {
      return { error: "Wrong Credentials" };
    }
    if (!existingUser.email_verified) {
      return { error: "Email not verified", key: "email_not_verified" };
    }

    const session = await lucia.createSession(existingUser.id, {});

    const sessionCookie: SessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: true,
      data: {
        existingUser
      }
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: 'An unknown error occurred' };
    }
  }
};

export { signInUser };

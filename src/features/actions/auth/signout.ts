'use server';

import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";

const signOut = async (): Promise<AuthenticatingUserResponse> => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return { error: "Unauthorized" };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie: SessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { success: true };

  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: 'An unknown error occurred' };
    }
  }
};

export { signOut };

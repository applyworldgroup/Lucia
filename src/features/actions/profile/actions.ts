import { checkAuth } from "@/lib/checkAuth";
import prisma from "@/lib/db";

export async function getUserById(id: string) {
  await checkAuth();

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      email_verified: true,
    },
  });
  return { success: true, data: user };
}
export async function getCustomerByEmail(email: string) {
  await checkAuth();

  const user = await prisma.user.findFirst({
    where: { email },
  });
  return { success: true, data: user };
}

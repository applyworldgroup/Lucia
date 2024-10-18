import { checkAuth } from "@/lib/checkAuth";
import prisma from "@/lib/db";
import { User } from "@prisma/client";

export async function getAllUsers(): Promise<User[]> {
  await checkAuth();
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

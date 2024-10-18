import { Role } from "@prisma/client";
import { validateRequest } from "./auth";

export async function checkAuth(requiredRole: Role = "USER"): Promise<void> {
  const { user, session } = await validateRequest();
  if (!session) {
    throw new Error("Unauthenticated");
  }

  if (!user || user.role !== requiredRole) {
    throw new Error("Unauthorized");
  }
}

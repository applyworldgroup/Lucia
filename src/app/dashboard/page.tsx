import { Button } from "@/components/ui/button";
import { signOut } from "@/features/actions/auth/signout";
import { validateProtectedRoute } from "@/lib/validate-protected-route";
import React from "react";

export default async function Dashboard() {
  const user = await validateProtectedRoute();
  return (
    <div>
      <b>Dashboard</b>
      <p>{JSON.stringify(user, null, 2)}</p>
      <form action={signOut}>
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { signOut } from "@/features/actions/auth/signout";
import { validateServerProtectedRoute } from "@/lib/validate-server-protected-route";
import React from "react";

export default async function Dashboard() {
  const {user} = await validateServerProtectedRoute();
  return (
    <div>
      <b>Admin Page</b>
      <p>{JSON.stringify(user, null, 2)}</p>
      <form action={signOut}>
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}
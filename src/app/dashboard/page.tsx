// import { Button } from "@/components/ui/button";
// import { signOut } from "@/features/actions/auth/signout";
// import { validateProtectedRoute } from "@/lib/validate-protected-route";
// import React from "react";

// export default async function Dashboard() {
//   const user = await validateProtectedRoute();
//   return (
//     <div>
//       <b>Dashboard</b>
//       <p>{JSON.stringify(user, null, 2)}</p>
//       <form action={signOut}>
//         <Button type="submit">Sign out</Button>
//       </form>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/features/actions/auth/signout";
import React from "react";
import { useSession } from "@/app/components/session-provider";

export default function Dashboard() {
  const {user} = useSession()
  return (
    <div>
      <b>Dashboard</b>
      <p>Hi, this is client page</p>
      <p>{JSON.stringify(user, null, 2)}</p>
      <Button type="submit" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
}

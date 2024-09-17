"use client";

import * as React from "react";
import {
  AlertCircle,
  Award,
  Book,
  Briefcase,
  Calendar,
  DownloadCloud,
  Inbox,
  LogOutIcon,
  Settings,
  Users,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { NavItems } from "./nav-items";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOut } from "@/features/actions/auth/signout";
import { useSession } from "./session-provider";

export function Sidebar() {
  const {user} = useSession()
  return (
    <div className="h-screen">
      <div>
        <div className="flex flex-col justify-between border-2 h-screen">
          <div>
            <div className="flex gap-2 p-2 px-4 items-center">
              <Image
                width={50}
                height={50}
                src={"/icons8-literature-50.png"}
                alt="Logo"
              />
              <span className="font-bold text-lg"> HAMRO KHATA</span>
            </div>
            <Separator />
            <div>
              <NavItems
                links={[
                  {
                    title: "Home",
                    icon: Inbox,
                    variant: "default",
                    url: "/dashboard",
                  },
                  {
                    title: "Appointments",
                    icon: Book,
                    variant: "ghost",
                    url: "/dashboard/appointments",
                  },
                  {
                    title: "Visitors",
                    icon: Users,
                    variant: "ghost",
                    url: "/dashboard/visitors",
                  },
                  {
                    title: "Calender",
                    icon: Calendar,
                    variant: "ghost",
                    url: "/dashboard/calender",
                  },
                  {
                    title: "Team",
                    icon: Users,
                    variant: "ghost",
                    url: "/dashboard/team",
                  },
                  {
                    title: "Customers",
                    icon: Users,
                    variant: "ghost",
                    url: "/dashboard/customers",
                  },
                  {
                    title: "Visa Applications",
                    icon: DownloadCloud,
                    variant: "ghost",
                    url: "/dashboard/visa-applications",
                  },
                  {
                    title: "Job Ready Program",
                    icon: Briefcase,
                    variant: "ghost",
                    url: "/dashboard/job-ready-program",
                  },
                  {
                    title: "Skills Assesment",
                    icon: Award,
                    variant: "ghost",
                    url: "/dashboard/skills-assesment",
                  },
                ]}
              />
              <Separator />
              <NavItems
                links={[
                  {
                    title: "Settings",
                    icon: Settings,
                    variant: "ghost",
                    url: "/dashboard",
                  },
                  {
                    title: "Updates",
                    icon: AlertCircle,
                    variant: "ghost",
                    url: "/dashboard",
                  },
                ]}
              />
            </div>
          </div>
          <div className="self-start">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"ghost"} className="flex gap-2">
                  <LogOutIcon className="h-5 w-5" />
                  Sign Out
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Sign Out</DialogTitle>
                </DialogHeader>
                <div>
                  <p className="text-muted-foreground text-sm">
                    Are you sure you want to sign out? This will log you out of
                    your account.
                  </p>
                </div>
                <DialogFooter>
                  <div className="flex justify-end gap-2">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button onClick={() => signOut()} > Sign Out</Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
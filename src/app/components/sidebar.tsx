"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import {
  AlertCircle,
  Award,
  Book,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
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
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={cn(
        "relative h-screen transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col justify-between h-full border-r bg-background">
        <div>
          <div className="flex items-center p-4">
            <Image
              width={40}
              height={40}
              src="/icons8-literature-50.png"
              alt="Logo"
              className="transition-all duration-300 ease-in-out"
            />
            {!isCollapsed && (
              <span className="ml-2 font-bold text-lg transition-opacity duration-300 ease-in-out">
                ETHEREAL
              </span>
            )}
          </div>
          <Separator />
          <div className="py-4">
            <NavItems
              links={[
                {
                  title: "Home",
                  icon: Inbox,
                  variant: "ghost",
                  url: "/dashboard",
                },
                {
                  title: "Appointments",
                  icon: Book,
                  variant: "ghost",
                  url: "/dashboard/appointments",
                },
                // {
                //   title: "Visitors",
                //   icon: Users,
                //   variant: "ghost",
                //   url: "/dashboard/visitors",
                // },
                {
                  title: "Calender",
                  icon: Calendar,
                  variant: "ghost",
                  url: "/dashboard/calender",
                },
                // {
                //   title: "Team",
                //   icon: Users,
                //   variant: "ghost",
                //   url: "/dashboard/team",
                // },
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
              isCollapsed={isCollapsed}
              activePath={pathname}
            />
            <Separator className="my-4" />
            <NavItems
              links={[
                {
                  title: "Settings",
                  icon: Settings,
                  variant: "ghost",
                  url: "/dashboard/settings",
                },
                {
                  title: "Updates",
                  icon: AlertCircle,
                  variant: "ghost",
                  url: "/dashboard/updates",
                },
              ]}
              isCollapsed={isCollapsed}
              activePath={pathname}
            />
          </div>
        </div>
        <div className="p-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <LogOutIcon className="h-5 w-5 mr-2" />
                {!isCollapsed && "Sign Out"}
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
                  <Button onClick={() => signOut()}>Sign Out</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-4 right-1 hidden md:flex ${
          isCollapsed ? "left-3 opacity-0" : ""
        } `}
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

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
import { useCollapse } from "@/store/useCollapse";

export function Sidebar() {
  // const [isCollapsed, setIsCollapsed] = React.useState(false);
  const pathname = usePathname();

  // const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  // const isCollapsed = useCollapse((state) => state.isCollapsed)

  const { isCollapsed, setIsCollapsed } = useCollapse();

  return (
    <div
      className={cn(
        "relative h-screen transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col justify-between h-screen border-r">
        <div className="flex flex-col justify-between h-full">
          <div className="">
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
                  HARMONY
                </span>
              )}
            </div>
            <Separator />
          </div>
          <div className=" flex flex-1 flex-col justify-between ">
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
            <div>
              <Separator />
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
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-4 right-1 md:flex ${
          isCollapsed ? "left-3 opacity-0" : ""
        } `}
        onClick={() => setIsCollapsed()}
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

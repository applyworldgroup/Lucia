import React from "react";
import { Sidebar } from "@/app/components/sidebar";
import { UserNav } from "@/app/components/user-nav";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";

interface MailPageProps {
  children?: React.ReactNode;
}

export default function MailPage({ children }: MailPageProps) {
  return (
    <div className="flex h-screen ">
      <div className="w-1/6">
        <div className="hidden flex-col md:flex">
          <Sidebar />
        </div>
      </div>
      <div className="w-full flex-1 border-2 p-4">
        <div className=" flex justify-end items-center space-x-4 space-y-2 pb-4">
          <div>
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[100px] lg:w-[300px]"
            />
          </div>
          <UserNav />
        </div>
        {children}
      </div>
      <Toaster />
    </div>
  );
}

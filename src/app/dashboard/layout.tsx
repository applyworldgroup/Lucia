import React from "react";import { Sidebar } from "@/app/components/sidebar";
import { UserNav } from "@/app/components/user-nav";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface MailPageProps {
  children?: React.ReactNode;
}

export default function MailPage({ children }: MailPageProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className=" w-full  justify-between flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px]"
            />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}

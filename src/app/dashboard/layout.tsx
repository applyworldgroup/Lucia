import React from "react";import { Sidebar } from "@/app/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/app/components/nav-bar";

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
        <NavBar />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}

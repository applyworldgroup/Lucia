"use client";import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import { FC } from "react";
import { UserNav } from "./user-nav";
interface NavBarProps {}

const NavBar: FC<NavBarProps> = ({}) => {
  return (
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
  );
};

export default NavBar;

"use client";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { FC } from "react";
import { UserNav } from "./user-nav";
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
import { ModeToggle } from "./theme-toggle";
interface NavBarProps {}

const NavBar: FC<NavBarProps> = ({}) => {
  return (
    <header className="flex items-center justify-between p-4 border-b px-8 md:px-4 ">
      <div className=" w-full justify-end flex items-center space-x-4">
        <ModeToggle />
        <UserNav />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-fit justify-start">
              <LogOutIcon size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sign Out</DialogTitle>
            </DialogHeader>
            <div>
              <p className="text-muted-foreground text-sm">
                Are you sure you want to sign out? This will log you out of your
                account.
              </p>
            </div>
            <DialogFooter>
              <div className="flex  gap-2">
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
    </header>
  );
};

export default NavBar;

"use client";import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemsProps {
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    url: string;
  }[];
  isCollapsed: boolean;
  activePath: string;
}

export function NavItems({ links, isCollapsed, activePath }: NavItemsProps) {
  return (
    <div className="group flex flex-col gap-4 py-2 px-2">
      <nav className="grid gap-1">
        {links.map((link, index) => {
          const isActive = activePath.startsWith(link.url);
          return (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.url}
                    className={cn(
                      buttonVariants({
                        variant: isActive ? "default" : link.variant,
                        size: "default",
                      }),
                      isActive && "bg-black text-white hover:bg-black/90",
                      "justify-start",
                      isCollapsed && "w-10 h-10 p-0"
                    )}
                  >
                    <link.icon
                      className={cn(
                        "h-4 w-4",
                        isCollapsed ? "mx-auto" : "mr-2"
                      )}
                    />
                    {!isCollapsed && <span>{link.title}</span>}
                    {link.label && !isCollapsed && (
                      <span
                        className={cn(
                          "ml-auto",
                          isActive ? "text-white" : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </span>
                    )}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    {link.title}
                    {link.label && (
                      <span className="ml-auto text-muted-foreground">
                        {link.label}
                      </span>
                    )}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </nav>
    </div>
  );
}

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Video,
  Archive,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  {
    name: "tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
   
  },
  {
    name: "entrentien",
    href: "/dashboard/interview",
    icon: Video,

  },
  { name: "Archive", href: "/dashboard/archive", icon: Archive},
];


export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleLogout = () => {
    router.push("/");
  };


  

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile sidebar panel */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-custom transition-transform duration-300 ease-in-out lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center mr-2">
            <img src="/images/logo.svg" className=" w-20 h-20 object-contain" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-2 p-2 py-5">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors `,

                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-accent text-black "
                  : "text-gray-500"
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r">
        <div className="flex h-16 items-center justify-center px-4 border-b">
          <img src="/images/logo.svg" className=" w-30 h-30 object-contain" />
        </div>
        <nav className="flex flex-col gap-2 px-4 py-5">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-300",
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-accent text-black "
                  : "text-gray-500 "
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open sidebar</span>
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
              <div className="text-sm font-medium">Sarah Johnson</div>
              <div className="text-xs text-muted-foreground">
                agent de qualité
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Sarah Johnson"
                  />
                  <AvatarFallback className="gradient-bg text-white">
                    SJ
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <img src="/images/agb.svg" className=" w-25 h-15 object-contain" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full gradient-bg animate-pulse"></div>
                <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
      <Toaster />
    </div>
  );
}

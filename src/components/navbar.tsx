"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, User, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
// import { Button } from "@base-ui/react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "#bookings" },
  { label: "Admin", href: "#admin" },
];

export default function Navbar() {

  const { data: session } = authClient.useSession();
  const user = session?.user;


  const [open, setOpen] = useState(false);

  const handleSignOut =() => {
    authClient.signOut();
  }

  return (
    <header className="mb-10 sticky top-0 z-50 border-b border-slate-200/80 bg-white">
      <div className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-9 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative py-1 text-[13px] font-semibold transition-colors hover:text-brand ${link.active
                ? "text-brand after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-brand"
                : "text-slate-700"
                }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Link
          href="/"
          aria-label="Wanderlast home"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
            className="h-6 w-auto"
          />
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="#profile"
            className="hidden items-center gap-1.5 text-[13px] font-semibold text-slate-700 transition-colors hover:text-brand sm:flex"
          >
            <User className="size-3.5" strokeWidth={2.2} />
            Profile
          </Link>

          {
            user ? <Popover>
            <PopoverTrigger render={
              <Avatar>
                <AvatarImage src={user?.image as string} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            }>
              Open Popover
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>{user?.name}</PopoverTitle>
                <PopoverDescription>{user?.email}</PopoverDescription>
                <Button onClick={handleSignOut} variant={'destructive'}>Sign out</Button>
              </PopoverHeader>
            </PopoverContent>
          </Popover> 
          :
           <>
          <Link
            href="/signin"
            className="hidden text-[13px] font-semibold text-slate-700 transition-colors hover:text-brand md:block"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-[13px] font-semibold text-slate-700 transition-colors hover:text-brand"
          >
            Sign Up
          </Link>
          </>
          }


          
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-slate-200/80 bg-white px-5 py-3 lg:hidden"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-2 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50 ${link.active ? "text-brand" : "text-slate-700"
                }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

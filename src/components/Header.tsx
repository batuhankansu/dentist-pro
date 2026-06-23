"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, Calendar } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/Logo";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/doktorlar", label: "Doktorlarımız" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-10 w-auto text-sky-600" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors hover-underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+905001234567"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <Phone className="mr-2 h-4 w-4" />
            0500 123 45 67
          </a>
          <Link
            href="/randevu"
            className={buttonVariants({
              size: "sm",
              className: "bg-sky-500 hover:bg-sky-600 text-white animate-pulse-glow",
            })}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Randevu Al
          </Link>
        </div>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden"
            render={
              <button
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              />
            }
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col gap-6 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-slate-600 hover:text-sky-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <hr />
              <Link
                href="/randevu"
                onClick={() => setOpen(false)}
                className={buttonVariants({
                  className: "bg-sky-500 hover:bg-sky-600 text-white",
                })}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Randevu Al
              </Link>
              <a
                href="tel:+905001234567"
                className={buttonVariants({ variant: "outline" })}
              >
                <Phone className="mr-2 h-4 w-4" />
                0500 123 45 67
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

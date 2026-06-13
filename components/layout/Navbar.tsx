"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Container from "./Container";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Plans", href: "#plans" },
  // { label: "Trainers", href: "#trainers" },
  { label: "Shop", href: "#shop" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white">
      <Container className="flex h-[72px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-[18px] font-bold text-[#F97316]">
          The Fitness Bridge
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[16px] font-semibold text-[#111827] transition hover:text-[#F97316]"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="#contact"
            className="rounded-xl bg-[#F97316] px-6 py-4 text-[14px] font-semibold text-white transition hover:bg-[#EA580C]"
          >
            Join Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-[#F97316] lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="bg-white shadow-lg lg:hidden">
          <Container className="flex flex-col gap-5 py-6">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-semibold text-[#111827] transition hover:text-[#F97316]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-fit rounded-xl bg-[#F97316] px-6 py-4 text-sm font-semibold text-white"
            >
              Join Now
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
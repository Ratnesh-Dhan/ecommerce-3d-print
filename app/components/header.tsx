"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-black border-b border-yellow-500/20 sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        {/* <h1 className="text-xl font-bold text-yellow-500">
          Kamal 3D
        </h1> */}
        <Link href="/" className="text-xl font-bold text-yellow-500 ">
        Kamal 3D
          </Link>

        {/* NAV */}
        <nav className="flex items-center gap-8 text-sm">
          <Link href="/" className="hover:text-yellow-500 transition ">
            Home
          </Link>
          <Link href="/Stl" className="hover:text-yellow-500 transition">
            STL Calculator
          </Link>
          <Link href="/Services" className="hover:text-yellow-500 transition">
            Services
          </Link>
          <Link href="/Contact_Us" className="hover:text-yellow-500 transition">
            Contact
          </Link>
        </nav>

      </div>
    </header>
  );
}
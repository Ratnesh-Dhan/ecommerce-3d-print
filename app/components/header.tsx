"use client";

import Link from "next/link";

export default function Header(){
    return(
        <header className="w-full bg-black text-white boarder-b border-yellow-500">
 <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

    {/* Logo */}
    <div className="text-xl font-bold text-yellow-500">
    <Link href="/">Kamal 3D</Link>
    </div>

    {/* Navigation */}
    <nav className="flex items-center gap-6 text-sm font-medium">
    <Link href="/" className="hover:text-yellow-400 transition">
        Home
    </Link>

    <Link href="/stl" className="hover:text-yellow-400 transition">
        STL Calculator
    </Link>

    <Link href="/services" className="hover:text-yellow-400 transition">
        Services
    </Link>

    <Link href="/contact" className="hover:text-yellow-400 transition">
        Contact
    </Link>
    </nav>


    {/* <Link
    href="/stl"
    className="bg-yellow-500 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-400 transition"
    >
    Upload STL
    </Link> */}

  </div>
 </header>
    );
}
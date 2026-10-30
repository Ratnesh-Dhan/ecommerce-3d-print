// CallToAction.tsx - Premium call to action section
"use client";

import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-6">Ready To Print Your Design?</h2>
        <p className="text-lg text-gray-300 mb-8">
          Get instant pricing in seconds. Upload your STL now and see how fast we can bring your ideas to life.
        </p>
        <Link
          href="/Stl"
          className="inline-block bg-[#F5B301] text-black font-bold py-3 px-8 rounded-full hover:bg-[#e5a400] transition"
        >
          Upload STL Now
        </Link>
      </div>
    </section>
  );
}

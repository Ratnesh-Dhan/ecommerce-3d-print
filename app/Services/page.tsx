import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, CheckCircle2, ClipboardCheck, Cpu, Factory, FileSearch, Layers3, Printer, Sparkles } from "lucide-react";

const services = [
  { icon: Printer, title: "Precision 3D Printing", description: "Bring production-ready parts to life with crisp detail, reliable tolerances, and a finish made to impress.", points: ["FDM and resin printing", "PLA, PETG, ABS and more", "Fast nationwide delivery"] },
  { icon: FileSearch, title: "STL Analysis & Quoting", description: "Upload your model and make smarter decisions before anything goes to print.", points: ["Instant size and volume checks", "Material recommendations", "Transparent pricing"] },
  { icon: Cpu, title: "Custom Prototyping", description: "Move from a sketch or concept to a functional prototype with a hands-on manufacturing partner.", points: ["Design-to-part guidance", "Functional test prints", "Iterate with confidence"] },
  { icon: Factory, title: "Small-Batch Production", description: "Scale the parts that work without sacrificing consistency, quality, or attention to detail.", points: ["Repeatable quality", "Business-friendly quantities", "Reliable turnaround"] },
];

const process = [
  { icon: Layers3, title: "Share your design", description: "Upload an STL or tell us about your idea." },
  { icon: ClipboardCheck, title: "Approve your quote", description: "Choose materials, finish, quantity, and timeline." },
  { icon: Box, title: "Receive your parts", description: "We print, inspect, pack, and deliver to your door." },
];

export default function Services() {
  return (
    <main className="overflow-hidden bg-black text-white">
      <section className="relative isolate border-b border-yellow-500/15">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_20%,rgba(234,179,8,0.18),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(234,179,8,0.08),transparent_28%)]" />
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 opacity-30 lg:block">
          <Image src="/images/printer.png" alt="3D printer" fill priority className="object-cover object-left" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/25" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold tracking-[0.24em] text-yellow-500 uppercase"><Sparkles size={15} /> From idea to object</p>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">Build better. <span className="text-yellow-500">Print without limits.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">Whether you need one polished prototype or a dependable production run, THREEDITRON turns digital ideas into high-quality physical parts.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/Stl" className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]">Get an instant quote <ArrowRight size={18} /></Link>
              <Link href="/Contact_Us" className="inline-flex items-center gap-2 rounded-xl border border-yellow-500/50 px-5 py-3 font-bold text-yellow-500 transition hover:bg-yellow-500 hover:text-black">Talk to an expert</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="text-xs font-bold tracking-[0.2em] text-yellow-500 uppercase">What we do</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Made for makers, teams, and ambitious ideas.</h2>
          <p className="mt-4 leading-7 text-gray-400">Choose the support you need at any stage—from checking a file to delivering a finished batch.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {services.map(({ icon: Icon, title, description, points }) => (
            <article key={title} className="group rounded-2xl border border-yellow-500/15 bg-zinc-950 p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-500/60 hover:shadow-[0_15px_45px_rgba(234,179,8,0.12)] sm:p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500 transition group-hover:bg-yellow-500 group-hover:text-black"><Icon size={24} /></div>
              <h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-gray-400">{description}</p>
              <ul className="mt-5 space-y-2.5">{points.map((point) => <li key={point} className="flex items-center gap-2 text-sm text-gray-200"><CheckCircle2 size={16} className="shrink-0 text-yellow-500" /> {point}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-yellow-500/15 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center"><p className="text-xs font-bold tracking-[0.2em] text-yellow-500 uppercase">A simple process</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Your next part is three steps away.</h2></div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {process.map(({ icon: Icon, title, description }, index) => <div key={title} className="text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/50 bg-black font-black text-yellow-500">0{index + 1}</span><div className="mx-auto mt-5 flex h-10 w-10 items-center justify-center text-yellow-500"><Icon size={28} /></div><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mx-auto mt-2 max-w-xs leading-6 text-gray-400">{description}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="rounded-3xl border border-yellow-500/30 bg-[linear-gradient(120deg,rgba(234,179,8,0.18),rgba(24,24,27,0.95)_45%)] px-6 py-12 text-center sm:px-12">
          <h2 className="text-3xl font-black sm:text-4xl">Ready to make it real?</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-gray-300">Upload your file for an instant estimate, or get in touch for a custom project.</p>
          <Link href="/Stl" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400">Start your print <ArrowRight size={18} /></Link>
        </div>
      </section>
    </main>
  );
}

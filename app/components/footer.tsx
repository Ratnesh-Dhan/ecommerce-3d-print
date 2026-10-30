import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/Services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/shop", label: "Shop" },
  { href: "/Contact_Us", label: "Contact us" },
];

const serviceLinks = [
  { href: "/Stl", label: "Instant STL quote" },
  { href: "/Services", label: "3D printing" },
  { href: "/Services", label: "Custom prototyping" },
  { href: "/Services", label: "Small-batch production" },
];

export default function Footer() {
  return (
    <footer className="border-t border-yellow-500/20 bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <section className="grid gap-6 border-b border-yellow-500/15 py-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-yellow-500 uppercase">Bring your idea to life</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Have a design ready to print?</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">Upload your STL for a quick estimate, or speak with us about a custom project.</p>
          </div>
          <Link href="/Stl" className="inline-flex w-fit items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400 hover:shadow-[0_0_24px_rgba(234,179,8,0.3)]">
            Get an instant quote <ArrowRight size={18} />
          </Link>
        </section>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr]">
          <div>
            <Link href="/" className="inline-flex">
              <Image src="/images/main-logo.png" alt="THREEDITRON" width={108} height={32} className="rounded-lg" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">Professional 3D printing and prototyping for makers, businesses, and big ideas across India.</p>
            <div className="mt-5 flex items-center gap-2 text-sm text-gray-300">
              <ShieldCheck size={18} className="text-yellow-500" /> Quality-checked before dispatch
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">Explore</h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-gray-400 transition hover:text-yellow-500">{link.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">Services</h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => <li key={link.label}><Link href={link.href} className="text-sm text-gray-400 transition hover:text-yellow-500">{link.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">Let&apos;s talk</h3>
            <ul className="mt-5 space-y-4 text-sm text-gray-400">
              <li><a href="mailto:threeditron.1005@gmail.com" className="flex items-start gap-3 transition hover:text-yellow-500"><Mail size={18} className="mt-0.5 shrink-0 text-yellow-500" />threeditron.1005@gmail.com</a></li>
              <li><a href="tel:+917209827299" className="flex items-center gap-3 transition hover:text-yellow-500"><Phone size={18} className="shrink-0 text-yellow-500" />+91 72098 27299</a></li>
              <li className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-yellow-500" />Jamshedpur, Jharkhand, India</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="https://wa.me/917209827299" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-lg border border-yellow-500/25 text-yellow-500 transition hover:border-yellow-500 hover:bg-yellow-500 hover:text-black"><MessageCircle size={19} /></a>
              <a href="https://www.instagram.com/3dit.ron/" target="_blank" rel="noreferrer" aria-label="Follow us on Instagram" className="flex h-10 w-10 items-center justify-center rounded-lg border border-yellow-500/25 text-yellow-500 transition hover:border-yellow-500 hover:bg-yellow-500 hover:text-black"><Instagram size={19} /></a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-yellow-500/15 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 THREEDITRON. All rights reserved.</p>
          <p>Designed for ideas that deserve to become real.</p>
        </div>
      </div>
    </footer>
  );
}

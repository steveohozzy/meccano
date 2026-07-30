"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";
import { resolveLink } from "@/lib/storyblok";

export default function Header({ blok }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function getNavHref(item) {
    const pageLink = resolveLink(item.Link);

    if (item.HomepageAnchor) {

      if (pathname === "/") {
        return `#${item.HomepageAnchor}`;
      }

      if (pageLink && pageLink !== "/") {
        return `${pageLink}#${item.HomepageAnchor}`;
      }

      return `/#${item.HomepageAnchor}`;
    }

    return pageLink || "/";
  }

  return (
    <>
      <header
        {...storyblokEditable(blok)}
        className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="relative h-12 w-40">
              <Image
                src={blok?.Logo?.filename || "/images/meccano-logo.png"}
                alt={blok?.LogoAlt || "Meccano"}
                fill
                className="object-contain object-left"
              />
            </Link>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-surface transition hover:border-red-500/50 cursor-pointer"
            >
              <div className="relative h-6 w-6">
                <span
                  className={`absolute left-0 top-1 h-0.5 w-6 bg-red-500 transition-all duration-300 ${
                    open ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 h-0.5 w-6 bg-red-500 transition-all duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-5 h-0.5 w-6 bg-red-500 transition-all duration-300 ${
                    open ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-[60] flex h-screen w-full max-w-[420px] flex-col overflow-hidden bg-gradient-to-b from-red-950 via-background to-background shadow-[0_0_80px_rgba(220,38,38,.25)] transition-transform duration-500 ease-out max-h-screen overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 pt-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-400">
              Explore
            </p>
            <h2 className="mt-2 text-3xl font-bold">Meccano</h2>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-xl hover:border-red-500/50 cursor-pointer"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 px-6 py-4">
          {blok?.Navigation?.map((item) => (
            <Link
              key={item._uid}
              href={getNavHref(item)}
              target={item.OpenInNewTab ? "_blank" : undefined}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-b border-white/10 px-4 py-5 font-mono text-sm uppercase tracking-[0.15em] transition-all hover:text-red-400"
            >
              <span>{item.Label}</span>

              <ArrowUpRight className="h-4 w-4 opacity-40 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>

        <div className="p-6">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">
              {blok?.CtaPanelEyebrow || "Build Journal"}
            </p>

            <div className="mt-3 text-xl font-bold">
              {blok?.CtaPanelHeading || "Engineering starts here"}
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              {blok?.CtaPanelText || "Discover models, builds and mechanical stories."}
            </p>

            <Link
              href={resolveLink(blok?.CtaLink) || "/blog"}
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-white transition hover:bg-red-500"
            >
              {blok?.CtaText || "Build Journal"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
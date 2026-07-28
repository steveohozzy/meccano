"use client";

import Image from "next/image";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { resolveLink } from "@/lib/storyblok";

import {
  ArrowUpRight,
  Check,
  Bolt,
  Cog,
  Ruler,
  Star,
  Shield,
} from "lucide-react";

const icons = {
  check: Check,
  bolt: Bolt,
  gear: Cog,
  ruler: Ruler,
  star: Star,
  shield: Shield,
};

export default function ImageTextBanner({ blok }) {
  const reverse = blok.ReverseLayout;

  return (
    <section
      {...storyblokEditable(blok)}
      className="relative overflow-hidden border-b border-line bg-background"
    >
      {blok.ShowGrid && (
        <div
          className="pointer-events-none absolute inset-0 bg-grid opacity-60"
          aria-hidden
        />
      )}
      <div
        className={`mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-2 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Copy */}

        <div className="flex flex-col justify-center px-4 py-14 md:px-8 lg:py-24">

          {blok.Eyebrow && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-500">
              {blok.Eyebrow}
            </span>
          )}

          <h2 className="mt-3 max-w-lg text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {blok.Title}
          </h2>

          {blok.Intro && (
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
              {blok.Intro}
            </p>
          )}

          {blok.Features?.length > 0 && (
            <ul className="mt-8 flex flex-col gap-3">

              {blok.Features.map((item) => {
                const Icon = icons[item.Icon] || Check;

                return (
                  <li
                    key={item._uid}
                    className="flex items-center gap-3 text-sm text-foreground/90"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600/15 text-red-400">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>

                    {item.Title}
                  </li>
                );
              })}
            </ul>
          )}

          {blok.ButtonText && (
            <Link
              href={resolveLink(blok.ButtonLink) || "#"}
              className="group mt-9 inline-flex w-fit items-center gap-2 rounded-md border border-white/15 bg-surface px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:border-red-500/60 hover:text-red-400"
            >
              {blok.ButtonText}

              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}

        </div>

        {/* Image */}

        <div className="relative min-h-[380px] border-line lg:border-l">

          {blok.Image?.filename && (
            <Image
              src={blok.Image.filename}
              alt={blok.Image.alt || blok.Title}
              fill
              sizes="(max-width:1024px)100vw,50vw"
              className="object-cover"
            />
          )}

          <div
            className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-background lg:via-transparent"
            aria-hidden
          />

          {blok.ImageLabel && (
            <span className="absolute bottom-4 left-4 rounded-md border border-white/15 bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur">
              {blok.ImageLabel}
            </span>
          )}

        </div>
      </div>
    </section>
  );
}
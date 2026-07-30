"use client";

import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import { ArrowUpRight } from "lucide-react";
import { resolveLink } from "@/lib/storyblok";
import Link from "next/link";
import { Bolt } from "lucide-react";

export default function BrandCollectionSection({ blok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      id={blok.AnchorId || undefined}
      className="relative overflow-hidden border-b border-line bg-background"
    >
      {blok.ShowGrid && (
        <div
          className="pointer-events-none absolute inset-0 bg-grid opacity-60"
          aria-hidden
        />
      )}

      <div
        className={`
          relative
          mx-auto
          grid
          max-w-[1400px]
          grid-cols-1
          lg:grid-cols-2
          ${blok.FlipLayout ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}
        `}
      >

        {/* Image */}
        <div className="relative min-h-[420px] border-line lg:border-r">

          {blok.Image?.filename && (
            <Image
              src={blok.Image.filename}
              alt={blok.Image.alt || blok.Title}
              fill
              className="object-cover"
            />
          )}

          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
            aria-hidden
          />

          {blok.ImageLabel && (
            <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome">
              {blok.ImageLabel}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col px-4 py-14 md:px-10 lg:py-24">

          {blok.eyebrow && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-500 inline-flex items-center gap-2">
              <Bolt className="h-4 w-4" /><span>{blok.eyebrow}</span><Bolt className="h-4 w-4" />
            </span>
          )}

          <h2 className="mt-3  text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {blok.Title}
          </h2>

          {blok.Intro && (
            <p className="mt-4  text-pretty leading-relaxed text-muted-foreground">
              {blok.Intro}
            </p>
          )}

          <div className="mt-10 grid grid-cols-2 gap-4">

            {blok.Sets?.map((set) => (
              <Link
                href={resolveLink(set.link)}
                key={set._uid}
                className="
                  group
                  relative
                  flex
                  flex-col
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/10
                  bg-surface
                  card-gloss
                  transition-all
                  duration-300
                  hover:border-red-500/40
                  hover:ring-glow
                "
              >
                <div className="relative aspect-square overflow-hidden bg-background/60 glow-blue transition-shadow group-hover:shadow-[0_0_35px_rgba(220,38,38,.35)]">

                  {set.Image?.filename && (
                    <Image
                      src={set.Image.filename}
                      alt={set.Image.alt || set.Name}
                      fill
                      sizes="(max-width:768px) 50vw, 25vw"
                      className="
                        object-contain
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  )}

                  {set.Difficulty && (
                    <span className="
                      absolute
                      bottom-3
                      left-3
                      rounded-md
                      border
                      border-red-500/40
                      bg-background/70
                      px-2
                      py-1
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.15em]
                      backdrop-blur
                    ">
                      {set.Difficulty}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 items-end justify-between p-5">

                  <div>
                    <div className="md:text-lg font-bold text-red-500">
                      {set.Name}
                    </div>

                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      <span className="text-electric">{set.Parts}</span> Parts
                    </p>
                  </div>

                  <span className="
                    flex
                    w-8
                    h-8
                    md:h-10
                    md:w-10
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-red-400/40
                    bg-red-600/50
                    text-red-50
                    shadow-[0_0_25px_rgba(220,38,38,.35)]
                    shrink-0
                  ">
                    <ArrowUpRight className="h-4 w-4 shrink-0" />
                  </span>

                </div>
              </Link>
            ))}

          </div>

          {blok.CollectionLinkText && (
            <div className="mt-6 border-t border-white/10 pt-6 flex justify-center">
            <Link
              href={resolveLink(blok.CollectionLink) || "#"}
              className="
                group
                  inline-flex
                  gap-2
                  rounded-md
                  bg-gradient-to-b
                  from-red-700
                  to-red-800
                  px-6
                  py-3.5
                  font-mono
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-white
                  border
                  border-red-400/40
                  shadow-[0_0_25px_rgba(220,38,38,.35)]
                  transition-all
                  hover:brightness-110
                  hover:-translate-y-0.5">
              {blok.CollectionLinkText}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
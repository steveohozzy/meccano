"use client";

import Image from "next/image";
import Link from "next/link";
import { resolveLink } from "@/lib/storyblok";
import { storyblokEditable } from "@storyblok/react/rsc";
import { ArrowUpRight } from "lucide-react";

export default function CollectionPreview({ blok }) {

  return (
    <section
      {...storyblokEditable(blok)}
      id="sets"
      className="border-b border-line"
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">

        {/* Header */}
        <div className="
          flex
          flex-col
          justify-between
          gap-4
          border-b
          border-line
          py-10
          md:flex-row
          md:items-end
        ">
          <div>

            <span className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-red-500
            ">
              {blok.Eyebrow || "/ 01 — The Collection"}
            </span>

            <h2 className="
              mt-3
              text-4xl
              font-bold
              tracking-tight
              sm:text-5xl
            ">
              {blok.Title || "Sets worth displaying"}
            </h2>

            {blok.Intro && (
              <p className="
                mt-4
                max-w-xl
                text-muted-foreground
              ">
                {blok.Intro}
              </p>
            )}

            </div>


            {blok.ViewLinkText && (
              <Link
                href={resolveLink(blok.ViewLink) || "#"}
                className="
                  inline-flex
                  items-center
                  gap-2
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.15em]
                  text-muted-foreground
                  transition-colors
                  hover:text-red-500
                "
              >
                {blok.ViewLinkText}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}

            </div>


        {/* Cards */}
        <div className="
          grid
          grid-cols-1
          gap-5
          py-10
          md:grid-cols-2
          lg:grid-cols-3
          cursor-pointer
        ">

          {blok.Sets?.map((set) => (
            <article
              key={set._uid}
              className="
                group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-surface card-gloss transition-all duration-300 hover:border-red-500/40 hover:ring-glow
              "
            >

              {/* Top metadata */}
              <div className="
                flex
                items-center
                justify-between
                px-5
                pt-5
              ">

                <span className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-muted-foreground
                ">
                  Ref# <span className="text-electric">{set.Reference}</span>
                </span>


                <span className="
                  flex items-center gap-2 rounded-full border border-red-500 bg-red-600/25 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-red-100 shadow-[0_0_20px_rgba(220,38,38,.2)] backdrop-blur-md
                ">
                  {set.Tag}
                </span>

              </div>


              {/* Image */}
              <div className="
                relative
                mx-5
                my-4
                flex
                aspect-square
                items-center
                justify-center
                overflow-hidden
                rounded-lg
                bg-background/60
                glow-blue
                transition-shadow
                group-hover:shadow-[0_0_35px_rgba(220,38,38,.35)]
              ">

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    glow-blue
                    opacity-50 
                  "
                />

                {set.Image?.filename && (
                  <Image
                    src={set.Image.filename}
                    alt={set.Image.alt || set.Name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="
                      relative
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
                    border-red-500/45
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


              {/* Details */}
              <div className="
                mt-auto
                flex
                items-end
                justify-between
                px-5
                pb-5
              ">

                <div>

                  <h3 className="
                    text-xl
                    font-bold
                    leading-tight
                    tracking-tight
                    text-red-500
                  ">
                    {set.Name}
                  </h3>


                  {set.Description && (
                    <p className="
                      mt-2
                      text-sm
                      text-muted-foreground
                    ">
                      {set.Description}
                    </p>
                  )}


                  <p className="
                    mt-3
                    font-mono
                    text-[11px]
                    uppercase
                    tracking-[0.12em]
                    text-muted-foreground
                  ">
                    <span className="text-electric">{set.Parts}</span> Parts
                  </p>

                </div>


                <span className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-red-400/40
                  bg-red-600/50
                  text-red-50
                  shadow-[0_0_25px_rgba(220,38,38,.35)]
                  backdrop-blur
                  transition-transform
                  group-hover:-translate-y-0.5
                ">
                  <ArrowUpRight className="h-4 w-4" />
                </span>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react";
import { ArrowUpRight, Bolt } from "lucide-react";

export default function Blog({ blok }) {

  const panels = blok.BlogPosts ?? [];

  return (
    <section
      {...storyblokEditable(blok)}
      id={blok.AnchorId || undefined}
      className="border-b border-line"
    >

      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 lg:py-20">


        {/* Header */}
        {blok.Title && (

          <div
            className="
              flex
              flex-col
              justify-between
              gap-4
              border-b
              border-line
              pb-10
              md:flex-row
              md:items-end
            "
          >

            <div className="max-w-xl">


              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-500 inline-flex items-center gap-2">
                <Bolt className="h-4 w-4" /><span>{blok.Tagline}</span><Bolt className="h-4 w-4" />
              </span>


              <h2 className="
                mt-3
                text-balance
                text-4xl
                font-bold
                tracking-tight
                sm:text-5xl
              ">
                {blok.Title}
              </h2>

            </div>


            <Link
              href="/blog"
              className="
                group
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

              See all news

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  transition-transform
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />

            </Link>

          </div>

        )}



        {/* Cards */}

        <div
          className="
            mt-10
            grid
            gap-5
            grid-cols-2
            lg:grid-cols-4
          "
        >

          {panels.map((p) => (
            <article
              key={p._uid}
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
              <Link href={`/blog/${p.Slug}`}>
                {/* Image */}
                <div
                  className="
                    relative
                    aspect-[4/3]
                    overflow-hidden
                    bg-background/60
                    glow-blue
                    transition-shadow
                    group-hover:shadow-[0_0_35px_rgba(220,38,38,.35)]
                  "
                >
                  {p.Image?.filename && (
                    <Image
                      src={p.Image.filename}
                      alt={p.Title || "Meccano news"}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {p.Tag && (
                    <span
                      className="
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
                        text-red-400
                        backdrop-blur
                      "
                    >
                      {p.Tag}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 items-end justify-between p-5">
                  <div>
                    <div className="line-clamp-2 font-bold text-red-500 md:text-lg">
                      {p.Title}
                    </div>

                    {p.ReadLength && (
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        <span className="text-electric">{p.ReadLength}</span> read
                      </p>
                    )}
                  </div>

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-md
                      border
                      border-red-400/40
                      bg-red-600/50
                      text-red-50
                      shadow-[0_0_25px_rgba(220,38,38,.35)]
                      md:h-10
                      md:w-10
                    "
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </article>
          ))}

        </div>


      </div>

    </section>
  );
}
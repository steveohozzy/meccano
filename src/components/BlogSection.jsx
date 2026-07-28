"use client";

import Image from "next/image";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react";
import { ArrowUpRight } from "lucide-react";

export default function Blog({ blok }) {

  const panels = blok.BlogPosts ?? [];

  return (
    <section
      {...storyblokEditable(blok)}
      id="blog"
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

              <span className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-red-500
              ">
                {blok.Tagline || "/ 05 — Workshop Journal"}
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
            md:grid-cols-3
          "
        >

          {panels.map((p) => (

            <article
              key={p._uid}
              className="
                group
                relative
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-surface
                card-gloss
                transition-all
                duration-300
                hover:border-red-500/40
                hover:shadow-[0_0_35px_rgba(220,38,38,.35)]
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
                  "
                >

                  {p.Image?.filename && (

                    <Image
                      src={p.Image.filename}
                      alt={p.Title || "Meccano news"}
                      fill
                      sizes="(max-width:768px)100vw,33vw"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />

                  )}


                  {/* Overlay */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-background/80
                      via-transparent
                      to-transparent
                    "
                  />


                  {p.Tag && (

                    <span
                      className="
                        absolute
                        left-4
                        top-4
                        rounded-full
                        border
                        border-red-500/40
                        bg-red-600/50
                        px-3
                        py-1
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.15em]
                        text-white
                        backdrop-blur-md
                      "
                    >
                      {p.Tag}
                    </span>

                  )}

                </div>



                {/* Content */}

                <div className="p-5">


                  <h3
                    className="
                      text-xl
                      font-bold
                      leading-tight
                      tracking-tight
                      transition-colors
                      group-hover:text-red-500
                    "
                  >
                    {p.Title}
                  </h3>



                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      justify-between
                      border-t
                      border-white/10
                      pt-4
                    "
                  >

                    <span
                      className="
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.15em]
                        text-muted-foreground
                      "
                    >
                      {p.ReadLength} read
                    </span>



                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-md
                        bg-red-600
                        text-white
                        transition-transform
                        group-hover:-translate-y-1
                      "
                    >

                      <ArrowUpRight className="h-4 w-4" />

                    </span>


                  </div>


                </div>


              </Link>

            </article>

          ))}

        </div>


      </div>

    </section>
  );
}
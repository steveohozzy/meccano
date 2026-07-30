"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export default function BlogFilters({ posts }) {
  const searchParams = useSearchParams();
  const filterRef = useRef(null);

  // initial state from URL only once
  const [selected, setSelected] = useState(
    () => searchParams.get("category") || "All"
  );

  // scroll only
  useEffect(() => {
    const category =
      searchParams.get("category") || "All";

    if (
      category !== "All" &&
      filterRef.current
    ) {
      setTimeout(() => {
        filterRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [searchParams]);

  const categories = [
    "All",
    ...new Set(
      posts.flatMap(
        p => p.content.category || []
      )
    )
  ];

  const filtered =
    selected === "All"
      ? posts
      : posts.filter(
          p =>
            p.content.category?.includes(
              selected
            )
        );

  return (
    <>
      <div
        ref={filterRef}
        className="mb-8 flex flex-wrap gap-3 scroll-mt-28"
      >
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelected(category)}
            className={`
              rounded-full
              px-4
              py-2
              transition-all
              cursor-pointer
              ${
                selected === category
                  ? "bg-primary text-white"
                  : "border hover:bg-muted"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <article
            key={post.uuid}
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
            <Link href={`/${post.full_slug}`}>
              <div className="
                relative
                aspect-[4/3]
                overflow-hidden
                bg-background/60
                glow-blue
                transition-shadow
                group-hover:shadow-[0_0_35px_rgba(220,38,38,.35)]
              ">
                <Image
                  src={post.content.featuredImage?.filename || "/images/placeholder.jpg"}
                  alt={post.content.title || "Blog image"}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {post.content.category?.[0] && (
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
                    text-red-400
                    backdrop-blur
                  ">
                    {post.content.category[0]}
                  </span>
                )}
              </div>

              <div className="flex flex-1 items-end justify-between p-5">
                <div>
                  <div className="line-clamp-2 font-bold text-red-500 md:text-lg">
                    {post.content.title}
                  </div>

                  {(post.content.readTime || post.content.readLength) && (
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <span className="text-electric">
                {post.content.readTime || post.content.readLength}
              </span> read
            </p>
          )}
                </div>

                <span className="
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
                ">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
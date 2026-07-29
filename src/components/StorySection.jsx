import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import { renderRichText } from "@storyblok/react";

export default function StorySection({ blok }) {
  const callouts = blok.Callouts ?? [];

  return (
    <section
      {...storyblokEditable(blok)}
      id={blok.AnchorId || undefined}
      className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:py-28"
    >
      <div className={`grid items-center gap-12 lg:grid-cols-2`}>

        {/* IMAGE */}
        <div
          className={`relative ${
            blok.Flip ? "order-1 lg:order-2" : "order-2 lg:order-1"
          }`}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border shadow-lg sm:aspect-[3/4] lg:aspect-[4/5]">
            <Image
              src={blok.Image?.filename || "/images/heritage.png"}
              alt={blok.Title || "Story image"}
              fill
              sizes="(max-width: 640px) 100vw,
                     (max-width: 1024px) 50vw,
                     600px"
              className="object-cover"
              loading="lazy"
              quality={80}
            />
          </div>

          {blok.ImageStampText && (
            <div className="absolute -right-4 -top-4 flex size-24 rotate-6 flex-col items-center justify-center rounded-full bg-primary text-center text-primary-foreground shadow-lg">
              <span className="font-heading text-2xl font-bold leading-none">
                {blok.ImageStampText?.split(" ")?.[0] || "Est."}
              </span>
              <span className="font-heading text-xl font-bold leading-none">
                {blok.ImageStampText?.split(" ")?.[1] || "1974"}
              </span>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div
          className={`${
            blok.Flip ? "order-2 lg:order-1" : "order-1 lg:order-2"
          }`}
        >
          {blok.Tagline && (
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              {blok.Tagline}
            </span>
          )}

          <h2 className="mt-3 text-balance font-heading text-4xl font-semibold leading-tight text-primary md:text-5xl">
            {blok.Title}
          </h2>

          {/* Rich Text */}
          {blok.Blurb && (
            <div
              className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: renderRichText(blok.Blurb),
              }}
            />
          )}

          {/* fallback text */}
          {!blok.Blurb && (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              We’re not just a name on a box. We’re part of family stories,
              rainy afternoons, first words and big imaginations.
            </p>
          )}

          {/* Callouts */}
          {callouts.length > 0 && (
            <ul className="mt-8 space-y-4">
              {callouts.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-0.5 shrink-0 rounded-full bg-accent px-3 py-1 font-heading text-sm font-bold text-accent-foreground">
                    {item.Highlight}
                  </span>
                  <span className="leading-relaxed text-foreground/80">
                    {item.Title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
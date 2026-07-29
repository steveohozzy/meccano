"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { resolveLink } from "@/lib/storyblok";

export default function HomeHero({ blok }) {

  const media = blok.BackgroundImage?.filename || "";
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(media);

  return (
    <section
      {...storyblokEditable(blok)}
      id="top"
      className="relative overflow-hidden border-b border-line bg-grid"
    >
      <div className="hero-spotlight hero-spotlight-1" />
      <div className="hero-spotlight hero-spotlight-2" />
      <div className="hero-spotlight hero-spotlight-3" />
      <div className="hero-spotlight hero-spotlight-4" />
      <div className="hero-spotlight hero-spotlight-5" />
            
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 px-4 md:px-8 lg:grid-cols-12">
        {/* Left: copy */}
        <div className="flex flex-col justify-center py-14 lg:col-span-6 lg:order-1 lg:py-28">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-red-500 bg-red-600/25 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-red-100 shadow-[0_0_20px_rgba(220,38,38,.2)] backdrop-blur-md">
  <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
  {blok.Tagline || "Tagline"}
</span>
          </div>


          <h1 className="text-balance text-5xl font-extrabold leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            {blok.Title || "hero text"}{" "}
            <span className="bg-gradient-to-r from-red-800 to-red-500 bg-clip-text text-transparent">
              {blok.TitleAccent || "hero accent"}
            </span>
          </h1>

          {/* Mobile Media */}
          <div className="relative mt-8 lg:hidden">
            <div className="relative h-[320px] overflow-hidden rounded-[2.5rem] border border-red-500/40 p-3 bg-gradient-to-br from-red-600/20 via-white/10 to-red-600/20 shadow-[0_0_35px_rgba(80,180,255,0.18)]">

              <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] border border-white/10 bg-black/20">

                {isVideo ? (
                  <video
                    src={media}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={media}
                    alt={blok.BackgroundImage?.alt || ""}
                    fill
                    priority
                    className="object-cover"
                  />
                )}

              </div>
            </div>
          </div>

          <p className="mt-6  text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {blok.Subtitle || "subtitle"}
          </p>

          {blok.CtaPrimaryText && (
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={resolveLink(blok.CtaPrimaryLink) || "#"}
                className="
                  group
                  inline-flex
                  items-center
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
                  hover:-translate-y-0.5
                "
              >
                {blok.CtaPrimaryText}
</Link>

              {blok.CtaSecondaryText && (
                <Link
                  href={resolveLink(blok.CtaSecondaryLink) || "#"}
                  className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-surface px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-all hover:bg-black hover:border-red-500/60 hover:text-white hover:brightness-110
                  hover:-translate-y-0.5 shadow-[0_0_20px_rgba(70,180,255,.2)] hover:shadow-[0_0_35px_rgba(70,180,255,.35)]"
                >
                  {blok.CtaSecondaryText}
                </Link>
              )}
            </div>
          )}

          {blok.Stats?.length ? (
            <dl className="mt-14 grid  grid-cols-3 gap-4 border-t border-line pt-6">
              {blok.Stats.map((stat, i) => (
                <div key={i}>
                  <dt className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {stat.Value}
                  </dt>
                  <dd className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-electric">
                    {stat.Label}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>


        <div className="relative hidden lg:col-span-6 lg:block">
          <div className="relative h-[440px] overflow-visible lg:h-[460px]">

            {/* Metallic frame */}
            <div className="
              absolute inset-0
              rounded-[2.5rem]
              p-3
              border border-red-500/40
              bg-gradient-to-br
              from-red-600/20
              via-white/10
              to-red-600/20
              shadow-[0_0_35px_rgba(80,180,255,0.18),0_25px_80px_rgba(0,0,0,0.45)]
              ">

              {/* Inner bevel */}
              <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] border border-white/10 bg-black/20 backdrop-blur-sm">

              {blok.ImageStampTitle && (
                <>
                  <p
  className="absolute bottom-6 right-3 z-10 font-mono text-xs uppercase tracking-[0.2em] text-red-600"
  style={{
    textShadow: `
      0 0 6px rgba(239,68,68,.9),
      0 0 12px rgba(220,38,38,.7),
      0 0 24px rgba(185,28,28,.45)
    `
  }}
>
  {blok.ImageStampTitle}
</p>
                </>
              )}

                {isVideo ? (
                  <video
                    src={media}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={media}
                    alt={blok.BackgroundImage?.alt || ""}
                    fill
                    priority
                    className="object-cover"
                  />
                )}

                {/* subtle gloss */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />

                {/* edge highlight */}
                <div className="pointer-events-none absolute inset-[1px] rounded-[2.2rem] ring-1 ring-white/10" />

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
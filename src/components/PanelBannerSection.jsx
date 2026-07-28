"use client";

import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";

import {
  Bolt,
  Cog,
  Ruler,
  Layers,
  Wrench,
  Settings,
  Shield,
  Sparkles,
} from "lucide-react";

const icons = {
  bolt: Bolt,
  cog: Cog,
  ruler: Ruler,
  layers: Layers,
  wrench: Wrench,
  settings: Settings,
  shield: Shield,
  sparkles: Sparkles,
};

export default function PanelBannerSection({ blok }) {
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

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-2">

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
        <div className="px-4 py-14 md:px-10 lg:py-24">

          {blok.eyebrow && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-500">
              {blok.eyebrow}
            </span>
          )}

          <h2 className="mt-3 max-w-md text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {blok.Title}
          </h2>

          {blok.Intro && (
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
              {blok.Intro}
            </p>
          )}

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">

            {blok.Features?.map((feature) => {

              const Icon = icons[feature.Icon] || Bolt;

              return (
                <div
                  key={feature._uid}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-surface
                    card-gloss
                    p-6
                    transition-all
                    duration-300
                    hover:border-red-500/40
                    hover:ring-glow
                  "
                >

                  <span
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-md
                      border
                      border-red-400/40
                      bg-red-600/15
                      text-red-400
                    "
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>

                  <h3 className="mt-4 text-lg font-bold tracking-tight">
                    {feature.Title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.Body}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}
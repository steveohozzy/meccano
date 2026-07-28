"use client";

import { useState } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import { ArrowRight, Check, Bolt } from "lucide-react";

export default function Newsletter({ blok }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setDone(true);
  };

  return (
    <section
      {...storyblokEditable(blok)}
      id="newsletter"
      className="border-b border-line"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 lg:py-20">

        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-red-500/20
            bg-surface
            card-gloss
            shadow-[0_25px_80px_rgba(0,0,0,.45),0_0_35px_rgba(220,38,38,.15)]
            p-8
            md:p-12
            lg:p-16
          "
        >

          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 75% 30%, rgba(220,38,38,.18), transparent 65%)",
            }}
          />

          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">

            {/* Left */}
            <div>

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-500 inline-flex items-center gap-2">
                <Bolt className="h-4 w-4" /><span>{blok.Eyebrow}</span><Bolt className="h-4 w-4" />
              </span>

              <div className="mt-3 max-w-md text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                {blok?.Title || "New drops, build guides & mods. Monthly."}
              </div>

            </div>

            {/* Right */}
            <div>

              {done ? (

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-md
                    border
                    border-red-500/30
                    bg-red-600/10
                    px-5
                    py-6
                  "
                >

                  <Check className="h-6 w-6 text-red-500" />

                  <p className="font-mono text-sm uppercase tracking-[0.1em]">
                    You're on the list. Check your inbox.
                  </p>

                </div>

              ) : (

                <form
                  onSubmit={onSubmit}
                  className="flex flex-col gap-3 sm:flex-row"
                >

                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>

                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@workshop.com"
                    className="
                      w-full
                      rounded-md
                      border
                      border-white/15
                      bg-background/60
                      px-4
                      py-3.5
                      font-mono
                      text-sm
                      text-foreground
                      placeholder:text-muted-foreground
                      focus:border-red-500
                      focus:outline-none
                      focus:ring-glow
                    "
                  />

                  <button
                    type="submit"
                    className="
                      group
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-md
                      bg-red-600
                      px-6
                      py-3.5
                      font-mono
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-white
                      transition-all
                      hover:bg-red-500
                      hover:ring-glow
                      whitespace-nowrap
                    "
                  >
                    Sign up

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                  </button>

                </form>

              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
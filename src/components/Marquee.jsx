'use client';

import { useEffect, useRef, useState } from "react";
import { storyblokEditable } from "@storyblok/react";

export default function Marquee({ blok }) {
  const panels =
    (blok.MarqueeItems ?? []).filter(
      (item) => item?.Title
    );

  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);

  const looped = [...panels, ...panels];

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;

      setDistance(
        trackRef.current.scrollWidth / 2
      );
    };

    measure();

    document.fonts?.ready?.then(measure);

    window.addEventListener(
      "resize",
      measure
    );

    return () =>
      window.removeEventListener(
        "resize",
        measure
      );
  }, []);

  return (
    <section
      {...storyblokEditable(blok)}
      className="overflow-hidden border-b border-t border-red-800/50 bg-surface py-3.5 text-foreground"
    >
      <div
        key={distance}
        ref={trackRef}
        className="flex w-max items-center will-change-transform"
        style={{
          "--marquee-distance": `${distance}px`,
          animation:
            distance > 0
              ? "marquee 40s linear infinite"
              : "none",
        }}
      >
        {looped.map((panel, i) => (
          <span
            key={`${panel._uid}-${i}`}
            className="mx-6 flex items-center gap-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
              {panel.Title}
            <span aria-hidden className="text-red-500">
              /
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
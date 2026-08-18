"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BUILDS = [
  {
    name: "HOT ROD",
    icon: "🚗",
    description: "A rather speedy solution to a missing page.",
    type: "car",
  },
  {
    name: "CRANE",
    icon: "🏗️",
    description: "Heavy lifting required to find this page.",
    type: "crane",
  },
  {
    name: "FERRIS WHEEL",
    icon: "🎡",
    description: "Going round in circles looking for this page.",
    type: "wheel",
  },
  {
    name: "MOTORBIKE",
    icon: "🏍️",
    description: "This page apparently rode off.",
    type: "bike",
  },
  {
    name: "DIGGER",
    icon: "🚜",
    description: "Time to dig a little deeper.",
    type: "digger",
  },
  {
    name: "MACHINE",
    icon: "⚙️",
    description: "Somehow, this should fix everything.",
    type: "machine",
  },
];

function HoleStrip({ count = 6, vertical = false }) {
  return (
    <div
      className={
        vertical
          ? "absolute inset-y-2 left-1/2 flex -translate-x-1/2 flex-col justify-between"
          : "absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between"
      }
    >
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className="size-2 rounded-full bg-[#17191b] shadow-[inset_0_1px_2px_rgba(255,255,255,.15)] sm:size-2.5"
        />
      ))}
    </div>
  );
}

function MetalBeam({
  className = "",
  holes = 6,
  vertical = false,
  red = false,
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[3px] border ${
        red
          ? "border-red-300/40 bg-gradient-to-b from-red-500 via-red-700 to-red-900"
          : "border-white/25 bg-gradient-to-b from-[#d9dcde] via-[#777c80] to-[#303438]"
      } shadow-[0_8px_18px_rgba(0,0,0,.45)] ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-black/20" />

      <HoleStrip count={holes} vertical={vertical} />
    </div>
  );
}

function Bolt({ className = "", red = false }) {
  return (
    <div
      className={`absolute rounded-full border shadow-[0_5px_12px_rgba(0,0,0,.6)] ${
        red
          ? "border-red-300/50 bg-gradient-to-br from-red-300 via-red-600 to-red-900"
          : "border-white/25 bg-gradient-to-br from-[#d9dcde] via-[#686d71] to-[#202326]"
      } ${className}`}
    >
      <div className="absolute inset-[25%] rounded-full border border-black/50 bg-[#202326]" />

      <div className="absolute left-[34%] top-[28%] size-[18%] rounded-full bg-white/30" />
    </div>
  );
}

function Gear({
  className = "",
  size = "size-16",
  reverse = false,
  spinning = true,
}) {
  return (
    <div
      className={`absolute ${size} ${className} ${
        spinning
          ? reverse
            ? "animate-[gearReverse_3s_linear_infinite]"
            : "animate-[gearSlow_3s_linear_infinite]"
          : ""
      }`}
    >
      <div className="absolute inset-[12%] rounded-full border-[8px] border-[#777c80] bg-[#24272a] shadow-[0_5px_15px_rgba(0,0,0,.6)]">
        <div className="absolute inset-[25%] rounded-full border-2 border-white/20" />

        <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#111315]" />
      </div>

      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className="absolute left-1/2 top-0 h-[24%] w-[18%] -translate-x-1/2 rounded-[2px] bg-[#777c80]"
          style={{
            transform: `rotate(${index * 45}deg) translateY(-2px)`,
            transformOrigin: "50% 50%",
          }}
        />
      ))}
    </div>
  );
}

function Wheel({ className = "", size = "size-24", spinning = false }) {
  return (
    <div
      className={`absolute ${size} rounded-full border-[8px] border-[#777c80] bg-[#1c1f21] shadow-[0_8px_20px_rgba(0,0,0,.55)] ${
        spinning ? "animate-[wheelSpin_2.5s_linear_infinite]" : ""
      } ${className}`}
    >
      <div className="absolute inset-[16%] rounded-full border-2 border-white/15" />

      <div className="absolute left-1/2 top-1/2 h-[75%] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-[#888d91]" />

      <div className="absolute left-1/2 top-1/2 h-[75%] w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-90 bg-[#888d91]" />

      <div className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20 bg-[#222527]" />
    </div>
  );
}

/* =========================================================
   BUILDS
========================================================= */

function CarBuild() {
  return (
    <div className="absolute inset-0 animate-[finishedFloat_4s_ease-in-out_infinite]">
      <MetalBeam
        className="left-[17%] top-[48%] h-6 w-[66%] rotate-[-2deg]"
        holes={7}
      />

      <MetalBeam
        className="left-[28%] top-[30%] h-5 w-[45%] rotate-[3deg]"
        holes={5}
        red
      />

      <MetalBeam
        className="left-[32%] top-[32%] h-24 w-5 rotate-[8deg]"
        holes={4}
        vertical
      />

      <MetalBeam
        className="right-[32%] top-[31%] h-24 w-5 rotate-[-8deg]"
        holes={4}
        vertical
      />

      <Wheel
        className="bottom-[20%] left-[22%]"
        size="size-20"
        spinning
      />

      <Wheel
        className="bottom-[20%] right-[22%]"
        size="size-20"
        spinning
      />

      <Bolt className="left-[42%] top-[45%] size-6" />

      <Bolt className="right-[42%] top-[45%] size-6" />

      <Gear
        className="left-[42%] top-[17%]"
        size="size-8"
      />
    </div>
  );
}

function CraneBuild() {
  return (
    <div className="absolute inset-0 animate-[finishedFloat_4.5s_ease-in-out_infinite]">
      <MetalBeam
        className="bottom-[18%] left-[18%] h-6 w-[64%]"
        holes={7}
      />

      <MetalBeam
        className="bottom-[25%] left-[28%] h-[52%] w-5 rotate-[2deg]"
        holes={5}
        vertical
      />

      <MetalBeam
        className="bottom-[70%] left-[29%] h-5 w-[45%] rotate-[-2deg]"
        holes={6}
        red
      />

      <MetalBeam
        className="bottom-[37%] right-[18%] h-5 w-[40%] rotate-[22deg]"
        holes={5}
      />

      <Gear
        className="bottom-[19%] left-[25%]"
        size="size-14"
      />

      <Gear
        className="bottom-[20%] left-[34%]"
        size="size-9"
        reverse
      />

      <div className="absolute right-[15%] top-[63%] h-14 w-8 rounded-b-lg border border-white/20 bg-gradient-to-b from-[#888d91] to-[#34383b]">
        <div className="absolute -bottom-3 left-1/2 size-5 -translate-x-1/2 rounded-full border-2 border-yellow-300 bg-yellow-500/40" />
      </div>

      <Bolt className="bottom-[20%] left-[47%] size-6" />
    </div>
  );
}

function FerrisBuild() {
  return (
    <div className="absolute inset-0 animate-[finishedFloat_5s_ease-in-out_infinite]">
      <div className="absolute bottom-[15%] left-1/2 h-28 w-4 -translate-x-1/2 bg-gradient-to-b from-[#aaaeb1] to-[#3a3e41]" />

      <MetalBeam
        className="bottom-[15%] left-[28%] h-5 w-[44%] rotate-[-12deg]"
        holes={5}
        red
      />

      <MetalBeam
        className="bottom-[15%] left-[28%] h-5 w-[44%] rotate-[12deg]"
        holes={5}
      />

      <div className="absolute left-1/2 top-[8%] size-36 -translate-x-1/2 animate-[gearSlow_8s_linear_infinite] rounded-full border-[7px] border-[#888d91]">
        <div className="absolute inset-4 rounded-full border-2 border-white/15" />

        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="absolute left-1/2 top-1/2 h-[2px] w-1/2 origin-left bg-[#888d91]"
            style={{
              transform: `rotate(${index * 45}deg)`,
            }}
          />
        ))}

        <div className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20 bg-[#222527]" />

        {[
          "left-[2px] top-1/2",
          "right-[2px] top-1/2",
          "left-1/2 top-[2px]",
          "left-1/2 bottom-[2px]",
        ].map((position, index) => (
          <span
            key={index}
            className={`absolute ${position} size-5 -translate-x-1/2 -translate-y-1/2 rounded-md border border-red-300/30 bg-red-600`}
          />
        ))}
      </div>
    </div>
  );
}

function BikeBuild() {
  return (
    <div className="absolute inset-0 animate-[finishedFloat_4s_ease-in-out_infinite]">
      <Wheel
        className="bottom-[17%] left-[19%]"
        size="size-24"
        spinning
      />

      <Wheel
        className="bottom-[17%] right-[19%]"
        size="size-24"
        spinning
      />

      <MetalBeam
        className="bottom-[38%] left-[28%] h-5 w-[43%] rotate-[-8deg]"
        holes={5}
        red
      />

      <MetalBeam
        className="bottom-[34%] left-[42%] h-5 w-28 rotate-[48deg]"
        holes={4}
      />

      <MetalBeam
        className="bottom-[36%] right-[27%] h-5 w-24 rotate-[-45deg]"
        holes={4}
      />

      <MetalBeam
        className="bottom-[52%] left-[49%] h-5 w-24 rotate-[-25deg]"
        holes={4}
      />

      <Bolt
        className="bottom-[38%] left-[48%] size-7"
        red
      />

      <Bolt
        className="bottom-[42%] right-[35%] size-5"
      />
    </div>
  );
}

function DiggerBuild() {
  return (
    <div className="absolute inset-0 animate-[finishedFloat_4s_ease-in-out_infinite]">
      <MetalBeam
        className="bottom-[18%] left-[20%] h-6 w-[60%]"
        holes={7}
        red
      />

      <Wheel
        className="bottom-[14%] left-[24%]"
        size="size-14"
        spinning
      />

      <Wheel
        className="bottom-[14%] right-[24%]"
        size="size-14"
        spinning
      />

      <MetalBeam
        className="bottom-[29%] left-[38%] h-5 w-[32%] rotate-[-20deg]"
        holes={4}
      />

      <MetalBeam
        className="bottom-[42%] right-[24%] h-5 w-[28%] rotate-[30deg]"
        holes={4}
      />

      <MetalBeam
        className="bottom-[52%] right-[13%] h-20 w-5 rotate-[40deg]"
        holes={4}
        vertical
      />

      <div className="absolute bottom-[26%] right-[9%] h-10 w-20 rotate-[18deg] border border-yellow-300/30 bg-gradient-to-b from-yellow-500 to-orange-700 shadow-lg" />

      <Gear
        className="bottom-[22%] left-[42%]"
        size="size-12"
      />
    </div>
  );
}

function MachineBuild() {
  return (
    <div className="absolute inset-0 animate-[finishedFloat_3.5s_ease-in-out_infinite]">
      <MetalBeam
        className="left-[19%] top-[45%] h-6 w-[62%]"
        holes={7}
      />

      <MetalBeam
        className="left-[38%] top-[22%] h-5 w-[28%] rotate-90"
        holes={4}
        vertical
        red
      />

      <Gear
        className="left-[25%] top-[25%]"
        size="size-20"
      />

      <Gear
        className="right-[24%] top-[30%]"
        size="size-14"
        reverse
      />

      <Gear
        className="bottom-[12%] left-[43%]"
        size="size-12"
      />

      <Bolt
        className="left-[47%] top-[44%] size-7"
      />

      <div className="absolute bottom-[14%] left-[30%] h-10 w-40 rounded-sm border border-white/20 bg-gradient-to-b from-[#777c80] to-[#25282b]" />
    </div>
  );
}

function FinishedBuild({ type }) {
  switch (type) {
    case "car":
      return <CarBuild />;

    case "crane":
      return <CraneBuild />;

    case "wheel":
      return <FerrisBuild />;

    case "bike":
      return <BikeBuild />;

    case "digger":
      return <DiggerBuild />;

    default:
      return <MachineBuild />;
  }
}

/* =========================================================
   PAGE
========================================================= */

export default function NotFound() {
  const [isBuilding, setIsBuilding] = useState(false);
  const [build, setBuild] = useState(null);
  const [buildNumber, setBuildNumber] = useState(0);

  useEffect(() => {
    return () => {};
  }, []);

  const startBuild = () => {
    if (isBuilding) return;

    const available = BUILDS.filter(
      (item) => item.type !== build?.type
    );

    const next =
      available[Math.floor(Math.random() * available.length)];

    setBuild(null);
    setIsBuilding(true);

    window.setTimeout(() => {
      setBuild(next);
      setBuildNumber((number) => number + 1);
      setIsBuilding(false);
    }, 1200);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-line bg-grid px-4 py-8 md:px-8">

      {/* Background */}
      <div className="hero-spotlight hero-spotlight-1" />
      <div className="hero-spotlight hero-spotlight-2" />
      <div className="hero-spotlight hero-spotlight-3" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">

        {/* Status */}
        <div className="mb-5 flex justify-center">
          <span className="flex items-center gap-2 rounded-full border border-red-500 bg-red-600/25 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-red-100 shadow-[0_0_20px_rgba(220,38,38,.2)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,.8)]" />
            Build failed / 404
          </span>
        </div>

        {/* 404 */}
        <h1 className="text-[7rem] font-extrabold leading-[0.8] tracking-[-0.08em] text-foreground sm:text-[7rem]">
          4
          <span className="bg-gradient-to-r from-red-800 to-red-500 bg-clip-text text-transparent">
            0
          </span>
          4
        </h1>

        {/* Message */}
        <h2 className="mt-5 text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Uh-oh. This build didn&apos;t quite go to plan.
        </h2>

        <p className="mx-auto mt-2 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Looks like we&apos;ve got a few parts missing.
          <br className="hidden sm:block" />
          <span className="text-foreground">
            Let&apos;s build something instead.
          </span>
        </p>

        {/* =====================================================
            WORKBENCH
        ===================================================== */}

        <div className="relative mx-auto mt-5 h-[250px] w-full max-w-[600px] sm:mt-7 sm:h-[290px]">

          <div className="absolute bottom-5 left-1/2 h-8 w-[75%] -translate-x-1/2 rounded-full bg-red-500/10 blur-2xl" />

          {/* Loose parts */}
          {!build && (
            <>
              <MetalBeam
                className={`left-[8%] top-[22%] h-5 w-36 rotate-[-18deg] transition-all duration-1000 ${
                  isBuilding
                    ? "translate-x-[170px] translate-y-[70px] rotate-[-5deg] opacity-0"
                    : "animate-[loosePart_3s_ease-in-out_infinite]"
                }`}
                holes={5}
              />

              <MetalBeam
                className={`right-[8%] top-[18%] h-5 w-32 rotate-[21deg] transition-all duration-1000 ${
                  isBuilding
                    ? "-translate-x-[150px] translate-y-[80px] rotate-[5deg] opacity-0"
                    : "animate-[loosePart2_3.5s_ease-in-out_infinite]"
                }`}
                holes={5}
                red
              />

              <MetalBeam
                className={`left-[18%] bottom-[23%] h-5 w-28 rotate-[35deg] transition-all duration-1000 ${
                  isBuilding
                    ? "translate-x-[110px] -translate-y-[40px] rotate-[5deg] opacity-0"
                    : "animate-[loosePart3_4s_ease-in-out_infinite]"
                }`}
                holes={4}
              />

              <MetalBeam
                className={`right-[18%] bottom-[25%] h-5 w-28 rotate-[-30deg] transition-all duration-1000 ${
                  isBuilding
                    ? "-translate-x-[100px] -translate-y-[40px] rotate-[-5deg] opacity-0"
                    : "animate-[loosePart4_3.2s_ease-in-out_infinite]"
                }`}
                holes={4}
              />

              <Gear
                className={`left-[27%] top-[30%] ${
                  isBuilding
                    ? "translate-x-[70px] translate-y-[30px] scale-50 opacity-0"
                    : ""
                }`}
                size="size-14"
              />

              <Gear
                className={`right-[27%] top-[33%] ${
                  isBuilding
                    ? "-translate-x-[70px] translate-y-[25px] scale-50 opacity-0"
                    : ""
                }`}
                size="size-12"
                reverse
              />

              <Bolt
                className={`left-[12%] bottom-[12%] size-7 ${
                  isBuilding
                    ? "translate-x-[160px] -translate-y-[60px] opacity-0"
                    : "animate-[boltWobble_2s_ease-in-out_infinite]"
                }`}
              />

              <Bolt
                className={`right-[12%] bottom-[12%] size-8 ${
                  isBuilding
                    ? "-translate-x-[150px] -translate-y-[55px] opacity-0"
                    : "animate-[boltWobble_2.4s_ease-in-out_infinite]"
                }`}
                red
              />
            </>
          )}

          {/* Assembly animation */}
          {isBuilding && !build && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

              <div className="relative size-28">

                <div className="absolute inset-0 animate-spin rounded-full border-4 border-dashed border-red-500/40" />

                <div className="absolute inset-4 animate-[gearSlow_2s_linear_infinite] rounded-full border-8 border-[#777c80] bg-[#222527]" />

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] font-bold uppercase tracking-widest text-white">
                  BUILD
                </div>

              </div>

            </div>
          )}

          {/* Finished build */}
          {build && (
            <FinishedBuild
              key={buildNumber}
              type={build.type}
            />
          )}

          {/* Label */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.2em] text-red-500/60">
            {build
              ? `BUILD COMPLETE // ${build.name}`
              : isBuilding
                ? "ASSEMBLY IN PROGRESS // PLEASE STAND BY"
                : "PARTS READY // AWAITING BUILDER"}
          </div>
        </div>

        {/* Result */}
        <div className="mx-auto min-h-[58px] max-w-xl">

          {build ? (
            <div
              key={buildNumber}
              className="animate-[resultPop_0.4s_ease-out]"
            >
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-3">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-emerald-400">
                  ✓ Assembly complete
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {build.icon}{" "}
                  <span className="font-semibold text-foreground">
                    {build.name}
                  </span>{" "}
                  — {build.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-2 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <span className="text-red-500">●</span>{" "}
                Page missing
                <span className="mx-3 text-white/20">|</span>
                <span className="text-yellow-500">●</span>{" "}
                Parts available
                <span className="mx-3 text-white/20">|</span>
                <span className="text-emerald-500">●</span>{" "}
                Builder required
              </p>
            </div>
          )}
        <button
            type="button"
            onClick={startBuild}
            disabled={isBuilding}
            className="group inline-flex items-center gap-3 rounded-md border border-red-400/50 bg-gradient-to-b from-red-600 to-red-800 px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_25px_rgba(220,38,38,.35)] transition-all hover:-translate-y-1 hover:brightness-110 hover:shadow-[0_0_40px_rgba(220,38,38,.55)] disabled:cursor-wait disabled:opacity-70 mt-2 cursor-pointer"
          >
            <span className="text-base transition-transform duration-300 group-hover:rotate-180">
              ⚙
            </span>

            {isBuilding
              ? "Assembling..."
              : build
                ? "Build Another"
                : "Build It!"}
          </button>
        </div>

        {/* Build controls */}
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              rounded-md
              border
              border-red-400/40
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
              shadow-[0_0_25px_rgba(220,38,38,.35)]
              transition-all
              hover:-translate-y-0.5
              hover:brightness-110
              hover:shadow-[0_0_35px_rgba(220,38,38,.5)]
            "
          >
            Back to home
          </Link>

          <Link
            href="/discover"
            className="
              inline-flex
              items-center
              gap-2
              rounded-md
              border
              border-white/15
              bg-surface
              px-6
              py-3.5
              font-mono
              text-xs
              uppercase
              tracking-[0.15em]
              text-muted-foreground
              transition-all
              hover:-translate-y-0.5
              hover:border-red-500/60
              hover:bg-black
              hover:text-white
              hover:shadow-[0_0_25px_rgba(220,38,38,.2)]
            "
          >
            Explore Meccano
          </Link>

        </div>

        {build && (
          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            Not quite the page you were looking for... but at least we built a{" "}
            {build.name.toLowerCase()}.
          </p>
        )}

        {/* Footer */}
        <div className="mx-auto mt-10 max-w-md border-t border-line pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            404 // Build incomplete // Return to assembly
          </p>
        </div>

      </div>

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style jsx>{`
        @keyframes loosePart {
          0%,
          100% {
            transform: translateY(0) rotate(-18deg);
          }

          50% {
            transform: translateY(-14px) rotate(-10deg);
          }
        }

        @keyframes loosePart2 {
          0%,
          100% {
            transform: translateY(0) rotate(21deg);
          }

          50% {
            transform: translateY(12px) rotate(30deg);
          }
        }

        @keyframes loosePart3 {
          0%,
          100% {
            transform: translateY(0) rotate(35deg);
          }

          50% {
            transform: translateY(-10px) rotate(25deg);
          }
        }

        @keyframes loosePart4 {
          0%,
          100% {
            transform: translateY(0) rotate(-30deg);
          }

          50% {
            transform: translateY(-12px) rotate(-20deg);
          }
        }

        @keyframes boltWobble {
          0%,
          100% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(20deg) translateY(-5px);
          }
        }

        @keyframes gearSlow {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gearReverse {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes wheelSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes finishedFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes resultPop {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(8px);
          }

          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
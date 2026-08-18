import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-line bg-grid px-4 py-20 md:px-8">
      {/* Atmospheric background */}
      <div className="hero-spotlight hero-spotlight-1" />
      <div className="hero-spotlight hero-spotlight-2" />
      <div className="hero-spotlight hero-spotlight-3" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">

        {/* Technical status */}
        <div className="mb-6 flex justify-center">
          <span className="flex items-center gap-2 rounded-full border border-red-500 bg-red-600/25 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-red-100 shadow-[0_0_20px_rgba(220,38,38,.2)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,.8)]" />
            Build failed / 404
          </span>
        </div>

        {/* 404 */}
        <h1 className="text-[8rem] font-extrabold leading-[0.8] tracking-[-0.08em] text-foreground sm:text-[10rem] lg:text-[12rem]">
          4
          <span className="bg-gradient-to-r from-red-800 to-red-500 bg-clip-text text-transparent">
            0
          </span>
          4
        </h1>

        {/* Main message */}
        <h2 className="mt-10 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Uh-oh. This build didn't quite go to plan.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Looks like we've got a few parts missing. The instructions say this
          page should be here... but something definitely went wrong along the way.
        </p>

        {/* Broken Meccano build */}
        <div className="relative mx-auto my-12 h-36 w-full max-w-[520px]">

          {/* Workbench shadow */}
          <div className="absolute bottom-3 left-1/2 h-5 w-80 -translate-x-1/2 rounded-full bg-black/40 blur-xl" />

          {/* Main metal beam */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-8
              w-64
              -translate-x-1/2
              -translate-y-1/2
              rotate-[-7deg]
              rounded-sm
              border
              border-white/15
              bg-gradient-to-b
              from-white/25
              via-white/10
              to-white/5
              shadow-[0_15px_35px_rgba(0,0,0,.45)]
            "
          >
            {/* Holes */}
            <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
              {Array.from({ length: 7 }).map((_, index) => (
                <span
                  key={index}
                  className="size-2.5 rounded-full bg-black/70 ring-1 ring-white/10"
                />
              ))}
            </div>
          </div>

          {/* Red beam — slightly detached */}
          <div
            className="
              absolute
              left-[30%]
              top-[62%]
              h-7
              w-40
              rotate-[25deg]
              rounded-sm
              border
              border-red-400/30
              bg-gradient-to-b
              from-red-600
              to-red-900
              shadow-[0_0_25px_rgba(220,38,38,.25)]
            "
          >
            <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="size-2 rounded-full bg-black/60"
                />
              ))}
            </div>
          </div>

          {/* Vertical beam that's fallen over */}
          <div
            className="
              absolute
              right-[22%]
              top-2
              h-28
              w-7
              rotate-[18deg]
              rounded-sm
              border
              border-white/15
              bg-gradient-to-r
              from-white/20
              to-white/5
              shadow-[0_10px_30px_rgba(0,0,0,.5)]
            "
          >
            <div className="absolute inset-y-4 left-1/2 flex -translate-x-1/2 flex-col justify-between">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-2 rounded-full bg-black/70"
                />
              ))}
            </div>
          </div>

          {/* Central bolt */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              size-14
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-white/20
              bg-[#111315]
              shadow-[0_10px_30px_rgba(0,0,0,.7)]
            "
          >
            <div className="absolute inset-2 rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
          </div>

          {/* Loose bolts */}
          <div className="absolute left-[18%] top-5 size-7 rounded-full border border-white/20 bg-white/10 shadow-[0_0_15px_rgba(255,255,255,.1)]" />

          <div className="absolute right-[13%] bottom-3 size-8 rounded-full border border-red-500/50 bg-red-600/10 shadow-[0_0_20px_rgba(220,38,38,.25)]" />

          {/* Floating instruction warning */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-md border border-red-500/30 bg-red-950/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-red-400 shadow-lg backdrop-blur-md">
            Missing part
          </div>

          {/* Small technical labels */}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-red-500/70">
            ASSEMBLY ERROR // CHECK INSTRUCTIONS
          </span>
        </div>

        {/* Little builder joke */}
        <div className="mx-auto max-w-xl rounded-xl border border-white/10 bg-white/[0.03] px-2 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="text-red-500">●</span>{" "}
            Part missing
            <span className="mx-3 text-white/20">|</span>
            <span className="text-red-500">●</span>{" "}
            Instructions unclear
            <span className="mx-3 text-white/20">|</span>
            <span className="text-emerald-500">●</span>{" "}
            Builder still optimistic
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-9 flex flex-wrap justify-center gap-3">

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

        {/* Footer */}
        <div className="mx-auto mt-14 max-w-md border-t border-line pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            404 // Build incomplete // Return to assembly
          </p>
        </div>

      </div>
    </main>
  );
}
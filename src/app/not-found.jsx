import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-line bg-grid px-4 py-20 md:px-8">
      {/* Atmospheric background */}
      <div className="hero-spotlight hero-spotlight-1" />
      <div className="hero-spotlight hero-spotlight-2" />
      <div className="hero-spotlight hero-spotlight-3" />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">

        {/* Status label */}
        <div className="mb-6 flex justify-center">
          <span className="flex items-center gap-2 rounded-full border border-red-500 bg-red-600/25 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-red-100 shadow-[0_0_20px_rgba(220,38,38,.2)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            Error / 404
          </span>
        </div>

        {/* 404 */}
        <h1 className="text-[8rem] font-extrabold leading-[0.8] tracking-tight text-foreground sm:text-[10rem] lg:text-[12rem]">
          4
          <span className="bg-gradient-to-r from-red-800 to-red-500 bg-clip-text text-transparent">
            0
          </span>
          4
        </h1>

        {/* Message */}
        <h2 className="mt-10 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Looks like this build is missing a few parts.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          We couldn’t find the page you’re looking for. It may have been
          moved, taken apart, or simply never made it onto the workbench.
        </p>

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
            "
          >
            Explore Meccano
          </Link>
        </div>

        {/* Footer status */}
        <div className="mx-auto mt-14 max-w-md border-t border-line pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Error 404 // Page unavailable // Return to assembly
          </p>
        </div>
      </div>
    </main>
  );
}
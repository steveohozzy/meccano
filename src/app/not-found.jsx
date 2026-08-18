import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden border-b border-line bg-grid px-4 py-20 md:px-8">
      {/* Atmospheric background */}
      <div className="hero-spotlight hero-spotlight-1" />
      <div className="hero-spotlight hero-spotlight-2" />
      <div className="hero-spotlight hero-spotlight-3" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left */}
          <div className="text-center lg:col-span-7 lg:text-left">

            {/* Status label */}
            <div className="mb-6 flex justify-center lg:justify-start">
              <span className="flex items-center gap-2 rounded-full border border-red-500 bg-red-600/25 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-red-100 shadow-[0_0_20px_rgba(220,38,38,.2)] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                Error / 404
              </span>
            </div>

            {/* 404 */}
            <h1 className="text-[7rem] font-extrabold leading-[0.8] tracking-tight text-foreground sm:text-[9rem] lg:text-[11rem]">
              4
              <span className="bg-gradient-to-r from-red-800 to-red-500 bg-clip-text text-transparent">
                0
              </span>
              4
            </h1>

            <h2 className="mt-8 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Looks like this build is missing a few parts.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
              We couldn’t find the page you’re looking for. It may have been
              moved, taken apart, or simply never made it onto the workbench.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
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
          </div>

          {/* Right */}
          <div className="lg:col-span-5">
            <div
              className="
                relative
                mx-auto
                h-[360px]
                max-w-[420px]
                overflow-hidden
                rounded-[2.5rem]
                border
                border-red-500/40
                bg-gradient-to-br
                from-red-600/20
                via-white/10
                to-red-600/20
                p-3
                shadow-[0_0_35px_rgba(80,180,255,0.18)]
                lg:h-[420px]
              "
            >
              {/* Inner frame */}
              <div
                className="
                  relative
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[2.3rem]
                  border
                  border-white/10
                  bg-black/20
                  backdrop-blur-sm
                "
              >
                {/* Glow */}
                <div className="absolute h-48 w-48 rounded-full bg-red-600/20 blur-[70px]" />

                {/* Mechanical graphic */}
                <div className="relative h-52 w-64">

                  {/* Main metal beam */}
                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-7
                      w-60
                      -translate-x-1/2
                      -translate-y-1/2
                      rotate-6
                      rounded-sm
                      border
                      border-white/10
                      bg-gradient-to-b
                      from-white/20
                      to-white/5
                    "
                  >
                    <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
                      {Array.from({ length: 7 }).map((_, index) => (
                        <span
                          key={index}
                          className="h-2.5 w-2.5 rounded-full bg-black/70"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Red beam */}
                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-7
                      w-44
                      -translate-x-1/2
                      -translate-y-1/2
                      -rotate-45
                      rounded-sm
                      border
                      border-red-400/30
                      bg-gradient-to-r
                      from-red-900
                      via-red-700
                      to-red-500
                      shadow-[0_0_25px_rgba(220,38,38,.3)]
                    "
                  />

                  {/* Centre bolt */}
                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-14
                      w-14
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      border
                      border-white/20
                      bg-[#111315]
                    "
                  >
                    <div
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        h-5
                        w-5
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        border
                        border-white/20
                        bg-white/10
                      "
                    />
                  </div>

                  {/* Loose bolt */}
                  <div
                    className="
                      absolute
                      right-0
                      top-1
                      h-9
                      w-9
                      rounded-full
                      border
                      border-red-500/50
                      bg-red-600/10
                      shadow-[0_0_20px_rgba(220,38,38,.25)]
                    "
                  />

                  {/* Technical label */}
                  <div
                    className="
                      absolute
                      bottom-0
                      left-2
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-red-500
                    "
                  >
                    Part not found
                  </div>
                </div>

                {/* Gloss */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />

                {/* Edge highlight */}
                <div className="pointer-events-none absolute inset-[1px] rounded-[2.2rem] ring-1 ring-white/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer status */}
        <div className="mt-14 border-t border-line pt-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Error 404 // Page unavailable // Return to assembly
          </p>
        </div>
      </div>
    </main>
  );
}
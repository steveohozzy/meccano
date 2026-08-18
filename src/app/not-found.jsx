import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f3eee7] px-6 py-20">
      {/* Background construction details */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 size-72 rounded-full bg-[#d71920]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 size-96 rounded-full bg-[#1f1f1f]/10 blur-3xl" />

        {/* Decorative bolts */}
        <div className="absolute left-[8%] top-[18%] size-5 rounded-full border-4 border-[#1f1f1f]/10" />
        <div className="absolute right-[12%] top-[28%] size-7 rounded-full border-4 border-[#d71920]/15" />
        <div className="absolute bottom-[18%] left-[15%] size-6 rounded-full border-4 border-[#d71920]/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Meccano-style badge */}
        <div className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full border border-[#1f1f1f]/10 bg-white/70 px-5 py-2 shadow-sm backdrop-blur">
          <span className="size-3 rounded-full bg-[#d71920]" />
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#1f1f1f]">
            Meccano
          </span>
        </div>

        {/* Big 404 */}
        <h1 className="font-heading text-8xl font-black leading-none tracking-tight text-[#d71920] sm:text-9xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight text-[#1f1f1f] sm:text-4xl">
          Looks like this build is missing a few parts.
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#5f5a55] sm:text-lg">
          We couldn’t find the page you’re looking for. It may have been
          moved, taken apart, or simply never made it onto the workbench.
        </p>

        {/* Meccano-inspired construction graphic */}
        <div className="relative mx-auto my-12 h-36 w-64">
          {/* Horizontal metal beam */}
          <div className="absolute left-1/2 top-1/2 h-5 w-56 -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-sm bg-[#1f1f1f] shadow-md">
            <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
              {Array.from({ length: 7 }).map((_, index) => (
                <span
                  key={index}
                  className="size-2.5 rounded-full bg-[#f3eee7]"
                />
              ))}
            </div>
          </div>

          {/* Red connecting beam */}
          <div className="absolute left-1/2 top-1/2 h-5 w-40 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-sm bg-[#d71920] shadow-md" />

          {/* Centre bolt */}
          <div className="absolute left-1/2 top-1/2 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#1f1f1f] bg-[#f3eee7] shadow-md" />

          {/* Corner bolts */}
          <div className="absolute left-7 top-5 size-7 rounded-full border-4 border-[#1f1f1f] bg-[#f3eee7]" />
          <div className="absolute bottom-5 right-7 size-7 rounded-full border-4 border-[#d71920] bg-[#f3eee7]" />
        </div>

        {/* CTAs */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="
              inline-flex items-center justify-center
              rounded-full
              bg-[#d71920]
              px-7 py-3.5
              font-bold
              text-white
              shadow-lg shadow-[#d71920]/20
              transition-all
              hover:-translate-y-1
              hover:bg-[#b9141a]
              hover:shadow-xl
            "
          >
            Back to the workshop
          </Link>

          <Link
            href="/discover"
            className="
              inline-flex items-center justify-center
              rounded-full
              border-2 border-[#1f1f1f]
              bg-transparent
              px-7 py-3.5
              font-bold
              text-[#1f1f1f]
              transition-all
              hover:-translate-y-1
              hover:bg-[#1f1f1f]
              hover:text-white
            "
          >
            Explore Meccano
          </Link>
        </div>

        <p className="mt-8 text-sm font-medium text-[#77716b]">
          Check the URL or head back to the workshop and start building again.
        </p>
      </div>
    </main>
  );
}
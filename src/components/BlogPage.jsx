import { storyblokEditable, renderRichText } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok";
import BlogFilters from "./BlogFilters";

export default async function BlogPage({ blok }) {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.get("cdn/stories", {
    starts_with: "blog/",
    content_type: "blogPost",
    version: "draft",
  });

  const posts = data.stories;

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        className="relative overflow-hidden border-b border-white/10 bg-background"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-grid opacity-40"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-red-500">
              Parenting, play & creativity
            </span>

            <h1 className="mt-4 text-balance text-5xl font-heading tracking-tight sm:text-6xl">
              {blok.title}
            </h1>

            {blok.intro && (
              <div
                className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground prose prose-invert prose-p:my-0"
                dangerouslySetInnerHTML={{
                  __html: renderRichText(blok.intro),
                }}
              />
            )}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:py-16">
          <BlogFilters posts={posts} />
        </div>
      </section>
    </>
  );
}
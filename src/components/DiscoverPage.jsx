import { getStoryblokApi } from "@/lib/storyblok";
import DiscoverFilters from "./DiscoverFilters";
import { renderRichText, storyblokEditable } from "@storyblok/react/rsc";

export default async function DiscoverPage({ blok }) {

  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.get(
    "cdn/stories",
    {
      starts_with: "discover/",
      content_type: "instructionPage",
      version: "draft",
    }
  );

  const products = data.stories;

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        className="bg-background"
      >
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-8 lg:pb-24">

          <h1 className="mb-8 text-center text-5xl font-heading">
            {blok.title}
          </h1>

          <div className="mx-auto max-w-4xl text-center"
          dangerouslySetInnerHTML={{
            __html: renderRichText(blok.intro),
          }} />

        </div>
      </section>


      <section>
        <div className="mx-auto max-w-7xl px-4 pb-16 md:px-8">

          <DiscoverFilters products={products} />

        </div>
      </section>
    </>
  );
}
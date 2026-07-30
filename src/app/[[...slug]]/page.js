import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok";
import { notFound } from "next/navigation";
import InstructionPage from "@/components/instructionPage";

export default async function Page({ params }) {
  const slug = (await params)?.slug?.join("/") || "home";

  let data;

  try {
    const storyblokApi = getStoryblokApi();

    const res = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: "draft",
    });

    data = res.data;

    if (!data?.story) {
      notFound();
    }

    // For instruction pages, fetch all discover products
    if (data.story.content.component === "instructionPage") {
      const allProducts = [];

      let page = 1;
      let totalPages = 1;

      do {
        const discoverRes = await storyblokApi.get("cdn/stories", {
          starts_with: "discover/",
          content_type: "instructionPage",
          version: "draft",
          per_page: 100,
          page,
        });

        allProducts.push(...discoverRes.data.stories);

        totalPages = discoverRes.totalPages || 1;
        page++;
      } while (page <= totalPages);

      return (
        <InstructionPage
          blok={data.story.content}
          products={allProducts}
        />
      );
    }
  } catch (e) {
    notFound();
  }

  return <StoryblokStory story={data.story} />;
}
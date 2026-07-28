import { getStoryblokApi } from "./storyblok";

export async function getNavigation() {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.get(
    "cdn/stories",
    {
      version: "draft",
      per_page: 100,
    }
  );

  return data.stories
    .filter((story) => {

      // only root pages
      if (story.full_slug.includes("/")) {

        // allow folder landing pages like blog/
        if (!story.is_startpage) {
          return false;
        }
      }


      // remove home
      if (story.slug === "home") {
        return false;
      }


      // remove globals
      if (story.full_slug.startsWith("globals")) {
        return false;
      }


      return true;

    })
    .map((story) => ({
      id: story.id,
      name: story.name,
      slug: story.full_slug.replace(/\/$/, ""),
    }));
}
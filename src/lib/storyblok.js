import Page from "@/components/Page";
import BlogPage from "@/components/BlogPage";
import BlogPost from "@/components/BlogPost";
import BrandsHub from "@/components/BrandsHub";
import BrandSection from "@/components/BrandSection";
import HomepageHero from "@/components/HomepageHero";
import StorySection from "@/components/StorySection";
import Marquee from "@/components/Marquee";
import PanelsSet from "@/components/PanelsSet";
import Blog from "@/components/BlogSection";
import Newsletter from "@/components/Newsletter";
import RichText from "@/components/RichText";
import Grid from "@/components/Grid";
import Column from "@/components/Column";
import HtmlBlock from "@/components/HTMLBlock";
import CollectionPreview from "@/components/CollectionPreview";
import PanelBannerSection from "@/components/PanelBannerSection";
import ImageTextBanner from "@/components/ImageTextBanner";

import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";


export function resolveLink(link) {
  if (!link) return "/";

  if (link.linktype === "story") {
    return `/${link.cached_url}`;
  }

  return link.url || "/";
}

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,

  use: [apiPlugin],

  components: {
    page: Page,
    homepageHero: HomepageHero,
    storySection: StorySection,
    Marquee: Marquee,
    panelsSet: PanelsSet,
    blogSection: Blog,
    newsletter: Newsletter,
    RichText: RichText,
    Grid: Grid,
    column: Column,
    htmlBlock: HtmlBlock,
    blogPage: BlogPage,
    blogPost: BlogPost,
    brandsHub: BrandsHub,
    brandSection: BrandSection,
    CollectionPreview: CollectionPreview,
    PanelBannerSection: PanelBannerSection,
    ImageTextBanner: ImageTextBanner,
  },

  apiOptions: {
    region: "eu",
  },
});
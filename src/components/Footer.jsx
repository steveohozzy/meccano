import Link from "next/link";
import Image from "next/image";

import { getNavigation } from "@/lib/getNavigation";
import {
  getStoryblokApi,
  resolveLink,
} from "@/lib/storyblok";

import InstagramIcon from "./icons/InstagramIcon";
import FacebookIcon from "./icons/FacebookIcon";
import YoutubeIcon from "./icons/YouTubeIcon";

export default async function Footer() {
  const menuItems =
    await getNavigation();

  const storyblokApi =
    getStoryblokApi();

  const { data } =
    await storyblokApi.get(
      "cdn/stories/globals/footer",
      {
        version: "draft",
      }
    );

  const footer =
  data?.story?.content?.body?.find(
    (blok) => blok.component === "footer"
  ) || {};

  const socials = [
    {
      name: "Instagram",
      url: resolveLink(
        footer.socialInstagram
      ),
      icon: <InstagramIcon />,
    },
    {
      name: "Facebook",
      url: resolveLink(
        footer.socialFacebook
      ),
      icon: <FacebookIcon />,
    },
    {
      name: "YouTube",
      url: resolveLink(
        footer.socialYoutube
      ),
      icon: <YoutubeIcon />,
    },
  ].filter((social) => social.url);

  return (
    <footer className="mt-auto overflow-hidden border-t border-border bg-[#efe8df]">

      {/* Top */}
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-3 md:px-8">

        {/* Brand */}
        <div>
          <Image
            src={
              footer.logo?.filename ||
              "https://www.elc.co.uk/medias/2026-elc-brands-logo-elc-png.png?context=bWFzdGVyfHJvb3R8NTgwNzV8aW1hZ2UvcG5nfGFEazRMMmcwTXk4eE1qYzBOamMxTURJNU5qQTVOQzh5TURJMkxXVnNZeTFpY21GdVpITXRiRzluYnkxbGJHTXRjRzVuTG5CdVp3fDA1NDhhMjNlNjRhYmQ1YmE1YWJkYjY0NWI0MDA5NTgwNmJhY2ZjM2Y1NDU4OTEzMDNhMDYwZWU5ZGI5OTAwNjU"
            }
            alt="ELC"
            width={180}
            height={80}
            className="h-auto"
          />

          {footer.brandText && (
            <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
              {footer.brandText}
            </p>
          )}

          {/* Socials */}
          {socials.length > 0 && (
            <div className="mt-8 flex gap-3">

              {socials.map(
                (social) => (
                  <Link
                    key={
                      social.name
                    }
                    href={
                      social.url
                    }
                    target="_blank"
                    className="
                      flex
                      size-12
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      shadow-sm
                      transition-all
                      hover:-translate-y-1
                      hover:shadow-lg
                    "
                  >
                    {
                      social.icon
                    }
                  </Link>
                )
              )}

            </div>
          )}
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-6 font-heading text-xl text-primary">
            Explore
          </h3>

          <div className="grid gap-3">

            {menuItems.map(
              (item) => (
                <Link
                  key={
                    item.id
                  }
                  href={`/${item.slug}`}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    text-muted-foreground
                    transition-colors
                    hover:text-primary
                  "
                >
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>

                  {item.name}
                </Link>
              )
            )}

          </div>
        </div>

        {/* CTA */}
        <div>

          <div
            className="
              rounded-[2rem]
              bg-primary
              p-8
              text-primary-foreground
            "
          >

            {footer.ctaTitle && (
              <h3 className="font-heading text-2xl">
                {footer.ctaTitle}
              </h3>
            )}

            {footer.ctaText && (
              <p className="mt-3 opacity-90">
                {footer.ctaText}
              </p>
            )}

            {footer.ctaButtonText && (
              <Link
                href={resolveLink(
                  footer.ctaButtonLink
                )}
                className="
                  mt-6
                  inline-flex
                  rounded-full
                  bg-white
                  px-6
                  py-3
                  font-semibold
                  text-primary
                  transition-transform
                  hover:-translate-y-1
                "
              >
                {footer.ctaButtonText}
                {" "}→
              </Link>
            )}

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-border">

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-4
            px-4
            py-6
            text-sm
            text-muted-foreground
            md:flex-row
            md:px-8
          "
        >

          <p>
            ©{" "}
            {new Date().getFullYear()}
            {" "}
            ELC. All rights
            reserved.
          </p>

          <div className="flex gap-6">

            <Link
              href={resolveLink(
                footer.privacyLink
              )}
            >
              Privacy
            </Link>

            <Link
              href={resolveLink(
                footer.termsLink
              )}
            >
              Terms
            </Link>

            <Link
              href={resolveLink(
                footer.cookiesLink
              )}
            >
              Cookies
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

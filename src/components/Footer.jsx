import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";

import { getStoryblokApi, resolveLink } from "@/lib/storyblok";

import InstagramIcon from "./icons/InstagramIcon";
import FacebookIcon from "./icons/FacebookIcon";
import YoutubeIcon from "./icons/YouTubeIcon";

export default async function Footer() {
  const storyblokApi = getStoryblokApi();

  const [{ data: footerData }, { data: headerData }] = await Promise.all([
    storyblokApi.get("cdn/stories/globals/footer", {
      version: "draft",
    }),
    storyblokApi.get("cdn/stories/globals/header", {
      version: "draft",
    }),
  ]);

  const footer =
    footerData?.story?.content?.body?.find(
      (blok) => blok.component === "footer"
    ) || {};

  const header =
    headerData?.story?.content?.body?.find(
      (blok) => blok.component === "HeaderSettings"
    ) || {};

  const menuItems = header.Navigation || [];

  const pathname =
    (await headers()).get("x-pathname") || "/";

  function getNavHref(item) {
    const pageLink = resolveLink(item.Link);

    if (item.HomepageAnchor) {
      if (pathname === "/") {
        return `#${item.HomepageAnchor}`;
      }

      if (pageLink && pageLink !== "/") {
        return `${pageLink}#${item.HomepageAnchor}`;
      }

      return `/#${item.HomepageAnchor}`;
    }

    return pageLink || "/";
  }

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
    <footer className="relative mt-auto overflow-hidden border-t border-line bg-background">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-40"
        aria-hidden
      />

      {/* Top */}
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-4 md:px-8">

        {/* Brand */}
        <div>
          <Image
            src={
              footer.logo?.filename
            }
            alt="MEccano"
            width={180}
            height={80}
            className="h-auto"
          />

          {footer.brandText && (
            <p className="mt-6 max-w-sm text-muted-foreground leading-relaxed">
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
                      group
flex
size-11
items-center
justify-center
rounded-md
border
border-white/10
bg-surface
card-gloss
transition-all
duration-300
hover:border-red-500/40
hover:ring-glow
                    "
                  >
                    {
                      social.icon
                    }
                    <span className="sr-only">{social.name}</span>
                  </Link>
                )
              )}

            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="md:col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-500">
            Navigation
          </p>

          <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
            {menuItems.map((item) => (
              <Link
                key={item._uid}
                href={getNavHref(item)}
                target={item.OpenInNewTab ? "_blank" : undefined}
                className="group flex items-center gap-2 py-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition hover:text-red-400"
              >
                <span className="transition-transform group-hover:translate-x-1">→</span>
                <span className="truncate">{item.Label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div>

          <div
            className="
              rounded-2xl
              border
              border-red-500/30
              bg-red-600/10
              card-gloss
              p-8
              backdrop-blur
              "
          >

            {footer.ctaTitle && (
              <div className="font-heading text-3xl font-bold">
                {footer.ctaTitle}
              </div>
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
                  inline-flex
                  items-center
                  gap-2
                  rounded-md
                  bg-gradient-to-b
                  from-red-700
                  to-red-800
                  px-6
                  py-3.5
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.15em]
                  text-white
                  border
                  border-red-400/40
                  shadow-[0_0_25px_rgba(220,38,38,.35)]
                  transition-all
                  hover:-translate-y-0.5
                  mt-5
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
      <div className="border-t border-line">

        <div
          className="
            mx-auto
            flex
            max-w-[1400px]
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
            © {new Date().getFullYear()} Meccano. Built for engineers.
          </p>

          <div className="flex gap-6">

            <Link
              href={resolveLink(
                footer.privacyLink
              )}
              className="
                font-mono
                text-[11px]
                uppercase
                tracking-[0.15em]
                text-muted-foreground
                transition
                hover:text-red-400
                "
            >
              Privacy
            </Link>

            <Link
              href={resolveLink(
                footer.termsLink
              )}
              className="
                font-mono
                text-[11px]
                uppercase
                tracking-[0.15em]
                text-muted-foreground
                transition
                hover:text-red-400
                "
            >
              Terms
            </Link>

            <Link
              href={resolveLink(
                footer.cookiesLink
              )}
              className="
                font-mono
                text-[11px]
                uppercase
                tracking-[0.15em]
                text-muted-foreground
                transition
                hover:text-red-400
                "
            >
              Cookies
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

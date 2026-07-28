import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import "./globals.css";
import {
  getStoryblokApi,
} from "@/lib/storyblok";

import Header from "@/components/Header";
import { getNavigation } from "@/lib/getNavigation";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Meccano Pro — Engineered for the Grown-Up',
  description:
    'Collector-grade metal construction sets for makers, tinkerers and kidults. Chrome steel, real fasteners, working mechanisms. Engineering you can hold.',
  generator: 'v0.app',
}

export const viewport = {
  colorScheme: 'dark',
  themeColor: '#0a1122',
}

export default async function RootLayout({ children }) {
  const menuItems = await getNavigation();

  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.get(
    "cdn/stories/globals/header",
    {
      version: "draft",
    }
  );


  const header =
    data?.story?.content?.body?.find(
      (blok) => blok.component === "HeaderSettings"
    ) || {};

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="min-h-screen flex flex-col">
        <Header
          blok={header}
          menuItems={menuItems}
        />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Download, FileText, ChevronRight, ArrowUpRight, ShoppingBag } from 'lucide-react';
import {
  storyblokEditable,
  renderRichText,
} from "@storyblok/react/rsc";

export default function InstructionPage({ blok, products = [] }) {
  const imageUrl = typeof blok.image === 'string'
    ? blok.image
    : blok.image?.filename;

  // Handle PDF url resolution
  const pdfUrl = typeof blok.instructionPdf === 'string'
    ? blok.instructionPdf
    : blok.instructionPdf?.filename;

  const relatedProducts = products
    .filter((product) => {
      if (product.content?.title === blok.title) return false;

      const sameBrand =
        blok.brand && product.content?.brand === blok.brand;

      const sameType =
        blok.type && product.content?.type === blok.type;

      return sameBrand || sameType;
    })
    .sort((a, b) => {
      const aBrand = a.content?.brand === blok.brand ? 1 : 0;
      const bBrand = b.content?.brand === blok.brand ? 1 : 0;

      if (aBrand !== bBrand) return bBrand - aBrand;

      return 0;
    })
    .slice(0, 4);

  return (
    <main {...storyblokEditable(blok)} className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumbs & Back Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground font-mono">
          <Link href="/discover" className="hover:text-red-500 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Discover
          </Link>
          <ChevronRight className="w-4 h-4 text-white/20" />
          {blok.type && (
            <>
              <span className="uppercase tracking-wider">{blok.type}</span>
              <ChevronRight className="w-4 h-4 text-white/20" />
            </>
          )}
          <span className="text-foreground truncate max-w-xs">{blok.title}</span>
        </nav>

        {/* Main Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Product Image Showcase */}
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-surface card-gloss glow-blue shadow-[0_0_50px_rgba(220,38,38,0.15)]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={blok.title || "Product instruction preview"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6 transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground font-mono">
                No Preview Image Available
              </div>
            )}

            {/* Floating Age Tag */}
            {blok.age && (
              <div className="absolute top-4 left-4 rounded-lg border border-red-500/40 bg-background/80 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] backdrop-blur text-red-400 shadow-lg">
                Age {blok.age}
              </div>
            )}

            {/* Floating SKU Tag */}
            {blok.sku && (
              <div className="absolute top-4 right-4 rounded-lg border border-white/10 bg-background/80 px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur">
                #{blok.sku}
              </div>
            )}
          </div>

          {/* Right: Product Details & Download Actions */}
          <div className="space-y-6 flex flex-col justify-center">
            
            {/* Badges Layout */}
            <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider">
              {blok.brand && (
                <span className="rounded-md bg-red-500/10 border border-red-500/30 px-3 py-1 text-red-500">
                  {blok.brand}
                </span>
              )}
              {blok.type && (
                <span className="rounded-md bg-white/5 border border-white/10 px-3 py-1 text-electric">
                  {blok.type}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-red-500">
              {blok.title}
            </h1>

            {blok.description && (
              <div
                className="text-muted-foreground text-base sm:text-lg leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: renderRichText(blok.description),
                }}
              />
            )}

            <hr className="border-white/10 my-4" />
            {blok.buyLink && (
              <>
              <a
                href={blok.buyLink}
                target="_blank"
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  hover:bg-red-500
                  text-red-50
                  font-bold
                  py-4
                  px-6
                  transition-all
                  duration-300
                  shadow-[0_0_25px_rgba(220,38,38,0.4)]
                  hover:shadow-[0_0_35px_rgba(220,38,38,0.6)]
                "
              >
                <ShoppingBag className="w-5 h-5" />
                Buy on The Entertainer
              </a>
              <hr className="border-white/10 my-4" />
              </>
            )}

            {/* PDF Action Box */}
            <div className="rounded-xl border border-white/10 bg-surface p-6 card-gloss space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Official Build Instructions</h3>
                  <p className="text-xs text-muted-foreground">PDF document format for mobile & desktop</p>
                </div>
              </div>

              {pdfUrl ? (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-red-600
                    hover:bg-red-500
                    text-red-50
                    font-bold
                    py-4
                    px-6
                    transition-all
                    duration-300
                    shadow-[0_0_25px_rgba(220,38,38,0.4)]
                    hover:shadow-[0_0_35px_rgba(220,38,38,0.6)]
                  "
                >
                  <Download className="w-5 h-5" />
                  Download Build Instructions
                </a>
              ) : (
                <div className="w-full text-center py-3 rounded-xl bg-white/5 text-muted-foreground font-mono text-sm border border-white/5">
                  Instructions coming soon
                </div>
              )}
            </div>

          </div>
        </div>
        {relatedProducts.length > 0 && (
          <section className="pt-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                You may also like
              </h2>

              <Link
                href="/discover"
                className="
                group
                inline-flex
                items-center
                gap-2
                font-mono
                text-xs
                uppercase
                tracking-[0.15em]
                text-muted-foreground
                transition-colors
                hover:text-red-500
              "
            >

              View all

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  transition-transform
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {relatedProducts.map((product) => {
                const relatedImage =
                  typeof product.content?.image === "string"
                    ? product.content.image
                    : product.content?.image?.filename;

                return (
                  <Link
                    key={product.uuid}
                    href={`/discover/${product.slug}`}
                    className="group overflow-hidden rounded-xl border border-white/10 bg-surface card-gloss transition-all duration-300 hover:border-red-500/40 hover:ring-glow"
                  >
                    <div className="relative aspect-square overflow-hidden bg-background/60">
                      {relatedImage ? (
                        <Image
                          src={relatedImage}
                          alt={product.content?.title || "Product image"}
                          fill
                          sizes="(max-width:768px) 50vw, 25vw"
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="line-clamp-2 font-semibold text-red-500">
                        {product.content?.title}
                      </div>

                      {product.content?.type && (
                        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                          {product.content.type}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
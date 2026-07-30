'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft, ArrowRight, Download, SlidersHorizontal, X } from 'lucide-react';

export default function DiscoverFilters({ products }) {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const productsRef = useRef(null);

  const productsPerPage = 40;

  const displayBrand = (brandName) => {
    const normalized = brandName?.trim().toLowerCase();

    return normalized === "meccano" ? "heritage" : brandName;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, brand, type, age]);

  const changePage = (page) => {
    setCurrentPage(page);

    setTimeout(() => {
      productsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  };

  const brands = useMemo(() => {
    return [
      ...new Set(
        products
          .map((p) => displayBrand(p.content.brand))
          .filter(Boolean)
      ),
    ].sort();
  }, [products]);

  const types = useMemo(() => {
    return [...new Set(products.map((p) => p.content.type).filter(Boolean))].sort();
  }, [products]);

  const ages = useMemo(() => {
    return [...new Set(products.map((p) => p.content.age).filter(Boolean))].sort();
  }, [products]);

  const filtered = useMemo(() => {
    const hasDescription = (product) => {
      const desc = product.content?.description;

      if (!desc || !desc.content) return false;

      return desc.content.some((node) =>
        node.content?.some((child) => child.text?.trim())
      );
    };

    return products
      .filter((product) => {
        const c = product.content;

        const matchesSearch =
          !search ||
          c.title?.toLowerCase().includes(search.toLowerCase());

        const matchesBrand =
          !brand || displayBrand(c.brand) === brand;

        const matchesType =
          !type || c.type === type;

        const matchesAge =
          !age || c.age === age;

        return (
          matchesSearch &&
          matchesBrand &&
          matchesType &&
          matchesAge
        );
      })
      .sort((a, b) => Number(hasDescription(b)) - Number(hasDescription(a)));
  }, [products, search, brand, type, age]);

  const totalPages = Math.ceil(filtered.length / productsPerPage);

  const paginatedProducts = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
      <div className="md:hidden sticky top-20 z-30">
        <div className="
          rounded-3xl
          border
          border-white/10
          bg-surface/90
          p-4
          backdrop-blur-xl
          shadow-[0_10px_40px_rgba(0,0,0,.35)]
        ">
          <div className="flex gap-3">

            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search instructions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  rounded-full
                  border
                  border-white/10
                  bg-background/60
                  py-3
                  px-5
                  text-sm
                  text-white
                  placeholder:text-muted-foreground
                  outline-none
                "
              />
            </div>


            <button
              onClick={() => setFiltersOpen(true)}
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-red-500/30
                bg-red-500/10
                px-5
                text-sm
                font-medium
                text-red-400
              "
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters

              {(brand || type || age) && (
                <span className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-[10px]
                  text-white
                ">
                  !
                </span>
              )}

            </button>

          </div>
        </div>
      </div>


      <div className='hidden md:block rounded-3xl border border-white/10 bg-surface/80 p-5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] sticky top-20 z-30'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>

          {/* Search */}
          <div className='relative w-full lg:max-w-sm'>
            <svg
              className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <circle cx='11' cy='11' r='8' />
              <path d='m21 21-4.3-4.3' />
            </svg>

            <input
              type='text'
              placeholder='Search instructions...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full rounded-full border border-white/10 bg-background/60 py-3 pl-11 pr-5 text-sm text-white placeholder:text-muted-foreground outline-none transition-all duration-300 focus:border-red-500/40 focus:ring-2 focus:ring-red-500/20'
            />
          </div>

          {/* Filters */}
          <div className='flex flex-wrap gap-3'>

            <div className='relative'>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className='appearance-none rounded-full border border-white/10 bg-background/60 px-5 py-3 pr-10 text-sm text-white outline-none transition-all duration-300 focus:border-red-500/40 focus:ring-2 focus:ring-red-500/20'
              >
                <option value=''>All brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>

              <svg
                className='pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path d='m6 9 6 6 6-6' />
              </svg>
            </div>

            <div className='relative'>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className='appearance-none rounded-full border border-white/10 bg-background/60 px-5 py-3 pr-10 text-sm text-white outline-none transition-all duration-300 focus:border-red-500/40 focus:ring-2 focus:ring-red-500/20'
              >
                <option value=''>All types</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <svg
                className='pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path d='m6 9 6 6 6-6' />
              </svg>
            </div>

            <div className='relative'>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className='appearance-none rounded-full border border-white/10 bg-background/60 px-5 py-3 pr-10 text-sm text-white outline-none transition-all duration-300 focus:border-red-500/40 focus:ring-2 focus:ring-red-500/20'
              >
                <option value=''>All ages</option>
                {ages.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>

              <svg
                className='pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path d='m6 9 6 6 6-6' />
              </svg>
            </div>

            {(search || brand || type || age) && (
              <button
                onClick={() => {
                  setSearch('');
                  setBrand('');
                  setType('');
                  setAge('');
                }}
                className='rounded-full border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500/20'
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className='mt-4 flex items-center justify-between border-t border-white/10 pt-4'>
          <div className='text-sm text-muted-foreground'>
            Showing
            <span className='mx-1 font-semibold text-white'>{filtered.length}</span>
            products
          </div>

          {(search || brand || type || age) && (
            <div className='rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400'>
              Filters applied
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
  <div className="md:hidden fixed inset-0 z-50">

    {/* Overlay */}
    <div
      onClick={() => setFiltersOpen(false)}
      className="
        absolute
        inset-0
        bg-black/60
        backdrop-blur-sm
      "
    />

    {/* Bottom sheet */}
    <div
      className="
        absolute
        bottom-0
        left-0
        right-0
        flex
        max-h-[85vh]
        flex-col
        rounded-t-3xl
        border-t
        border-white/10
        bg-surface
        shadow-[0_-20px_60px_rgba(0,0,0,.5)]
        animate-slide-up
      "
    >

      {/* Handle */}
      <div className="flex justify-center pt-3">
        <div className="
          h-1.5
          w-12
          rounded-full
          bg-white/20
        " />
      </div>


      {/* Header */}
      <div className="
        flex
        items-center
        justify-between
        px-6
        py-5
      ">

        <h3 className="text-xl font-heading text-white">
          Filters
        </h3>

        <button
          onClick={() => setFiltersOpen(false)}
          className="
            rounded-full
            border
            border-white/10
            p-2
          "
        >
          <X className="h-5 w-5 text-white" />
        </button>

      </div>


      {/* Scroll area */}
      <div className="
        flex-1
        overflow-y-auto
        px-6
        pb-6
      ">

        <div className="space-y-4">

          <select
            value={brand}
            onChange={(e)=>setBrand(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-background/60
              px-5
              py-4
              text-white
            "
          >
            <option value="">
              All brands
            </option>

            {brands.map((b)=>(
              <option key={b} value={b}>
                {b}
              </option>
            ))}

          </select>


          <select
            value={type}
            onChange={(e)=>setType(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-background/60
              px-5
              py-4
              text-white
            "
          >

            <option value="">
              All types
            </option>

            {types.map((t)=>(
              <option key={t} value={t}>
                {t}
              </option>
            ))}

          </select>


          <select
            value={age}
            onChange={(e)=>setAge(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-background/60
              px-5
              py-4
              text-white
            "
          >

            <option value="">
              All ages
            </option>

            {ages.map((a)=>(
              <option key={a} value={a}>
                {a}
              </option>
            ))}

          </select>


          {(brand || type || age) && (
            <button
              onClick={()=>{
                setBrand('');
                setType('');
                setAge('');
              }}
              className="
                w-full
                rounded-full
                border
                border-red-500/30
                bg-red-500/10
                py-4
                text-red-400
              "
            >
              Clear filters
            </button>
          )}

        </div>

      </div>


      {/* Sticky bottom action */}
      <div className="
        border-t
        border-white/10
        bg-surface
        p-6
      ">

        <button
          onClick={()=>setFiltersOpen(false)}
          className="
            w-full
            rounded-full
            bg-red-600
            py-4
            font-medium
            text-white
            shadow-[0_0_30px_rgba(220,38,38,.35)]
          "
        >
          Show {filtered.length} products
        </button>

      </div>

    </div>

  </div>
)}
      <div
        ref={productsRef}
        className='mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4'
      >
        {paginatedProducts.map((product) => {
          const imageUrl =
            typeof product.content.image === 'string'
              ? product.content.image
              : product.content.image?.filename;

          const hasDescription = (product) => {
          const desc = product.content?.description;

          if (!desc || !Array.isArray(desc.content)) return false;

          return desc.content.some((node) =>
            Array.isArray(node.content) &&
            node.content.some(
              (child) =>
                child.type === 'text' &&
                child.text &&
                child.text.trim().length > 0
            )
          );
        };

        const productHasDescription = hasDescription(product);

          const pdfUrl =
            typeof product.content.instructionPdf === 'string'
              ? product.content.instructionPdf
              : product.content.instructionPdf?.filename;

          const TileContent = (
            <>
              <div className='relative aspect-square overflow-hidden bg-background/60 glow-blue transition-shadow group-hover:shadow-[0_0_35px_rgba(220,38,38,.35)]'>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={product.content.title || 'Product image'}
                    fill
                    sizes='(max-width:768px) 50vw, 25vw'
                    className='object-contain transition-transform duration-500 group-hover:scale-105'
                  />
                ) : (
                  <div className='flex h-full items-center justify-center text-sm text-muted-foreground'>
                    No image
                  </div>
                )}

                {product.content.age && (
                  <span className='absolute bottom-3 left-3 rounded-md border border-red-500/40 bg-background/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] backdrop-blur'>
                    {product.content.age}
                  </span>
                )}
              </div>

              <div className='flex flex-1 items-end justify-between p-5'>
                <div>
                  <div className='line-clamp-2 font-bold text-red-500 md:text-lg'>
                    {product.content.title}
                  </div>

                  {product.content.type && (
                    <p className='mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground'>
                      <span className='text-electric'>
                        {product.content.type}
                      </span>
                    </p>
                  )}
                </div>

                <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-red-400/40 bg-red-600/50 text-red-50 shadow-[0_0_25px_rgba(220,38,38,.35)] md:h-10 md:w-10'>
                  {productHasDescription ? (
                    <ArrowUpRight className='h-4 w-4' />
                  ) : (
                    <Download className='h-4 w-4' />
                  )}
                </span>
              </div>
            </>
          );

          return productHasDescription ? (
            <Link
              key={product.uuid}
              href={`/discover/${product.slug}`}
              className='group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-surface card-gloss transition-all duration-300 hover:border-red-500/40 hover:ring-glow'
            >
              {TileContent}
            </Link>
          ) : (
            <a
              key={product.uuid}
              href={pdfUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-surface card-gloss transition-all duration-300 hover:border-red-500/40 hover:ring-glow'
            >
              {TileContent}
            </a>
          );
        })}
      </div>
      {totalPages > 1 && (
  <div className="mt-10 flex flex-wrap justify-center items-end gap-2">

    <button
      disabled={currentPage === 1}
      onClick={() => changePage(currentPage - 1)}
      className="rounded-full border border-white/10 bg-surface px-4 py-2 text-sm text-white transition hover:border-red-500/40 disabled:opacity-40 cursor-pointer"
    >
      <ArrowLeft className="h-4 w-4" />
    </button>

    {(() => {
  const pages = [];

  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else if (currentPage <= 2) {
    pages.push(1, 2, 3, '...', totalPages);
  } else if (currentPage >= totalPages - 1) {
    pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(
      1,
      '...',
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    );
  }

  return pages.map((page, index) =>
    page === '...' ? (
      <span
        key={`ellipsis-${index}`}
        className="px-1 text-sm text-muted-foreground"
      >
        ...
      </span>
    ) : (
      <button
        key={page}
        onClick={() => changePage(page)}
        className={`rounded-full px-4 py-2 text-sm transition cursor-pointer ${
          currentPage === page
            ? 'bg-red-600 text-white'
            : 'border border-white/10 bg-surface text-white hover:border-red-500/40'
        }`}
      >
        {page}
      </button>
    )
  );
})()}

    <button
      disabled={currentPage === totalPages}
      onClick={() => changePage(currentPage + 1)}
      className="rounded-full border border-white/10 bg-surface px-4 py-2 text-sm text-white transition hover:border-red-500/40 disabled:opacity-40 cursor-pointer"
    >
      <ArrowRight className="h-4 w-4" />
    </button>

  </div>
)}
</>
  );
}
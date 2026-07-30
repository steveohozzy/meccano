import { getStoryblokApi } from '@/lib/storyblok';
import DiscoverFilters from './DiscoverFilters';
import { renderRichText, storyblokEditable } from '@storyblok/react/rsc';

async function getAllProducts() {
  const storyblokApi = getStoryblokApi();

  let page = 1;
  const perPage = 100;
  let allStories = [];

  while (true) {
    const { data } = await storyblokApi.get('cdn/stories', {
      starts_with: 'discover/',
      content_type: 'instructionPage',
      version: 'draft',
      per_page: perPage,
      page,
    });

    allStories = [...allStories, ...data.stories];

    if (data.stories.length < perPage) break;

    page++;
  }

  return allStories;
}

export default async function DiscoverPage({ blok }) {
  const products = await getAllProducts();

  const hasDescription = (story) => {
    const desc = story.content?.description;

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

  const sortedProducts = [...products].sort(
    (a, b) => Number(hasDescription(b)) - Number(hasDescription(a))
  );

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        className='bg-background'
      >
        <div className='mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-8'>
          <h1 className='text-center text-5xl font-heading'>
            {blok.title}
          </h1>

          <div
            className='mx-auto max-w-4xl text-center'
            dangerouslySetInnerHTML={{
              __html: renderRichText(blok.intro),
            }}
          />
        </div>
      </section>

      <section>
        <div className='mx-auto max-w-7xl px-4 pb-16 md:px-8'>
          <DiscoverFilters products={sortedProducts} />
        </div>
      </section>
    </>
  );
}
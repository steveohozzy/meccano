import Image from "next/image";

export default function DiscoverCard({ item }) {

  return (
    <article className="rounded-3xl bg-white p-5 shadow-sm">

      <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
        {item.thumbnail?.filename && (
          <Image
            src={item.thumbnail.filename}
            alt={item.title}
            width={500}
            height={500}
          />
        )}
      </div>


      <h3 className="mt-4 text-xl font-bold">
        {item.title}
      </h3>


      <p className="text-sm text-gray-500">
        Ref: {item.sku}
      </p>


      <a
        href={item.instructionPdf?.filename}
        target="_blank"
        className="
          mt-4
          inline-flex
          rounded-full
          bg-black
          px-5
          py-2
          text-white
        "
      >
        Download instructions
      </a>

    </article>
  );
}
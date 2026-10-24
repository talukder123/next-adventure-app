import Image from "next/image";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime, 3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "1-10" },
];

export default function Banner() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-1 flex-col overflow-hidden"
    >
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-slate-950/20" />

      <div className="flex flex-1 items-center justify-center px-6 pb-16 pt-12 sm:pb-20">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h1 className="font-serif text-4xl leading-[1.1] tracking-tight drop-shadow-md sm:text-6xl lg:text-[64px]">
            Discover Your
            <br className="hidden sm:block" /> Next Adventure
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-sm leading-relaxed text-white/95 drop-shadow-sm sm:text-base">
            Explore breathtaking destinations and create unforgettable memories
            with
            <br className="hidden sm:block" /> our curated travel experiences.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#destinations"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-sm bg-brand px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Now
              <ArrowRight className="size-4" strokeWidth={1.8} />
            </a>
            <a
              href="#destinations"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-white px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-900 transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View Destination
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4">
        <div className="grid overflow-hidden rounded-sm bg-white shadow-[0_18px_50px_rgba(4,36,44,0.35)] shadow-slate-950/30 md:grid-cols-[repeat(4,minmax(0,1fr))_160px]">
          {searchFields.map((field) => (
            <div
              key={field.label}
              className="border-b border-slate-200 px-7 py-5 last:border-b-0 md:border-b-0 md:border-r"
            >
              <p className="text-[13px] font-semibold text-slate-800">
                {field.label}
              </p>
              <p className="mt-1 text-[13px] text-slate-500">{field.value}</p>
            </div>
          ))}

          <button
            type="button"
            className="flex h-14 items-center justify-center bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-dark md:h-auto"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

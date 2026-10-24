import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Cta() {
  return (
    <section id="book" className="relative isolate overflow-hidden">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-slate-950/45" />

      <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center text-white">
        <h2 className="font-serif text-4xl leading-[1.1] tracking-tight drop-shadow-md sm:text-5xl lg:text-[52px]">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 max-w-[560px] text-sm leading-relaxed text-white/90 drop-shadow-sm sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>

        <a
          href="#book-trip"
          className="mt-8 inline-flex h-12 items-center justify-center gap-8 rounded-sm bg-white px-8 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-900 transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}

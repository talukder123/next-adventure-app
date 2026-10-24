"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    photo: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person1.png",
  },
];

function CarouselArrows() {
  const { scrollPrev, scrollNext } = useCarousel();

  return (
    <div className="flex shrink-0 gap-3">
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="Previous testimonial"
        onClick={scrollPrev}
        className="size-11 rounded-full border-slate-200 text-slate-500 hover:border-brand hover:text-brand hover:bg-white"
      >
        <ArrowLeftIcon className="size-4" strokeWidth={1.5} />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="Next testimonial"
        onClick={scrollNext}
        className="size-11 rounded-full border-slate-200 text-slate-500 hover:border-brand hover:text-brand hover:bg-white"
      >
        <ArrowRightIcon className="size-4" strokeWidth={1.5} />
      </Button>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white px-5 py-16 sm:py-20">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mx-auto w-full max-w-[1160px]"
      >
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-4xl tracking-tight text-slate-900 sm:text-5xl">
              What Travelers Say
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Real experiences from our happy travelers
            </p>
          </div>

          <CarouselArrows />
        </div>

        <CarouselContent className="mt-8">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.name}
              className="basis-full lg:basis-1/2"
            >
              <figure className="flex h-full gap-5 rounded-sm border border-slate-200 bg-white p-5">
                <div className="flex flex-1 flex-col justify-between gap-6">
                  <blockquote className="font-serif text-[15px] leading-[1.45] text-slate-900">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption>
                    <p className="text-sm font-medium text-brand">
                      — {testimonial.name}
                    </p>
                    <p className="pl-6 text-xs text-slate-500">
                      {testimonial.location}
                    </p>
                  </figcaption>
                </div>

                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  width={175}
                  height={205}
                  className="h-auto w-[140px] shrink-0 self-center object-cover sm:w-[175px]"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

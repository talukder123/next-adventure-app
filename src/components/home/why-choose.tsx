import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChoose() {
  return (
    <section id="why-choose" className="bg-[#e8f7f8] px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-[1160px]">
        <div className="text-center">
          <h2 className="font-serif text-4xl tracking-tight text-[#123a47] sm:text-5xl">
            Why Choose Wanderlast
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-sm border border-slate-200/80 bg-white p-7"
            >
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="size-8"
              />
              <h3 className="mt-6 font-serif text-[26px] leading-none text-[#163c49]">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

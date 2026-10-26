import Banner from "@/components/home/banner";
import Cta from "@/components/home/cta";

import Testimonials from "@/components/home/testimonials";
import WhyChoose from "@/components/home/why-choose";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-1 flex-col bg-white">
      <Banner />
      <WhyChoose />
      <Testimonials />
      <Cta />
    </main>
  );
}

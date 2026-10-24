import Banner from "@/components/banner";
import Navbar from "@/components/navbar";
import Testimonials from "@/components/testimonials";
import WhyChoose from "@/components/why-choose";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-1 flex-col bg-white">
      <Navbar />
      <Banner />
      <WhyChoose />
      <Testimonials />
    </main>
  );
}

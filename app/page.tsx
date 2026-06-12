import Hero from "@/components/sections/Hero";
import ServicesMarquee from "@/components/sections/ServicesMarquee";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ShopEssentials from "@/components/sections/ShopEssentials";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesMarquee />
      <WhyChooseUs />
      <ShopEssentials />
    </main>
  );
}
import Hero from "@/components/sections/Hero";
import ServicesMarquee from "@/components/sections/ServicesMarquee";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ShopEssentials from "@/components/sections/ShopEssentials";
import Plans from "@/components/sections/Plans";
import Testimonials from "@/components/sections/Testimonials";
import ContactUs from "@/components/sections/ContactUs";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesMarquee />
      <WhyChooseUs />
      <ShopEssentials />
      <Plans />
      <Testimonials />
      <ContactUs />
      <Footer />
    </main>
  );
}

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
   <section className="relative min-h-screen overflow-hidden bg-[#0F172A]">
  <Navbar />

  {/* Hero Background Image */}
<div className="absolute inset-0 overflow-hidden top-[72px]">
  <Image
    src="/Image/gym-boy.png"
    alt="Gym Trainer"
    fill
    priority
    className="object-cover object-right scale-100"
  />
</div>

  {/* Overlay */}
  <div className="absolute bottom-0 right-0 top-[100px] hidden w-[48%] lg:block" />

  {/* Content */}
  <Container className="relative z-10 flex min-h-screen items-center pt-[72px]">
    <div>
      <h1 className="max-w-[720px] text-5xl font-light leading-tight text-white lg:text-6xl">
        PUSH{" "}
        <span className="font-extrabold text-[#F97316]">
          HARDER
        </span>{" "}
        TODAY TO BE{" "}
        <span className="font-extrabold text-[#F97316]">
          STRONGER
        </span>
        <br />
        TOMORROW
      </h1>

      <div className="mt-4 flex gap-4">
        <Button>Join Now</Button>
        <Button variant="outline">Contact Us</Button>
      </div>
    </div>
  </Container>
</section>
  );
}
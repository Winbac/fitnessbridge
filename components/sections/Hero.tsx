import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0F172A]">
      <Navbar />

      {/* Mobile Hero Image */}
      <div className="absolute inset-0 top-[72px] overflow-hidden lg:hidden">
        <Image
          src="/Image/mobile.jpg"
          alt="Gym Trainer"
          fill
          priority
          className="object-cover object-center"
        />
          <div className="absolute inset-0 bg-black/50" />

      </div>
      

      {/* Desktop Hero Image */}
      <div className="absolute inset-0 top-[72px] hidden overflow-hidden lg:block">
        <Image
          src="/Image/gym-boy.png"
          alt="Gym Trainer"
          fill
          priority
          className="object-cover object-right"
        />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex min-h-screen items-center justify-center pt-[72px] lg:justify-start">
        <div className="max-w-[720px] text-center lg:text-left">
          <h1 className="max-w-[720px] text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl">
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

          <div className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button>
              Join Now
            </Button>

            <Button variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
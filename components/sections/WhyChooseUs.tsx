import Image from "next/image";
import { Dumbbell, HeartPulse, Salad, PersonStanding } from "lucide-react";
import Container from "@/components/layout/Container";

const features = [
  {
    icon: Dumbbell,
    text: "Precision Training: We focus on the why and how behind every movement, ensuring your form is perfect so you can avoid injury and see results faster.",
  },
  {
    icon: HeartPulse,
    text: "We help you track your metrics — distance, time, and intensity — so you can clearly see the progress you're making week over week.",
  },
  {
    icon: Salad,
    text: "We help you understand calories and macronutrients so you can make better food choices without giving up the foods you love.",
  },
  {
    icon: PersonStanding,
    text: "We guide you toward specific yoga poses that target the exact areas you feel tightest after lifting or cardio sessions.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="overflow-hidden bg-[#0F172A] py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          
          {/* LEFT COLUMN */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative h-[420px] w-[420px]">
              
              {/* Orange circle/ring background */}
              <div className="absolute -left-44 -top-42 h-[430px] w-[430px] rounded-full border-[38px] border-[#F97316]" />

              {/* Image placeholder */}
              <div className="absolute left-0 top-12 h-[330px] w-[330px]">
                {/* Add your image here later */}
                <Image
                  src="/Image/Group 1.png"
                  alt="Gym trainer"
                  fill
                  className="object-cover"
                />
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <h2 className="mb-8 text-2xl font-bold text-white lg:text-3xl">
              <span className="mr-3 text-[#F97316]">|</span>
              WHY CHOOSE US
            </h2>

            <div className="flex flex-col gap-5">
              {features.map((item, index) => {
                const Icon = item.icon;

                return (
              <div key={index} className="flex items-start gap-4 lg:gap-5">
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/70 text-[#111827]">
    <Icon size={20} />
  </div>

  <p className="flex-1 pr-4 text-[13px] leading-relaxed text-[#D1D5DB] sm:pr-0 lg:max-w-[580px]">
    {item.text}
  </p>
</div>
                );
              })}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
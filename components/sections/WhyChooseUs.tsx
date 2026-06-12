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
    <section className="bg-[#0F172A]">
      <Container>
        <div className="grid items-center gap-1 lg:grid-cols-2">
        <div className="relative flex justify-center lg:justify-start">
  <div className="relative lg:-ml-0">
    <Image
      src="/Image/group 1.png"
      alt="Personal trainer guiding gym member"
      width={560}
      height={560}
      className="h-[320px] w-[320px] object-contain lg:h-[380px] lg:w-[380px]"
    />
  </div>
</div>

          <div>
            <h2 className="mb-8 text-2xl font-bold text-white lg:text-3xl">
              <span className="mr-3 text-[#F97316]">|</span>
              WHY CHOOSE US
            </h2>

            <div className="flex flex-col gap-5">
              {features.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={index} className="flex items-start gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/70 text-[#111827]">
                      <Icon size={20} />
                    </div>

                    <p className="max-w-[580px] text-[13px] leading-relaxed text-[#D1D5DB]">
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
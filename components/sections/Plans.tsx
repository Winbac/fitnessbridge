import { CheckCircle } from "lucide-react";
import Container from "@/components/layout/Container";

const plans = [
  {
    name: "Yoga & Wellness",
    price: "₹699",
    highlight: false,
    features: [
      "Access to Studio",
      "Wellness Solution",
      "Limited Yoga Sessions",
      "Flexibility & Recovery Training",
      "Increased Functional Energy",
      "Effective Stress Reduction",
    ],
  },
  {
    name: "Strength Training",
    price: "₹1100",
    highlight: true,
    features: [
      "Access to Studio",
      "Strength Training Plan",
      "Trainer Guidance",
      "Muscle Building Workouts",
      "Weekly Progress Tracking",
      "Basic Diet Support",
    ],
  },
  {
    name: "Premium Fitness",
    price: "₹1500",
    highlight: false,
    features: [
      "Yoga + Strength Training",
      "Cardio Sessions",
      "Full Diet Plan",
      "Trainer Support",
      "Progress Report",
      "Priority Guidance",
    ],
  },
];

export default function Plans() {
  return (
    <section id="plans" className="bg-[#0F172A] py-4">
      <Container>
        <h2 className="mb-10 text-3xl font-bold text-white">
          <span className="mr-2 text-[#F97316]">|</span>
          Our Plans
        </h2>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-[24px] border p-8 shadow-lg transition duration-300 hover:-translate-y-2 ${
                plan.highlight
                  ? "border-[#F97316] bg-[#F97316]/60 shadow-[#F97316]/20"
                  : "border-[#374151] bg-[#111827] shadow-black/30"
              }`}
            >
              <p className="mb-4 text-lg font-semibold text-white">
                Professional
              </p>

              <h3 className="text-2xl font-bold text-[#D1D5DB]">
                {plan.name}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
                Mind, body and recovery focused, with guided training support.
              </p>

              <div className="mt-6 border-b border-[#374151] pb-5">
                <span className="text-4xl font-bold text-[#F97316]">
                  {plan.price}
                </span>
                <span className="ml-1 text-lg font-bold text-white">/ Mo</span>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-[#F97316]" />
                    <span className="text-sm text-[#D1D5DB]">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="mt-8 w-full rounded-full bg-[#F97316] py-4 text-sm font-bold text-white transition hover:bg-[#EA580C]">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
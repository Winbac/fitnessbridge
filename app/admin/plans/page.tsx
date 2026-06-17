import { Plus, Pencil, Trash2, Check, TrendingUp } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 29,
    members: 94,
    growth: 12,
    color: "#3B82F6",
    features: [
      "Access to gym floor",
      "2 Group classes/week",
      "Locker access",
      "Basic app features",
    ],
  },
  {
    name: "Pro",
    price: 59,
    members: 148,
    growth: 24,
    popular: true,
    color: "#F97316",
    features: [
      "Unlimited gym access",
      "Unlimited group classes",
      "1 PT session/month",
      "Full app features",
      "Nutrition tracker",
    ],
  },
  {
    name: "Elite",
    price: 99,
    members: 47,
    growth: 8,
    color: "#FACC15",
    features: [
      "Everything in Pro",
      "4 PT sessions/month",
      "Body composition scans",
      "Priority booking",
      "Guest passes x2",
    ],
  },
];

export default function PlansPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Membership Plans</h1>
          <p className="mt-2 text-[#9CA3AF]">
            Manage your subscription tiers and pricing.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C]">
          <Plus size={18} />
          New Plan
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border bg-[#111827] p-6 ${
              plan.popular
                ? "border-[#F97316] shadow-[0_0_40px_rgba(249,115,22,0.18)]"
                : "border-[#1F2937]"
            }`}
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">{plan.name}</h2>

                {plan.popular && (
                  <span className="rounded-full bg-[#F97316] px-3 py-1 text-xs font-bold text-white">
                    POPULAR
                  </span>
                )}
              </div>

              <div className="flex gap-4 text-[#9CA3AF]">
                <Pencil size={18} />
                <Trash2 size={18} />
              </div>
            </div>

            <div className="mb-7">
              <span className="text-4xl font-extrabold text-white">
                ${plan.price}
              </span>
              <span className="text-[#9CA3AF]"> /mo</span>
            </div>

            <div className="space-y-4">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check size={16} style={{ color: plan.color }} />
                  <span className="text-[#9CA3AF]">{feature}</span>
                </div>
              ))}
            </div>

            <div className="my-7 h-px bg-[#1F2937]" />

            <p className="text-sm text-[#9CA3AF]">Active members</p>

            <div className="mt-2 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">{plan.members}</h3>

              <div className="flex items-center gap-1 text-[#00E396]">
                <TrendingUp size={16} />
                <span className="font-semibold">+{plan.growth}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#111827]">
        <div className="border-b border-[#1F2937] p-6">
          <h2 className="text-xl font-bold text-white">Plan Performance</h2>
        </div>

        <div>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="grid grid-cols-[160px_1fr_120px_120px] items-center gap-6 border-b border-[#1F2937] p-6 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: plan.color }}
                />
                <span className="font-bold text-white">{plan.name}</span>
              </div>

              <div className="h-2 rounded-full bg-[#1F2937]">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${plan.members}%`,
                    maxWidth: "100%",
                    backgroundColor: plan.color,
                  }}
                />
              </div>

              <p className="text-[#9CA3AF]">{plan.members} users</p>

              <p className="text-right font-bold text-white">
                ${(plan.members * plan.price).toLocaleString()}/mo
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
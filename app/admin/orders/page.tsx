import {
  Calendar,
  Download,
  MoreHorizontal,
  Search,
  TrendingUp,
} from "lucide-react";

const orders = [
  { id: "ORD-4821", customer: "Alex Rivera", product: "Whey Protein 2kg", category: "Nutrition", date: "Jul 14, 2024", amount: "$89.99", status: "Delivered" },
  { id: "ORD-4820", customer: "Jordan Lee", product: "Resistance Band Set", category: "Equipment", date: "Jul 13, 2024", amount: "$49.99", status: "Processing" },
  { id: "ORD-4819", customer: "Taylor Kim", product: "Training Gloves", category: "Accessories", date: "Jul 13, 2024", amount: "$29.99", status: "Shipped" },
  { id: "ORD-4818", customer: "Morgan Chen", product: "BCAA Powder 500g", category: "Nutrition", date: "Jul 12, 2024", amount: "$54.99", status: "Delivered" },
  { id: "ORD-4817", customer: "Casey Brooks", product: "Foam Roller Pro", category: "Recovery", date: "Jul 11, 2024", amount: "$44.99", status: "Cancelled" },
  { id: "ORD-4816", customer: "Quinn Adams", product: "Premium Gym Bottle", category: "Accessories", date: "Jul 10, 2024", amount: "$34.99", status: "Delivered" },
  { id: "ORD-4815", customer: "Drew Santos", product: "Resistance Band Set", category: "Equipment", date: "Jul 10, 2024", amount: "$49.99", status: "Shipped" },
  { id: "ORD-4814", customer: "Alex Rivera", product: "BCAA Powder 500g", category: "Nutrition", date: "Jul 9, 2024", amount: "$54.99", status: "Delivered" },
];

function initials(name: string) {
  return name.split(" ").map((word) => word[0]).join("");
}

function statusClass(status: string) {
  if (status === "Delivered") return "bg-emerald-500/15 text-emerald-400";
  if (status === "Processing") return "bg-blue-500/15 text-blue-400";
  if (status === "Shipped") return "bg-orange-500/15 text-orange-400";
  return "bg-rose-500/15 text-rose-400";
}

export default function OrdersPage() {
  return (
    <div className="space-y-9">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Orders</h1>
          <p className="mt-2 text-[#9CA3AF]">
            Track and manage all product orders.
          </p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-xl bg-[#171923] px-5 py-3 font-semibold text-white hover:bg-[#1F2937]">
          <Download size={18} />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Stat title="TOTAL ORDERS" value="8" desc="All time" />
        <Stat title="REVENUE" value="$409.92" desc="+18% vs last month" positive />
        <Stat title="IN TRANSIT" value="3" desc="Processing + Shipped" />
        <Stat title="CANCELLED" value="1" desc="Needs review" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827]">
        <div className="flex flex-col gap-4 border-b border-[#1F2937] p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3 rounded-xl bg-[#171923] p-1">
            {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`rounded-lg px-4 py-2 font-semibold ${
                    tab === "All"
                      ? "bg-[#F97316] text-white"
                      : "text-[#9CA3AF] hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#171923] px-4 py-3 text-[#9CA3AF]">
            <Search size={20} />
            <input
              placeholder="Search orders..."
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="hidden grid-cols-[0.7fr_1.2fr_1.4fr_1fr_0.8fr_0.9fr_40px] border-b border-[#1F2937] px-6 py-4 text-sm tracking-[0.15em] text-[#9CA3AF] lg:grid">
          <span>ORDER</span>
          <span>CUSTOMER</span>
          <span>PRODUCT</span>
          <span>DATE</span>
          <span>AMOUNT</span>
          <span>STATUS</span>
          <span></span>
        </div>

        {orders.map((order) => (
          <div
            key={order.id}
            className="grid gap-4 border-b border-[#1F2937] p-5 last:border-b-0 lg:grid-cols-[0.7fr_1.2fr_1.4fr_1fr_0.8fr_0.9fr_40px] lg:items-center lg:px-6"
          >
            <p className="text-sm text-[#9CA3AF]">{order.id}</p>

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#431407] text-sm font-bold text-[#F97316]">
                {initials(order.customer)}
              </div>
              <h3 className="font-bold text-white">{order.customer}</h3>
            </div>

            <div>
              <h3 className="font-bold text-white">{order.product}</h3>
              <p className="text-sm text-[#9CA3AF]">{order.category}</p>
            </div>

            <p className="flex items-center gap-2 text-[#9CA3AF]">
              <Calendar size={16} />
              {order.date}
            </p>

            <p className="font-bold text-white">{order.amount}</p>

            <span
              className={`w-fit rounded-full px-3 py-1 text-sm font-bold ${statusClass(
                order.status
              )}`}
            >
              {order.status}
            </span>

            <MoreHorizontal size={22} className="text-[#9CA3AF]" />
          </div>
        ))}

        <div className="flex items-center justify-between p-5 text-[#9CA3AF]">
          <p>8 orders</p>

          <div className="flex items-center gap-3">
            <button className="rounded-lg bg-[#F97316] px-4 py-2 font-bold text-white">
              1
            </button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  title,
  value,
  desc,
  positive = false,
}: {
  title: string;
  value: string;
  desc: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
      <p className="tracking-[0.2em] text-[#9CA3AF]">{title}</p>
      <h2 className="mt-6 text-4xl font-bold text-white">{value}</h2>
      <p
        className={`mt-4 flex items-center gap-2 ${
          positive ? "text-emerald-400" : "text-[#9CA3AF]"
        }`}
      >
        {positive && <TrendingUp size={16} />}
        {desc}
      </p>
    </div>
  );
}

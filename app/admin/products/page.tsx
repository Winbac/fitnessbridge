import { Box, MoreHorizontal, Plus, Search, TrendingDown, TrendingUp } from "lucide-react";

const products = [
  { name: "Premium Gym Bottle", category: "Accessories", price: "$34.99", stock: 142, sales: 87 },
  { name: "Resistance Band Set", category: "Equipment", price: "$49.99", stock: 58, sales: 124 },
  { name: "Whey Protein 2kg", category: "Nutrition", price: "$89.99", stock: 12, sales: 203 },
  { name: "Training Gloves", category: "Accessories", price: "$29.99", stock: 0, sales: 56 },
  { name: "Foam Roller Pro", category: "Recovery", price: "$44.99", stock: 91, sales: 41 },
  { name: "BCAA Powder 500g", category: "Nutrition", price: "$54.99", stock: 33, sales: 178 },
];

function getStatus(stock: number) {
  if (stock === 0) return { text: "Out of Stock", className: "bg-rose-500/15 text-rose-400" };
  if (stock <= 20) return { text: "Low Stock", className: "bg-yellow-500/15 text-yellow-400" };
  return { text: "In Stock", className: "bg-emerald-500/15 text-emerald-400" };
}

export default function ProductsPage() {
  return (
    <div className="space-y-9">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="mt-2 text-[#9CA3AF]">
            Manage your store inventory and listings.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C]">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">TOTAL PRODUCTS</p>
          <h2 className="mt-6 text-4xl font-bold text-white">24</h2>
          <p className="mt-4 text-[#9CA3AF]">6 categories</p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">IN STOCK</p>
          <h2 className="mt-6 text-4xl font-bold text-white">18</h2>
          <p className="mt-4 flex items-center gap-2 text-emerald-400">
            <TrendingUp size={16} /> 75% of catalog
          </p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">LOW STOCK</p>
          <h2 className="mt-6 text-4xl font-bold text-white">4</h2>
          <p className="mt-4 flex items-center gap-2 text-rose-400">
            <TrendingDown size={16} /> Needs attention
          </p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">MONTHLY SALES</p>
          <h2 className="mt-6 text-4xl font-bold text-white">$8,412</h2>
          <p className="mt-4 flex items-center gap-2 text-emerald-400">
            <TrendingUp size={16} /> +22% vs last month
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827]">
        <div className="flex items-center justify-between border-b border-[#1F2937] p-6">
          <h2 className="text-xl font-bold text-white">All Products</h2>

          <div className="flex items-center gap-3 rounded-xl bg-[#171923] px-4 py-3 text-[#9CA3AF]">
            <Search size={20} />
            <input
              placeholder="Search products..."
              className="bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-[1.6fr_0.9fr_0.7fr_0.7fr_0.9fr_0.7fr_40px] border-b border-[#1F2937] px-6 py-4 text-sm tracking-[0.15em] text-[#9CA3AF]">
          <span>PRODUCT</span>
          <span>CATEGORY</span>
          <span>PRICE</span>
          <span>STOCK</span>
          <span>STATUS</span>
          <span>SALES</span>
          <span></span>
        </div>

        {products.map((product) => {
          const status = getStatus(product.stock);

          return (
            <div
              key={product.name}
              className="grid grid-cols-[1.6fr_0.9fr_0.7fr_0.7fr_0.9fr_0.7fr_40px] items-center border-b border-[#1F2937] px-6 py-5 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#171923] text-[#9CA3AF]">
                  <Box size={18} />
                </div>
                <h3 className="font-bold text-white">{product.name}</h3>
              </div>

              <span className="w-fit rounded-full bg-[#171923] px-3 py-1 text-[#9CA3AF]">
                {product.category}
              </span>

              <p className="font-bold text-white">{product.price}</p>

              <p className="text-[#9CA3AF]">{product.stock} units</p>

              <span className={`w-fit rounded-full px-3 py-1 text-sm font-bold ${status.className}`}>
                {status.text}
              </span>

              <p className="text-[#9CA3AF]">{product.sales} sold</p>

              <MoreHorizontal size={22} className="text-[#9CA3AF]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
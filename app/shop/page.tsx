import Container from "@/components/layout/Container";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";

const categories = [
  "All",
  "Protein",
  "Pre Workout",
  "Bottles",
  "Gym Accessories",
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] pt-[120px]">
      <Container>
  <div className="mb-10">
  <Link
    href="/"
    className="mb-8 inline-flex items-center gap-2 text-[#D1D5DB] transition hover:text-[#F97316]"
  >
    ← Back to Home
  </Link>

  <h1 className="text-5xl font-bold text-white">Shop Products</h1>

  <p className="mt-3 text-[#D1D5DB]">
    Choose protein, bottles, and gym essentials.
  </p>
</div>

        <div className="mb-10 flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className="rounded-xl border border-[#374151] px-5 py-3 font-semibold text-white hover:border-[#F97316] hover:text-[#F97316]"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
<ProductCard
  key={product.id}
  name={product.name}
  image={product.image}
  price={product.price}
  rating={product.rating}
  description={product.description}
  isNew={product.isNew}
/>
          ))}
        </div>
      </Container>
    </main>
  );
}
import Container from "@/components/layout/Container";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import SectionHeading from "../ui/SectionHeading";
import Link from "next/link";

export default function ShopEssentials() {
  return (
    <section  id="shop" className="bg-[#0F172A] py-4">
      
      <Container>
        <div className="mb-12">
          <SectionHeading title="Shop Essentials" />
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
  <Link
    href="/shop"
    className="rounded-xl border border-[#F97316] px-8 py-4 font-semibold text-white transition hover:bg-[#F97316]"
  >
    View More Products
  </Link>
</div>
      </Container>
    </section>
  );
}
"use client";

import Container from "@/components/layout/Container";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "../ui/SectionHeading";
import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  category?: string;
  description?: string;
  image?: string;
  rating?: number;
  isNew?: boolean;
};

export default function ShopEssentials() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();

        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.log("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section id="shop" className="bg-[#0F172A] py-4">
      <Container>
        <div className="mb-12">
          <SectionHeading title="Shop Essentials" />
        </div>

        {loading ? (
          <p className="text-[#9CA3AF]">Loading products...</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                name={product.name}
                price={product.price}
                description={product.description || "Premium fitness product"}
                image={product.image || "/Image/bottle-1.png"}
                rating={product.rating || 4.5}
                isNew={product.isNew || false}
              />
            ))}
          </div>
        )}

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
"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  MoreHorizontal,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales?: number;
  image?: string;
};

function getStatus(stock: number) {
  if (stock === 0)
    return { text: "Out of Stock", className: "bg-rose-500/15 text-rose-400" };

  if (stock <= 20)
    return { text: "Low Stock", className: "bg-yellow-500/15 text-yellow-400" };

  return { text: "In Stock", className: "bg-emerald-500/15 text-emerald-400" };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
        console.log("Products from API:", data.data);
      }
    } catch (error) {
      console.log("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
  const confirmDelete = confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (data.success) {
    fetchProducts();
  } else {
    alert(data.message || "Failed to delete product");
  }
}

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const totalProducts = products.length;
  const inStock = products.filter((p) => p.stock > 20).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 20).length;
  const monthlySales = products.reduce(
    (total, product) => total + product.price * (product.sales || 0),
    0
  );

  return (
    <div className="space-y-9">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="mt-2 text-[#9CA3AF]">
            Manage your store inventory and listings.
          </p>
        </div>
<Link
  href="/admin/products/create"
  className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C]"
>
  <Plus size={18} />
  Add Product
</Link>

      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">TOTAL PRODUCTS</p>
          <h2 className="mt-6 text-4xl font-bold text-white">
            {totalProducts}
          </h2>
          <p className="mt-4 text-[#9CA3AF]">Live from database</p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">IN STOCK</p>
          <h2 className="mt-6 text-4xl font-bold text-white">{inStock}</h2>
          <p className="mt-4 flex items-center gap-2 text-emerald-400">
            <TrendingUp size={16} /> Available products
          </p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">LOW STOCK</p>
          <h2 className="mt-6 text-4xl font-bold text-white">{lowStock}</h2>
          <p className="mt-4 flex items-center gap-2 text-rose-400">
            <TrendingDown size={16} /> Needs attention
          </p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <p className="tracking-[0.2em] text-[#9CA3AF]">MONTHLY SALES</p>
          <h2 className="mt-6 text-4xl font-bold text-white">
            ₹{monthlySales.toLocaleString()}
          </h2>
          <p className="mt-4 flex items-center gap-2 text-emerald-400">
            <TrendingUp size={16} /> Based on product sales
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="hidden grid-cols-[1.6fr_1fr_0.7fr_0.7fr_0.9fr_0.7fr_100px] border-b border-[#1F2937] px-6 py-4 text-sm tracking-[0.15em] text-[#9CA3AF] lg:grid">
          <span>PRODUCT</span>
          <span>CATEGORY</span>
          <span>PRICE</span>
          <span>STOCK</span>
          <span>STATUS</span>
          <span>SALES</span>
          <span></span>
        </div>

        {loading ? (
          <p className="p-6 text-[#9CA3AF]">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="p-6 text-[#9CA3AF]">No products found.</p>
        ) : (
          filteredProducts.map((product) => {
            const status = getStatus(product.stock);

            return (
              <div
                key={product._id}
                className="grid gap-4 border-b border-[#1F2937] p-5 last:border-b-0 lg:grid-cols-[1.6fr_1fr_0.7fr_0.7fr_0.9fr_0.7fr_100px] lg:items-center lg:px-6"
              >
                <div className="flex items-center gap-4">
                 <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-[#171923] text-[#9CA3AF]">
  {product.image ? (
    <Image
      src={product.image}
      alt={product.name}
      width={44}
      height={44}
      className="h-full w-full object-cover"
    />
  ) : (
    <Box size={18} />
  )}
</div>
                  <h3 className="font-bold text-white">{product.name}</h3>
                </div>

       <span className="w-fit rounded-full bg-[#171923] px-3 py-1 text-[#9CA3AF]">
  {product.category ? product.category : "No Category"}
</span>

                <p className="font-bold text-white">₹{product.price}</p>

                <p className="text-[#9CA3AF]">{product.stock} units</p>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-sm font-bold ${status.className}`}
                >
                  {status.text}
                </span>

                <p className="text-[#9CA3AF]">{product.sales || 0} sold</p>

<div className="flex items-center gap-3">
  <Link
    href={`/admin/products/edit/${product._id}`}
    className="text-sm font-semibold text-[#F97316] hover:text-[#EA580C]"
  >
    Edit
  </Link>

  <button
    onClick={() => handleDelete(product._id)}
    className="text-sm font-semibold text-rose-400 hover:text-rose-300"
  >
    Delete
  </button>
</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
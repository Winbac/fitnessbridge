"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Plus, Search, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

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
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          <h1 className="text-3xl font-bold text-[var(--admin-text)]">
            Products
          </h1>
          <p className="mt-2 text-[var(--admin-muted)]">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ProductStat
          icon={<Box size={20} className="text-[#F97316]" />}
          label="Total Products"
          value={totalProducts}
        />
        <ProductStat
          icon={<TrendingUp size={20} className="text-emerald-400" />}
          label="In Stock"
          value={inStock}
        />
        <ProductStat
          icon={<TrendingDown size={20} className="text-yellow-400" />}
          label="Low Stock"
          value={lowStock}
        />
        <ProductStat
          icon={<Box size={20} className="text-[#F97316]" />}
          label="Monthly Sales"
          value={`₹${monthlySales.toLocaleString()}`}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)]">
        <div className="flex items-center justify-between border-b border-[var(--admin-border)] p-6">
          <h2 className="text-xl font-bold text-[var(--admin-text)]">
            All Products
          </h2>

          <div className="flex items-center gap-3 rounded-xl bg-[var(--admin-panel)] px-4 py-3 text-[var(--admin-muted)]">
            <Search size={20} />
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1100px]">
            <div
              className="grid items-center border-b border-[var(--admin-border)] bg-[var(--admin-panel)] px-6 py-4"
              style={{
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 120px",
              }}
            >
              <p className="font-semibold text-[var(--admin-text)]">Product</p>
              <p className="font-semibold text-[var(--admin-text)]">Category</p>
              <p className="font-semibold text-[var(--admin-text)]">Price</p>
              <p className="font-semibold text-[var(--admin-text)]">Stock</p>
              <p className="font-semibold text-[var(--admin-text)]">Sales</p>
              <p className="font-semibold text-[var(--admin-text)]">Status</p>
              <p className="text-right font-semibold text-[var(--admin-text)]">
                Action
              </p>
            </div>

            {loading ? (
              <p className="p-6 text-[var(--admin-muted)]">Loading products...</p>
            ) : paginatedProducts.length === 0 ? (
              <p className="p-6 text-[var(--admin-muted)]">No products found.</p>
            ) : (
              paginatedProducts.map((product) => {
                const status = getStatus(product.stock);

                return (
                  <div
                    key={product._id}
                    className="grid items-center border-b border-[var(--admin-border)] px-6 py-5 last:border-b-0"
                    style={{
                      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 120px",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="rounded-lg bg-[var(--admin-panel)] p-2">
                          <Box size={20} className="text-[var(--admin-muted)]" />
                        </div>
                      )}

                      <p className="font-semibold text-[var(--admin-text)]">
                        {product.name}
                      </p>
                    </div>

                    <p className="text-[var(--admin-muted)]">
                      {product.category || "No Category"}
                    </p>
                    <p className="font-semibold text-[var(--admin-text)]">
                      ₹{product.price}
                    </p>
                    <p className="text-[var(--admin-muted)]">{product.stock}</p>
                    <p className="text-[var(--admin-muted)]">
                      {product.sales || 0}
                    </p>

                    <span
                      className={`inline-flex w-fit rounded-lg px-2.5 py-1 text-sm font-medium ${status.className}`}
                    >
                      {status.text}
                    </span>

                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/products/edit/${product._id}`}
                        className="font-semibold text-[#F97316] hover:text-[#EA580C]"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="font-semibold text-rose-400 hover:text-rose-300"
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
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`rounded px-3 py-1 ${
                currentPage === i + 1
                  ? "bg-[#F97316] text-white"
                  : "bg-[var(--admin-panel)] text-[var(--admin-muted)]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-[var(--admin-panel)] p-3">{icon}</div>
        <div>
          <p className="text-sm text-[var(--admin-muted)]">{label}</p>
          <p className="text-2xl font-bold text-[var(--admin-text)]">{value}</p>
        </div>
      </div>
    </div>
  );
}
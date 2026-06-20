"use client";
import Link from "next/link";
import Image from "next/image";
import { Box, Plus, Search, TrendingDown, TrendingUp } from "lucide-react";
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

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
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

  // ✅ Filter products by search
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  // ✅ Reset page to 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ✅ Paginate AFTER filtering
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const totalProducts = products.length;
  const inStock = products.filter((p) => p.stock > 20).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 20).length;
  const monthlySales = products.reduce(
    (total, product) => total + product.price * (product.sales || 0),
    0
  );

  return (
    <div className="space-y-9">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="mt-2 text-[#9CA3AF]">Manage your store inventory and listings.</p>
        </div>
        <Link
          href="/admin/products/create"
          className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C]"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#171923] p-3">
              <Box size={20} className="text-[#F97316]" />
            </div>
            <div>
              <p className="text-[#9CA3AF] text-sm">Total Products</p>
              <p className="text-2xl font-bold text-white">{totalProducts}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#171923] p-3">
              <TrendingUp size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-[#9CA3AF] text-sm">In Stock</p>
              <p className="text-2xl font-bold text-white">{inStock}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#171923] p-3">
              <TrendingDown size={20} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-[#9CA3AF] text-sm">Low Stock</p>
              <p className="text-2xl font-bold text-white">{lowStock}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#171923] p-3">
              <Box size={20} className="text-[#F97316]" />
            </div>
            <div>
              <p className="text-[#9CA3AF] text-sm">Monthly Sales</p>
              <p className="text-2xl font-bold text-white">₹{monthlySales.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827]">
        {/* Search */}
        <div className="flex items-center justify-between border-b border-[#1F2937] p-6">
          <h2 className="text-xl font-bold text-white">All Products</h2>
          <div className="flex items-center gap-3 rounded-xl bg-[#171923] px-4 py-3 text-[#9CA3AF]">
            <Search size={20} />
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // ✅ Reset page when searching
              }}
              className="bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_120px] items-center border-b border-[#1F2937] bg-[#1F2937] px-6 py-4">
          <p className="font-semibold text-white">Product</p>
          <p className="font-semibold text-white">Category</p>
          <p className="font-semibold text-white">Price</p>
          <p className="font-semibold text-white">Stock</p>
          <p className="font-semibold text-white">Sales</p>
          <p className="font-semibold text-white">Status</p>
          <p className="font-semibold text-white text-right">Action</p>
        </div>

        {/* Table Rows */}
        {loading ? (
          <p className="p-6 text-[#9CA3AF]">Loading products...</p>
        ) : paginatedProducts.length === 0 ? (
          <p className="p-6 text-[#9CA3AF]">No products found.</p>
        ) : (
          paginatedProducts.map((product) => {
            const status = getStatus(product.stock);
            return (
              <div
                key={product._id}
                className="grid items-center border-b border-[#1F2937] px-6 py-5 last:border-b-0"
                style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 120px" }}
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
                    <div className="rounded-lg bg-[#1F2937] p-2">
                      <Box size={20} className="text-[#9CA3AF]" />
                    </div>
                  )}
                  <p className="font-semibold text-white">{product.name}</p>
                </div>
                <p className="text-[#9CA3AF]">{product.category}</p>
                <p className="font-semibold text-white">₹{product.price}</p>
                <p className="text-[#9CA3AF]">{product.stock}</p>
                <p className="text-[#9CA3AF]">{product.sales || 0}</p>
                <span className={`inline-flex rounded-lg px-2.5 py-1 text-sm font-medium ${status.className}`}>
                  {status.text}
                </span>
                <div className="text-right">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-rose-400 hover:text-rose-300 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ✅ Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-[#F97316] text-white" : "bg-[#171923] text-[#9CA3AF]"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
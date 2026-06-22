"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    sales: "0",
    image: "",
    description: "",
    rating: "5",
    isNewProduct: false,
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (data.success) {
          const product = data.data;

          setFormData({
            name: product.name || "",
            category: product.category || "",
            price: String(product.price || ""),
            stock: String(product.stock || ""),
            sales: String(product.sales || 0),
            image: product.image || "",
            description: product.description || "",
            rating: String(product.rating || 5),
            isNewProduct: product.isNewProduct || false,
          });
        }
      } catch (error) {
        console.log("Failed to fetch product", error);
      } finally {
        setFetching(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev,
      isNewProduct: e.target.checked,
    }));
  }

  async function uploadImage(file: File) {
    try {
      setUploading(true);

      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
image: data.imageUrl,
        }));
      } else {
        alert(data.message || "Image upload failed");
      }
    } catch (error) {
      console.log("Upload error:", error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (uploading) {
      alert("Please wait, image is still uploading.");
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      sales: Number(formData.sales),
      rating: Number(formData.rating),
    };

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    setLoading(false);

    if (data.success) {
      router.push("/admin/products");
      router.refresh();
    } else {
      alert(data.message || "Failed to update product");
    }
  }

  if (fetching) {
    return <p className="text-[#9CA3AF]">Loading product...</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/products"
          className="mb-5 inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#F97316]"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        <h1 className="text-3xl font-bold text-white">Edit Product</h1>
        <p className="mt-2 text-[#9CA3AF]">
          Update product details for your Fitness Bridge shop.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl rounded-2xl border border-[#1F2937] bg-[#111827] p-6"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Whey Protein 2kg"
          />

          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Nutrition"
          />

          <Input
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="2999"
          />

          <Input
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="40"
          />

          <Input
            label="Sales"
            name="sales"
            type="number"
            value={formData.sales}
            onChange={handleChange}
            placeholder="0"
          />

          <Input
            label="Rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            placeholder="5"
          />

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  uploadImage(e.target.files[0]);
                }
              }}
              className="block w-full rounded-xl border border-[#1F2937] bg-[#171923] p-3 text-white"
            />

            {uploading && (
              <p className="mt-3 text-[#F97316]">Uploading...</p>
            )}

            {formData.image && (
              <div className="mt-5">
                <Image
                  src={formData.image}
                  alt="Product preview"
                  width={180}
                  height={180}
                  className="rounded-xl border border-[#1F2937] object-cover"
                />
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write product description..."
              rows={5}
              className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white outline-none placeholder:text-[#6B7280] focus:border-[#F97316]"
            />
          </div>

          <label className="flex items-center gap-3 text-[#D1D5DB]">
            <input
              type="checkbox"
              checked={formData.isNewProduct}
              onChange={handleCheckbox}
              className="h-4 w-4"
            />
            Mark as new product
          </label>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/products"
            className="rounded-xl bg-[#171923] px-5 py-3 font-semibold text-white hover:bg-[#1F2937]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading || uploading}
            className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C] disabled:opacity-60"
          >
            <Save size={18} />
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={name === "name" || name === "category" || name === "price"}
        className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white outline-none placeholder:text-[#6B7280] focus:border-[#F97316]"
      />
    </div>
  );
}
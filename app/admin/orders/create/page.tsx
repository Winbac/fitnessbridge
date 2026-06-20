"use client";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
};

export default function CreateOrderPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    productId: "",
    quantity: "1",
    price: "",
    paymentMethod: "COD",
    paymentStatus: "PENDING",
    orderStatus: "PLACED",
  });

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        
        setProducts(data.data);
      }
    }

    fetchProducts();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    if (name === "productId") {
      const selectedProduct = products.find((p) => p._id === value);

      setFormData((prev) => ({
        ...prev,
        productId: value,
        price: selectedProduct ? String(selectedProduct.price) : "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);

  try {
    const quantity = Number(formData.quantity);
    const price = Number(formData.price);
    const totalAmount = quantity * price;

    const payload = {
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      products: [
        {
          productId: formData.productId,
          quantity,
          price,
        },
      ],
      totalAmount,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentStatus,
      orderStatus: formData.orderStatus,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Order created successfully!");

      setTimeout(() => {
        router.push("/admin/orders");
        router.refresh();
      }, 1000);
    } else {
      toast.error(data.message || "Failed to create order");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
}

  const totalAmount = Number(formData.quantity || 0) * Number(formData.price || 0);

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/orders"
          className="mb-5 inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#F97316]"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>

        <h1 className="text-3xl font-bold text-white">Create Order</h1>
        <p className="mt-2 text-[#9CA3AF]">
          Add a new product order for a customer.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl rounded-2xl border border-[#1F2937] bg-[#111827] p-6"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input label="Customer Name" name="customerName" value={formData.customerName} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />

          <Select label="Product" name="productId" value={formData.productId} onChange={handleChange}>
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - ₹{product.price}
              </option>
            ))}
          </Select>

          <Input label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} />
          <Input label="Price" name="price" type="number" value={formData.price} onChange={handleChange} />

          <Select label="Payment Method" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="COD">COD</option>
            <option value="ONLINE">ONLINE</option>
          </Select>

          <Select label="Payment Status" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange}>
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
            <option value="FAILED">FAILED</option>
          </Select>

          <Select label="Order Status" name="orderStatus" value={formData.orderStatus} onChange={handleChange}>
            <option value="PLACED">PLACED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </Select>

          <div className="rounded-xl bg-[#171923] p-4">
            <p className="text-sm text-[#9CA3AF]">Total Amount</p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              ₹{totalAmount.toLocaleString()}
            </h2>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={4}
              required
              className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white outline-none focus:border-[#F97316]"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/orders"
            className="rounded-xl bg-[#171923] px-5 py-3 font-semibold text-white"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl
             bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C] disabled:opacity-60"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Order"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text" }: any) {
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
        required
        className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white outline-none focus:border-[#F97316]"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, children }: any) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#D1D5DB]">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full rounded-xl border border-[#1F2937] bg-[#171923] px-4 py-3 text-white outline-none focus:border-[#F97316]"
      >
        {children}
      </select>
    </div>
  );
} 

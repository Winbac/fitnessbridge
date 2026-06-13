import { FaInstagram, FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";
import Container from "@/components/layout/Container";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Product */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Product</h3>

            <ul className="space-y-4 text-sm text-[#D1D5DB]">
              <li>Gym Plans</li>
              <li>Personal Training</li>
              <li>Yoga Classes</li>
              <li>Nutrition Guide</li>
              <li>Fitness App</li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Address</h3>

            <ul className="space-y-4 text-sm text-[#D1D5DB]">
              <li>The Fitness Bridge</li>
              <li>Sector 15</li>
              <li>Faridabad, Haryana</li>
              <li>India</li>
              <li>121007</li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Useful Links
            </h3>

            <ul className="space-y-4 text-sm text-[#D1D5DB]">
              <li>Home</li>
              <li>Plans</li>
              <li>Trainers</li>
              <li>Shop</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Brand */}
          <div>
            <h3 className="mb-5 text-2xl font-bold text-[#F97316]">
              The Fitness Bridge
            </h3>

            <p className="max-w-[300px] text-sm leading-relaxed text-[#D1D5DB]">
              Transform your fitness journey with expert trainers, modern
              equipment, and personalized workout plans designed to help you
              achieve lasting results.
            </p>
<div className="mt-6 flex gap-4">
  <a className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-[#F97316] hover:bg-[#F97316] hover:text-white">
    <FaInstagram size={18} />
  </a>

  <a className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-[#F97316] hover:bg-[#F97316] hover:text-white">
    <FaFacebookF size={18} />
  </a>

  <a className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-[#F97316] hover:bg-[#F97316] hover:text-white">
    <FaXTwitter size={18} />
  </a>

  <a className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-[#F97316] hover:bg-[#F97316] hover:text-white">
    <FaYoutube size={18} />
  </a>
</div>
          </div>
        </div>

        <p className="mt-16 text-center text-sm text-[#D1D5DB]">
          © 2026 The Fitness Bridge. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
}
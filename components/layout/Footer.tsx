import { FaInstagram, FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";
import Container from "@/components/layout/Container";
import Link from "next/link";

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
              <li>India, 121007</li>
            </ul>
          </div>

          {/* Useful Links */}
        
{/* Useful Links */}
<div>
  <h3 className="mb-5 text-lg font-bold text-white">
    Useful Links
  </h3>

  <ul className="space-y-4 text-sm text-[#D1D5DB]">
    <li>
      <Link
        href="/"
        className="transition hover:text-[#F97316]"
      >
        Home
      </Link>
    </li>

    <li>
      <Link
        href="/#plans"
        className="transition hover:text-[#F97316]"
      >
        Plans
      </Link>
    </li>

    <li>
      <Link
        href="/shop"
        className="transition hover:text-[#F97316]"
      >
        Shop
      </Link>
    </li>

    <li>
      <Link
        href="/#contact"
        className="transition hover:text-[#F97316]"
      >
        Contact Us
      </Link>
    </li>
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
  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-[#F97316] transition hover:bg-[#F97316] hover:text-white"
  >
    <FaInstagram size={18} />
  </a>

  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-[#F97316] transition hover:bg-[#F97316] hover:text-white"
  >
    <FaFacebookF size={18} />
  </a>

  <a
    href="https://x.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter"
    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-[#F97316] transition hover:bg-[#F97316] hover:text-white"
  >
    <FaXTwitter size={18} />
  </a>

  <a
    href="https://youtube.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-[#F97316] transition hover:bg-[#F97316] hover:text-white"
  >
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
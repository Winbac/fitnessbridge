import { FaInstagram, FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";
import Container from "@/components/layout/Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1F2937] bg-[#0F172A] py-16">
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
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Useful Links</h3>

            <ul className="space-y-4 text-sm text-[#D1D5DB]">
              <li>
                <Link href="/" className="transition hover:text-[#F97316]">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/#plans" className="transition hover:text-[#F97316]">
                  Plans
                </Link>
              </li>

              <li>
                <Link href="/shop" className="transition hover:text-[#F97316]">
                  Shop
                </Link>
              </li>

              <li>
                <Link href="/contact" className="transition hover:text-[#F97316]">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="transition hover:text-[#F97316]"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="transition hover:text-[#F97316]">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/delete-data"
                  className="transition hover:text-[#F97316]"
                >
                  Delete Data
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
              <SocialLink href="https://instagram.com" label="Instagram">
                <FaInstagram size={18} />
              </SocialLink>

              <SocialLink href="https://facebook.com" label="Facebook">
                <FaFacebookF size={18} />
              </SocialLink>

              <SocialLink href="https://x.com" label="Twitter">
                <FaXTwitter size={18} />
              </SocialLink>

              <SocialLink href="https://youtube.com" label="YouTube">
                <FaYoutube size={18} />
              </SocialLink>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-[#1F2937] pt-6">
          <p className="text-center text-sm text-[#D1D5DB]">
            © 2026 The Fitness Bridge. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-[#F97316] transition hover:bg-[#F97316] hover:text-white"
    >
      {children}
    </a>
  );
}
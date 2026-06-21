import Container from "@/components/layout/Container";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] py-20">
      <Container>
        <div className="mx-auto max-w-6xl rounded-3xl border border-[#1F2937] bg-[#111827] p-8 md:p-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">
              Contact Us
            </h1>

            <p className="mt-4 text-[#9CA3AF]">
              We'd love to hear from you. If you have any questions,
              suggestions, or need support, feel free to contact us.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#1F2937] bg-[#171923] p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#F97316]/15 p-3 text-[#F97316]">
                    <Mail size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-[#9CA3AF]">Email</p>
                    <p className="font-semibold text-white">
                      support@thefitnessbridge.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#1F2937] bg-[#171923] p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#F97316]/15 p-3 text-[#F97316]">
                    <Phone size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-[#9CA3AF]">Phone</p>
                    <p className="font-semibold text-white">
                      +91 98765 43210
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#1F2937] bg-[#171923] p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#F97316]/15 p-3 text-[#F97316]">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-[#9CA3AF]">Address</p>
                    <p className="font-semibold text-white">
                      The Fitness Bridge
                    </p>
                    <p className="text-[#D1D5DB]">
                      Sector 15, Faridabad,
                    </p>
                    <p className="text-[#D1D5DB]">
                      Haryana, India - 121007
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#1F2937] bg-[#171923] p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#F97316]/15 p-3 text-[#F97316]">
                    <Clock size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-[#9CA3AF]">
                      Business Hours
                    </p>
                    <p className="font-semibold text-white">
                      Monday - Saturday
                    </p>
                    <p className="text-[#D1D5DB]">
                      9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#1F2937] bg-[#171923] p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#F97316]/15 p-3 text-[#F97316]">
                    <Globe size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-[#9CA3AF]">
                      Website
                    </p>
                    <p className="font-semibold text-white">
                      https://thefitnessbridge.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-[#1F2937] bg-[#171923] p-8">
              <h2 className="mb-6 text-2xl font-bold text-white">
                Send us a Message
              </h2>

              <form className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-[#1F2937] bg-[#111827] px-4 py-4 text-white outline-none focus:border-[#F97316]"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-[#1F2937] bg-[#111827] px-4 py-4 text-white outline-none focus:border-[#F97316]"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full rounded-xl border border-[#1F2937] bg-[#111827] px-4 py-4 text-white outline-none focus:border-[#F97316]"
                />

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full rounded-xl border border-[#1F2937] bg-[#111827] px-4 py-4 text-white outline-none focus:border-[#F97316]"
                />

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#F97316] py-4 font-semibold text-white transition hover:bg-[#EA580C]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
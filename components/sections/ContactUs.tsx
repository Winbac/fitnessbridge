import { Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/layout/Container";

export default function ContactUs() {
  return (
    <section   id="contact"  className="bg-[#0F172A] py-8">
      <Container>
           <h2 className="mb-10 text-3xl font-bold text-white">
          <span className="mr-2 text-[#F97316]">|</span>
            Contact Us
        </h2>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* LEFT CONTENT */}
          <div>
         

            <h2 className="max-w-[420px] text-4xl font-bold leading-tight text-white">
              Ready To Start Your Fitness Journey?
            </h2>

            <p className="mt-6 max-w-[420px] text-base font-regular leading-relaxed text-[#D1D5DB]">
              Have questions about memberships, personal training, yoga sessions,
              or fitness plans? Get in touch with our team today.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111827] text-[#F97316]">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-[#9CA3AF]">Phone</p>
                  <p className="text-base font-semibold text-[#D1D5DB]">
                    +91 98101 98101
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111827] text-[#F97316]">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-[#9CA3AF]">Email</p>
                  <p className="text-base font-semibold text-[#D1D5DB]">
                    hello@fitnessbridge.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111827] text-[#F97316]">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-[#9CA3AF]">Location</p>
                  <p className="text-base font-semibold text-[#D1D5DB]">
                    Faridabad, Haryana
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div>
            <h3 className="mb-10 text-3xl font-bold text-[#F97316]">
              Get In Touch
            </h3>

            <form className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-[#D1D5DB]">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Carter"
                    className="h-14 w-full rounded-xl border border-[#374151] bg-[#1F2937]/70 px-5 text-white outline-none placeholder:text-[#9CA3AF] focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-[#D1D5DB]">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="example@yourmail.com"
                    className="h-14 w-full rounded-xl border border-[#374151] bg-[#1F2937]/70 px-5 text-white outline-none placeholder:text-[#9CA3AF] focus:border-[#F97316]"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-[#D1D5DB]">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="John Carter"
                    className="h-14 w-full rounded-xl border border-[#374151] bg-[#1F2937]/70 px-5 text-white outline-none placeholder:text-[#9CA3AF] focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-[#D1D5DB]">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="John Carter"
                    className="h-14 w-full rounded-xl border border-[#374151] bg-[#1F2937]/70 px-5 text-white outline-none placeholder:text-[#9CA3AF] focus:border-[#F97316]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-[#D1D5DB]">
                  Message
                </label>
                <textarea
                  placeholder="Type your message here..."
                  className="h-40 w-full resize-none rounded-xl border border-[#374151] bg-[#1F2937]/70 px-5 py-4 text-white outline-none placeholder:text-[#9CA3AF] focus:border-[#F97316]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-[#F97316] px-8 py-4 font-bold text-white transition hover:bg-[#EA580C] md:w-fit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
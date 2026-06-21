import Container from "@/components/layout/Container";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] py-20">
      <Container>
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#1F2937] bg-[#111827] p-8 md:p-12">
          <h1 className="text-4xl font-bold text-white">
            Terms & Conditions
          </h1>

          <p className="mt-3 text-[#9CA3AF]">
            Last Updated: June 2026
          </p>

          <div className="mt-10 space-y-10 leading-8 text-[#D1D5DB]">

            {/* Acceptance */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                1. Acceptance of Terms
              </h2>

              <p>
                By accessing or using The Fitness Bridge website, mobile
                application, or related services, you agree to comply with
                these Terms & Conditions. If you do not agree, please do not
                use our services.
              </p>
            </section>

            {/* Services */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                2. Our Services
              </h2>

              <p>
                The Fitness Bridge provides fitness memberships, workout
                programs, nutrition guidance, fitness equipment sales,
                subscription services, and related digital solutions.
              </p>
            </section>

            {/* Account */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                3. User Accounts
              </h2>

              <ul className="list-disc space-y-2 pl-6">
                <li>You are responsible for your account credentials.</li>
                <li>Provide accurate information while registering.</li>
                <li>Keep your password secure.</li>
                <li>You are responsible for activities performed using your account.</li>
              </ul>
            </section>

            {/* Payments */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                4. Payments
              </h2>

              <ul className="list-disc space-y-2 pl-6">
                <li>Membership and product prices are subject to change.</li>
                <li>Payments are processed through secure third-party providers.</li>
                <li>Taxes may apply depending on your location.</li>
              </ul>
            </section>

            {/* Cancellation */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                5. Cancellation & Refund Policy
              </h2>

              <p>
                Membership cancellations and refunds are subject to our refund
                policy. Certain digital services or completed memberships may
                not be eligible for refunds.
              </p>
            </section>

            {/* User Responsibilities */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                6. User Responsibilities
              </h2>

              <ul className="list-disc space-y-2 pl-6">
                <li>Do not misuse the platform.</li>
                <li>Do not upload harmful or illegal content.</li>
                <li>Respect other users and staff members.</li>
                <li>Comply with applicable laws.</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                7. Intellectual Property
              </h2>

              <p>
                All content, branding, graphics, logos, software, and website
                materials belong to The Fitness Bridge unless otherwise stated.
                Unauthorized copying or redistribution is prohibited.
              </p>
            </section>

            {/* Liability */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                8. Limitation of Liability
              </h2>

              <p>
                The Fitness Bridge is not liable for indirect, incidental,
                special, or consequential damages arising from the use of our
                services.
              </p>
            </section>

            {/* Updates */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                9. Changes to These Terms
              </h2>

              <p>
                We may update these Terms & Conditions at any time. Continued
                use of our services after changes constitutes acceptance of the
                updated terms.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                10. Contact Information
              </h2>

              <div className="rounded-2xl border border-[#1F2937] bg-[#171923] p-5">
                <p className="font-semibold text-white">
                  The Fitness Bridge
                </p>

                <p>Email: support@thefitnessbridge.com</p>

                <p>Phone: +91-9876543210</p>

                <p>
                  Sector 15, Faridabad, Haryana, India - 121007
                </p>
              </div>
            </section>

          </div>
        </div>
      </Container>
    </main>
  );
}
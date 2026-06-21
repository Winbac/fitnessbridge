import Container from "@/components/layout/Container";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] py-20">
      <Container>
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#1F2937] bg-[#111827] p-8 md:p-12">
          <h1 className="text-4xl font-bold text-white">
            Privacy Policy
          </h1>

          <p className="mt-3 text-[#9CA3AF]">
            Last Updated: June 2026
          </p>

          <div className="mt-10 space-y-10 text-[#D1D5DB] leading-8">

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                1. Introduction
              </h2>

              <p>
                Welcome to <strong>The Fitness Bridge</strong>. Your privacy is
                important to us. This Privacy Policy explains how we collect,
                use, and protect your information when you use our website,
                mobile application, and related services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                2. Information We Collect
              </h2>

              <ul className="list-disc space-y-2 pl-6">
                <li>Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Fitness Preferences</li>
                <li>Membership Details</li>
                <li>Payment Information (processed securely by payment providers)</li>
                <li>Device and Browser Information</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                3. How We Use Your Information
              </h2>

              <ul className="list-disc space-y-2 pl-6">
                <li>Create and manage your account.</li>
                <li>Process memberships and payments.</li>
                <li>Provide workout and nutrition services.</li>
                <li>Improve our website and mobile application.</li>
                <li>Respond to customer support requests.</li>
                <li>Send important notifications and updates.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                4. Google & Facebook Login
              </h2>

              <p>
                If you choose to sign in using Google or Facebook, we may
                receive your name, email address and profile picture from those
                services. We use this information only to authenticate your
                account and improve your experience.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                5. Data Security
              </h2>

              <p>
                We implement industry-standard security measures to protect your
                personal information against unauthorized access, disclosure,
                alteration, or destruction.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                6. Sharing Information
              </h2>

              <p>
                We do not sell your personal information. We may share data only
                with trusted service providers required to operate our platform
                or when required by law.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                7. Cookies
              </h2>

              <p>
                Our website may use cookies to improve user experience, analyze
                website traffic, and remember your preferences.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                8. Your Rights
              </h2>

              <ul className="list-disc space-y-2 pl-6">
                <li>Access your personal information.</li>
                <li>Update incorrect information.</li>
                <li>Request deletion of your account.</li>
                <li>Withdraw consent where applicable.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                9. Contact Us
              </h2>

              <p>
                If you have any questions regarding this Privacy Policy, please
                contact us.
              </p>

              <div className="mt-4 rounded-2xl border border-[#1F2937] bg-[#171923] p-5">
                <p>
                  <strong className="text-white">The Fitness Bridge</strong>
                </p>

                <p>Email: support@thefitnessbridge.com</p>

                <p>Phone: +91-9876543210</p>

                <p>Sector 15, Faridabad, Haryana, India - 121007</p>
              </div>
            </section>

          </div>
        </div>
      </Container>
    </main>
  );
}
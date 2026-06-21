import Container from "@/components/layout/Container";

export default function DeleteDataPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] py-20">
      <Container>
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#1F2937] bg-[#111827] p-8 md:p-12">
          <h1 className="text-4xl font-bold text-white">
            User Data Deletion
          </h1>

          <p className="mt-3 text-[#9CA3AF]">
            Last Updated: June 2026
          </p>

          <div className="mt-10 space-y-10 leading-8 text-[#D1D5DB]">

            {/* Introduction */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                1. Our Commitment
              </h2>

              <p>
                At <strong>The Fitness Bridge</strong>, we respect your privacy
                and your right to control your personal information. You may
                request deletion of your account and associated data at any
                time.
              </p>
            </section>

            {/* Data */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                2. Information That Can Be Deleted
              </h2>

              <ul className="list-disc space-y-2 pl-6">
                <li>Your account information.</li>
                <li>Name, email address and phone number.</li>
                <li>Membership details.</li>
                <li>Workout and nutrition preferences.</li>
                <li>Contact form submissions.</li>
                <li>Application usage data where applicable.</li>
              </ul>
            </section>

            {/* Request */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                3. How to Request Data Deletion
              </h2>

              <p>
                You can request deletion of your personal data by contacting us
                through any of the following methods:
              </p>

              <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#171923] p-6">
                <p>
                  <span className="font-semibold text-white">Email:</span>{" "}
                  support@thefitnessbridge.com
                </p>

                <p className="mt-3">
                  <span className="font-semibold text-white">Phone:</span>{" "}
                  +91-9876543210
                </p>

                <p className="mt-3">
                  <span className="font-semibold text-white">Address:</span>{" "}
                  Sector 15, Faridabad, Haryana, India - 121007
                </p>
              </div>
            </section>

            {/* Timeline */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                4. Processing Time
              </h2>

              <p>
                Once your request is verified, we will begin processing your
                request within 7 business days. Complete deletion may take up to
                30 days depending on legal or operational requirements.
              </p>
            </section>

            {/* Exceptions */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                5. Information We May Retain
              </h2>

              <p>
                Certain information may be retained if required by applicable
                laws, fraud prevention policies, accounting regulations, or
                other legitimate business purposes.
              </p>
            </section>

            {/* OAuth */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                6. Google & Facebook Login Users
              </h2>

              <p>
                If you signed in using Google or Facebook, deleting your account
                from The Fitness Bridge removes the information stored on our
                platform. You may also manage or revoke permissions directly
                from your Google or Facebook account settings.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#F97316]">
                7. Need Assistance?
              </h2>

              <p>
                If you have any questions regarding account deletion or privacy,
                please contact our support team.
              </p>

              <div className="mt-5 rounded-2xl border border-[#1F2937] bg-[#171923] p-6">
                <p className="font-semibold text-white">
                  The Fitness Bridge
                </p>

                <p className="mt-2">
                  Email: support@thefitnessbridge.com
                </p>

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
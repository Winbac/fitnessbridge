import Image from "next/image";
import { Quote, Star } from "lucide-react";
import Container from "@/components/layout/Container";

const testimonials = [
  {
    name: "Suraj Kumar",
    role: "Fitness Member",
    image: "/Image/members.png",
    text: "I joined this gym three months ago, and the transformation has been incredible! The trainers are knowledgeable, and the structured workout plans helped me reach my fitness goals faster than I thought possible.",
  },
  {
    name: "Suraj Kumar",
    role: "Fitness Member",
    image: "/Image/members.png",
    text: "I joined this gym three months ago, and the transformation has been incredible! The trainers are knowledgeable, and the structured workout plans helped me reach my fitness goals faster than I thought possible.",
  },
  {
    name: "Suraj Kumar",
    role: "Fitness Member",
    image: "/Image/members.png",
    text: "I joined this gym three months ago, and the transformation has been incredible! The trainers are knowledgeable, and the structured workout plans helped me reach my fitness goals faster than I thought possible.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#0F172A] py-16">
      <Container>
             <h2 className="mb-10 text-3xl font-bold text-white">
          <span className="mr-2 text-[#F97316]">|</span>
What Our Members Say
        </h2>
        <div className="grid gap-10 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div key={index} className="relative min-h-[300px] pt-10">
              {/* Avatar */}
              <div className="absolute left-8 top-0 z-20 h-20 w-20 overflow-hidden rounded-full border-4 border-[#F97316] bg-[#1F2937]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card SVG Shape */}
              <svg
                className="absolute left-0 top-10 h-full w-full"
                viewBox="0 0 376 269"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M24 0.5H177.713C184.145 0.500038 190.296 3.13671 194.731 7.79492L219.544 33.8535C224.168 38.7101 230.581 41.4589 237.287 41.459H345.726C358.423 41.4591 368.824 51.5464 369.214 64.2383L374.741 244.279C375.148 257.534 364.513 268.5 351.252 268.5H24C11.0213 268.5 0.5 257.979 0.5 245V24L0.507812 23.3936C0.829479 10.6951 11.2241 0.5 24 0.5Z"
                  fill="#111827"
                  stroke="#1F2937"
                />
              </svg>

              {/* Content */}
              <div className="relative z-10 flex min-h-[250px] flex-col px-8 pb-8 pt-16">
                <Quote
                  size={42}
                  className="absolute right-8 top-10 text-[#F97316]/70"
                  fill="currentColor"
                />

                <h3 className="text-lg font-bold text-white">
                  What Our Members Say
                </h3>

                <p className="mt-4 min-h-[105px] text-sm leading-relaxed text-[#D1D5DB]">
                  {item.text}
                </p>

                <div className="mt-auto flex items-end justify-between pt-5">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {item.name}
                    </h4>
                    <p className="text-sm text-[#9CA3AF]">{item.role}</p>
                  </div>

                  <div className="flex gap-1 text-[#F97316]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
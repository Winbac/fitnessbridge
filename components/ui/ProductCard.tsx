import Image from "next/image";
import { Star } from "lucide-react";

type ProductCardProps = {
  name: string;
  image: string;
  price: string | number;
rating: string | number;
  description: string;
  isNew: boolean;
};

export default function ProductCard({
  name,
  image,
  price,
  rating,
  description,
  isNew,
}: ProductCardProps) {
  return (
    <div className="card relative rounded-[24px] border border-[#374151] bg-[#111827] p-6 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-2 hover:border-[#F97316] hover:shadow-[0_0_35px_rgba(249,115,22,0.25)]">
      {/* Badge */}
      {isNew && (
        <div className="absolute left-6 top-6 z-10 flex h-[24px] w-[72px] items-center justify-center rounded-tl-[32px] bg-[#F97316] text-xs font-semibold text-white">
          New
        </div>
      )}

      {/* Image Container */}
      <figure className="rounded-[20px] bg-[#1F2937] p-6">
        <Image
          src={image}
          alt={name}
          width={225}
          height={225}
          className="mx-auto h-[225px] w-[225px] object-contain"
        />
      </figure>

      <div className="card-body p-0 pt-4">
        <h2 className="text-[24px] font-semibold text-white">{name}</h2>

        <p className="text-sm leading-relaxed text-[#9CA3AF]">{description}</p>

        <div className="mt-2 flex items-center justify-between">
<span className="text-lg font-bold text-[#F97316]">{price}</span>

          <div className="flex items-center gap-1 text-[#FACC15]">
            <Star size={18} fill="currentColor" />
            <span className="font-semibold">{rating}</span>
          </div>
        </div>

        <button className="btn mt-2 w-full border-none bg-[#F97316] text-white hover:bg-[#EA580C]">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// components/ui/SectionHeading.tsx

type SectionHeadingProps = {
  title: string;
};

export default function SectionHeading({
  title,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 flex items-center gap-3">
      <div className="h-[32px] w-[4px] rounded-full bg-[#F97316]" />

      <h2 className="text-2xl font-bold text-white lg:text-3xl">
        {title}
      </h2>
    </div>
  );
}
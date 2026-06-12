type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline";
};

export default function Button({ children, variant = "primary" }: ButtonProps) {
  const base =
    "rounded-xl px-6 py-4 text-[14px] font-semibold transition-colors duration-300";

  const styles =
    variant === "primary"
      ? "bg-[#F97316] text-white hover:bg-[#EA580C]"
      : "border border-[#F97316] text-white hover:bg-[#F97316]";

  return <button className={`${base} ${styles}`}>{children}</button>;
}
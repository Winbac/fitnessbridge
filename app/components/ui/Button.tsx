type ButtonProps = {
  children: React.ReactNode;
};

export default function Button({ children }: ButtonProps) {
  return (
    <button
      className="
        px-6 py-4
        rounded-xl
        bg-[#F97316]
        hover:bg-[#EA580C]
        text-white
        font-medium
        transition-colors
        duration-300
      "
    >
      {children}
    </button>
  );
}
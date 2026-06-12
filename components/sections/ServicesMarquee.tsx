const services = [
  "CORPORATE TRAINERS",
  "GROUP TRAINERS",
  "PERSONAL TRAINING",
  "ONLINE TRAINERS",
  "LIVE CLASSES",
];

export default function ServicesMarquee() {
  const repeatedServices = [...services, ...services, ...services, ...services];

  return (
    <section className="overflow-hidden bg-[#1F2937]/90 py-4">
      <div className="flex w-max animate-marquee items-center">
        {repeatedServices.map((service, index) => (
          <div key={index} className="flex items-center gap-8 px-8">
            <span className="text-[#F97316]">✦</span>
            <span className="whitespace-nowrap text-sm font-bold text-white">
              {service}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
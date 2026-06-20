export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--admin-text)]">
        {title}
      </h1>

      <p className="mt-2 text-[var(--admin-muted)]">
        {description}
      </p>
    </div>
  );
}
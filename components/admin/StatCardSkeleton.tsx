import Skeleton from "@/components/ui/Skeleton";

export default function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
      <Skeleton className="h-4 w-28" />

      <Skeleton className="mt-8 h-10 w-24" />

      <Skeleton className="mt-6 h-4 w-40" />
    </div>
  );
}
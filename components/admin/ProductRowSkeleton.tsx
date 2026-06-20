import Skeleton from "@/components/ui/Skeleton";

export default function ProductRowSkeleton() {
  return (
    <div className="grid grid-cols-[1.6fr_1fr_0.7fr_0.7fr_0.9fr_0.7fr_100px] items-center border-b border-[#1F2937] px-6 py-5">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-xl" />

        <div>
          <Skeleton className="h-4 w-36" />
          <Skeleton className="mt-2 h-3 w-24" />
        </div>
      </div>

      <Skeleton className="h-8 w-24 rounded-full" />
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-8 w-28 rounded-full" />
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-8 w-20" />
    </div>
  );
}
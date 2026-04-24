import { PlanDetailClient } from "@/features/plan";
import { getRegions } from "@/features/region";

import { getPlanById, getPlanItemsByPlanId } from "@/shared/data";

interface PlanDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlanDetailPage({ params }: PlanDetailPageProps) {
  const { id } = await params;
  const [plan, items, regions] = await Promise.all([
    getPlanById(id),
    getPlanItemsByPlanId(id),
    getRegions(),
  ]);

  if (!plan)
    return <div className="p-4 text-zinc-400">일정을 찾을 수 없습니다.</div>;

  return (
    <PlanDetailClient
      plan={plan}
      initialItems={items}
      regions={regions ?? []}
    />
  );
}

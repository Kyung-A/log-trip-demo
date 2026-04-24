"use client";

import { useEffect, useMemo, useState } from "react";

import { useParams } from "next/navigation";

import { PlanDetailClient, usePlan } from "@/features/plan";
import { getRegions, IRegion } from "@/features/region";

export default function PlanDetailPage() {
  const { id } = useParams();
  const { plans } = usePlan();
  const [regions, setRegions] = useState<IRegion[] | null>([]);

  const plan = useMemo(() => plans.find((p) => p.id === id), [id, plans]);

  const fetchRegions = async () => {
    const data = await getRegions();

    setRegions(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRegions();
  }, []);

  if (!plan)
    return <div className="p-4 text-zinc-400">일정을 찾을 수 없습니다.</div>;

  return <PlanDetailClient key={plan.id} plan={plan} regions={regions} />;
}

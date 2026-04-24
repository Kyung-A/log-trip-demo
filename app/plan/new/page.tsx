import { PlanForm } from "@/features/plan";
import { getRegions } from "@/features/region";

export default async function NewPlan() {
  const regions = await getRegions();

  return <PlanForm regions={regions} />;
}

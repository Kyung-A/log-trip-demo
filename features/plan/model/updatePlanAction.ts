import { updateFakePlanById, getPlanById } from "@/shared/data";

import { IPlanRegion, ITravelPlan } from "../types";

interface UpdatePlanActionInput {
  id: string;
  region_names: IPlanRegion[];
  start_date: string;
  end_date: string;
}

export const updatePlanAction = (
  input: UpdatePlanActionInput,
): { success: boolean; error?: string } => {
  const { id, ...updateData } = input;
  const title =
    input.region_names.map((r) => r.region_name).join(", ") + " 여행";

  updateFakePlanById(id, { ...updateData, title });
  getPlanById(id) as ITravelPlan;

  return { success: true };
};

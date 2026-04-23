"use server";

import { IPlanRegion } from "@/entities/plan";

interface UpdatePlanActionInput {
  id: string;
  region_names: IPlanRegion[];
  start_date: string;
  end_date: string;
}

export const updatePlanAction = async (
  input: UpdatePlanActionInput,
): Promise<{ success: boolean; error?: string }> => {
  return { success: true };
};

"use server";

import { getPlanItemsByPlanId } from "@/shared/data";
import { IPlanItem } from "../types";

export const getPlanItems = async (planId: string): Promise<IPlanItem[]> => {
  return getPlanItemsByPlanId(planId);
};

"use server";

import { IUpdatePlanItemInput } from "@/entities/plan";

export const updatePlanItemAction = async (
  id: string,
  planId: string,
  input: IUpdatePlanItemInput,
): Promise<{ success: boolean; error?: string }> => {
  return { success: true };
};

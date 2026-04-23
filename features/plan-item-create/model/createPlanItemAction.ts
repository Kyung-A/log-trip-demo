"use server";

import { ICreatePlanItemInput } from "@/entities/plan";

export const createPlanItemAction = async (
  input: ICreatePlanItemInput,
): Promise<{ success: boolean; error?: string }> => {
  return { success: true };
};

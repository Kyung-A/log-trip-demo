import { getPlanItemById, updateFakePlanItemById } from "@/shared/data";

import { IUpdatePlanItemInput } from "..";

export const updatePlanItemAction = (
  id: string,
  _planId: string,
  input: IUpdatePlanItemInput,
): { success: boolean; error?: string } => {
  updateFakePlanItemById(id, input);
  getPlanItemById(id);

  return { success: true };
};

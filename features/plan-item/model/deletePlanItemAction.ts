import { removeFakePlanItem } from "@/shared/data";

export const deletePlanItemAction = (
  id: string,
  planId: string,
): { success: boolean; error?: string } => {
  removeFakePlanItem(id);
  return { success: true };
};

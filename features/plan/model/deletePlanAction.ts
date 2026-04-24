import { removeFakePlan } from "@/shared/data";

export const deletePlanAction = (id: string): { success: boolean } => {
  removeFakePlan(id);
  return { success: true };
};

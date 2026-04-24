"use server";

import { revalidatePath } from "next/cache";

import { removeFakePlanItem } from "@/shared/data";

export const deletePlanItemAction = (
  id: string,
  planId: string,
): { success: boolean; error?: string } => {
  removeFakePlanItem(id);
  revalidatePath(`/plan/${planId}`);
  return { success: true };
};

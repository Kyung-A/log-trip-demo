"use server";

import { revalidatePath } from "next/cache";

import { removeFakePlan } from "@/shared/data";

export const deletePlanAction = (id: string): { success: boolean } => {
  removeFakePlan(id);
  revalidatePath("/plan");
  return { success: true };
};

"use server";

import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

import { addFakePlan, DEMO_USER_ID } from "@/shared/data";

import { IPlanRegion } from "../types";

interface CreatePlanActionInput {
  region_names: IPlanRegion[];
  start_date: string;
  end_date: string;
}

export const createPlanAction = (
  input: CreatePlanActionInput,
): { success: boolean; id?: string; error?: string } => {
  const title =
    input.region_names.map((r) => r.region_name).join(", ") + " 여행";

  const id = uuidv4();

  addFakePlan({
    title: title,
    id,
    user_id: DEMO_USER_ID,
    ...input,
    created_at: new Date().toISOString(),
  });

  revalidatePath("/plan");

  return { success: true, id };
};

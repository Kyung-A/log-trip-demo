"use server";

import { redirect } from "next/navigation";

import { IPlanRegion } from "@/entities/plan";

interface CreatePlanActionInput {
  region_names: IPlanRegion[];
  start_date: string;
  end_date: string;
}

export const createPlanAction = async (
  input: CreatePlanActionInput,
): Promise<{ success: boolean; id?: string; error?: string }> => {
  redirect("/plan");
};

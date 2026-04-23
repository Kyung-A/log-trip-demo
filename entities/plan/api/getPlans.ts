"use server";

import { fakePlans } from "@/shared/data";

import { ITravelPlan } from "../types";

export const getPlans = async (): Promise<ITravelPlan[]> => {
  return fakePlans;
};

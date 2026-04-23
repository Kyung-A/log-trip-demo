"use server";

import { getPlanById } from "@/shared/data";
import { ITravelPlan } from "../types";

export const getPlan = async (id: string): Promise<ITravelPlan | null> => {
  return getPlanById(id);
};

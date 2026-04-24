import { v4 as uuidv4 } from "uuid";

import { addFakePlanItem } from "@/shared/data";

import { ICreatePlanItemInput, IPlanItem } from "../types";

export const createPlanItemAction = (
  input: ICreatePlanItemInput,
): { success: boolean; error?: string } => {
  const item: IPlanItem = {
    id: uuidv4(),
    ...input,
    created_at: new Date().toISOString(),
  };

  addFakePlanItem(item);

  return { success: true };
};

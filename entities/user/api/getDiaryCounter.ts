import { fakeDiaryCounters } from "@/shared/data";
import { IDiaryCounters } from "..";

export const getDiaryCounter = async (
  userId?: string | null,
): Promise<{ data: IDiaryCounters | null }> => {
  return { data: fakeDiaryCounters };
};

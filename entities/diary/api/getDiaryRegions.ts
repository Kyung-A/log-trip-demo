import { fakeDiaryRegions } from "@/shared/data";
import { IDiaryRegions } from "..";

export const getDiaryRegions = async (
  userId?: string | null,
): Promise<IDiaryRegions[]> => {
  return fakeDiaryRegions;
};

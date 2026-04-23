import { fakeDiaries } from "@/shared/data";
import { IDiary } from "..";

export const getDiaries = async (
  userId?: string,
  page: number = 1,
  limit: number = 10,
): Promise<IDiary[]> => {
  const from = (page - 1) * limit;
  const to = from + limit;
  return fakeDiaries.slice(from, to);
};

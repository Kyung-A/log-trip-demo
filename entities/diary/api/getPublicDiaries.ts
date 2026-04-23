import { getPublicFakeDiaries } from "@/shared/data";
import { IDiary } from "..";

export const getPublicDiaries = async (
  page: number = 1,
  limit: number = 10,
): Promise<IDiary[]> => {
  const all = getPublicFakeDiaries();
  const from = (page - 1) * limit;
  const to = from + limit;
  return all.slice(from, to);
};

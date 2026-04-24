import { getPublicFakeDiaries } from "@/shared/data";

import { IDiary } from "../types";

export const getPublicDiariesAction = (
  page: number = 1,
  limit: number = 10,
): IDiary[] => {
  const all = getPublicFakeDiaries();
  const from = (page - 1) * limit;
  const to = from + limit;
  return all.slice(from, to);
};

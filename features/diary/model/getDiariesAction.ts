"use server";

import { fakeDiaries } from "@/shared/data";

import { IDiary } from "../types";

export const getDiariesAction = (
  userId?: string,
  page: number = 1,
  limit: number = 10,
): IDiary[] => {
  const from = (page - 1) * limit;
  const to = from + limit;
  return fakeDiaries.slice(from, to);
};

"use server";

import { IDiary } from "@/entities/diary";

export const deleteDiaryAction = async (data: IDiary) => {
  return { success: true };
};

"use server";

import { revalidatePath } from "next/cache";

import { removeFakeDiary } from "@/shared/data";

import { IDiary } from "../types";

export const deleteDiaryAction = (data: IDiary) => {
  removeFakeDiary(data.id!);
  revalidatePath("/diary");
  return { success: true };
};

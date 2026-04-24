"use server";

import { revalidatePath } from "next/cache";

import { updateFakeDiaryPublic } from "@/shared/data";

export const toggleVisibilityAction = (
  id: string,
  state: boolean,
  _userId?: string,
) => {
  updateFakeDiaryPublic(id, state);
  revalidatePath("/diary");
  return { success: true };
};

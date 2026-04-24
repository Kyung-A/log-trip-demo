import { removeFakeDiary } from "@/shared/data";

import { IDiary } from "../types";

export const deleteDiaryAction = (data: IDiary) => {
  removeFakeDiary(data.id!);
  return { success: true };
};

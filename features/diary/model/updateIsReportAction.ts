"use server";

import { updateFakeDiaryReport } from "@/shared/data";

export const updateIsReportAction = (id: string, _userId: string) => {
  updateFakeDiaryReport(id);
  return { success: true };
};

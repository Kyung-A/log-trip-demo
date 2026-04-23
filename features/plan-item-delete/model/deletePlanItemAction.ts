"use server";

export const deletePlanItemAction = async (
  id: string,
  planId: string,
): Promise<{ success: boolean; error?: string }> => {
  return { success: true };
};

import { updateFakeDiaryPublic } from "@/shared/data";

export const toggleVisibilityAction = (
  id: string,
  state: boolean,
  _userId?: string,
) => {
  updateFakeDiaryPublic(id, state);
  return { success: true };
};

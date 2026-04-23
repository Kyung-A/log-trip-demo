import { fakeUser } from "@/shared/data";
import { IProfile } from "..";

export const getUserProfile = async (
  userId?: string,
): Promise<{ data: IProfile | null }> => {
  return { data: fakeUser };
};

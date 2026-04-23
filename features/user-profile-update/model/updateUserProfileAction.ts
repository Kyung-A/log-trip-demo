"use server";

import { IUpdateProfileData } from "@/entities/user";

export const updateUserProfileAction = async (data: IUpdateProfileData) => {
  return { success: true, result: null };
};

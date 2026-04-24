"use server";

import { updateFakeUserProfile } from "@/shared/data";

import { IUpdateProfileData } from "..";

export const updateUserProfileAction = async (data: IUpdateProfileData) => {
  const { userId: _userId, ...updateData } = data;
  updateFakeUserProfile(updateData);
  return { success: true, result: null };
};

"use server";

import { redirect } from "next/navigation";

import { IDiary } from "@/entities/diary";

export const createDiaryAction = async (data: IDiary) => {
  redirect("/diary");
};

import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { addFakeDiary, DEMO_USER_ID } from "@/shared/data";

import { IDiary } from "../types";

export const createDiaryAction = async (data: IDiary) => {
  const id = uuidv4();
  addFakeDiary({
    ...data,
    id,
    user_id: DEMO_USER_ID,
    user_info: {
      nickname: "여행자김로그",
      email: "demo@logtrip.com",
      profile_image: "",
      about: "여행을 통해 세상을 배우는 중입니다.",
    },
  });

  redirect("/diary");
};

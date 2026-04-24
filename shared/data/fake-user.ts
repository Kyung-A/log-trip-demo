import { IProfile } from "@/features/user";

export const DEMO_USER_ID = "demo-user-001";
export const DEMO_EMAIL = "demo@logtrip.com";
export const DEMO_PASSWORD = "demo1234";

export const fakeUser: IProfile = {
  id: DEMO_USER_ID,
  email: DEMO_EMAIL,
  nickname: "여행자김로그",
  about: "여행을 통해 세상을 배우는 중입니다.",
  profile_image: null,
  created_at: "2024-01-01T00:00:00.000Z",
};

import { IProfile, IDiaryCounters } from "@/features/user";

export const DEMO_USER_ID = "demo-user-001";
export const DEMO_EMAIL = "demo@logtrip.com";
export const DEMO_PASSWORD = "demo1234";

export const fakeUser: IProfile = {
  id: DEMO_USER_ID,
  email: DEMO_EMAIL,
  nickname: "여행자김로그",
  about:
    "여행을 통해 세상을 배우는 중입니다. 일본, 프랑스, 이탈리아를 다녀왔어요!",
  profile_image: null,
  gender: "female",
  year_of_birth: "1995",
  platform: "email",
  created_at: "2024-01-01T00:00:00.000Z",
};

export const fakeDiaryCounters: IDiaryCounters = {
  diaries_count: 7,
  public_diaries_count: 4,
  applied_count: 2,
  received_count: 1,
};

export const updateFakeUserProfile = (data: {
  nickname: string | null;
  about: string | null;
  profile_image: string | null;
}) => {
  if (data.nickname !== null) fakeUser.nickname = data.nickname;
  fakeUser.about = data.about;
  fakeUser.profile_image = data.profile_image;
};

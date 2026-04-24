export interface IProfile {
  id: string;
  created_at: string;
  about: string | null;
  profile_image: string | null;
  nickname: string;
  email: string;
}

export interface IDiaryCounters {
  diaries_count: number;
  public_diaries_count: number;
}

export interface IUpdateProfileData {
  userId?: string;
  profile_image: string | null;
  nickname: string | null;
  about: string | null;
}

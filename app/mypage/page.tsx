import { getDiaryCounter, getUserProfile } from "@/entities/user";

import { DEMO_USER_ID } from "@/shared/data/fake-user";

import { AccountSettings, UserProfileWidget } from "@/widgets/user-profile";

export default async function MyPage() {
  const { data: profile } = await getUserProfile(DEMO_USER_ID);
  const { data: counters } = await getDiaryCounter(DEMO_USER_ID);

  if (!profile && !counters) return null;

  return (
    <UserProfileWidget isMine profile={profile!} counters={counters!}>
      <AccountSettings />
    </UserProfileWidget>
  );
}

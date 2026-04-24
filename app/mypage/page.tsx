import { UserProfileWidget, AccountSettings } from "@/features/user";

import { fakeDiaryCounters, fakeUser } from "@/shared/data/fake-user";

export default async function MyPage() {
  const profile = fakeUser;
  const counters = fakeDiaryCounters;

  if (!profile && !counters) return null;

  return (
    <UserProfileWidget isMine profile={profile!} counters={counters!}>
      <AccountSettings />
    </UserProfileWidget>
  );
}

import { UserProfileWidget } from "@/features/user";

import { fakeUser, fakeDiaryCounters } from "@/shared/data/fake-user";

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  return <UserProfileWidget profile={fakeUser} counters={fakeDiaryCounters} />;
}

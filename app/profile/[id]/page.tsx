import { fakeUser, fakeDiaryCounters } from "@/shared/data/fake-user";

import { AuthLayout } from "@/widgets/auth";
import { UserProfileWidget } from "@/widgets/user-profile";

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AuthLayout>
      <UserProfileWidget profile={fakeUser} counters={fakeDiaryCounters} />;
    </AuthLayout>
  );
}

import { UserProfileForm } from "@/features/user";

import { DEMO_USER_ID, fakeUser } from "@/shared/data/fake-user";

export default async function ProfileUpdate() {
  const profile = fakeUser;

  return <UserProfileForm profile={profile!} userId={DEMO_USER_ID} />;
}

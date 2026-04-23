import { getUserProfile } from "@/entities/user";

import { UserProfileForm } from "@/features/user-profile-update";

import { DEMO_USER_ID } from "@/shared/data/fake-user";

import { AuthLayout } from "@/widgets/auth";

export default async function ProfileUpdate() {
  const { data: profile } = await getUserProfile(DEMO_USER_ID);

  return (
    <AuthLayout>
      <UserProfileForm profile={profile!} userId={DEMO_USER_ID} />;
    </AuthLayout>
  );
}

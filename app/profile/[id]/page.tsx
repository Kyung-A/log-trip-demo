"use client";

import { useDiary } from "@/features/diary";
import { UserProfileWidget, useUser } from "@/features/user";

export default function UserProfile() {
  const { user } = useUser();
  const { diariesCount, publicDiariesCount } = useDiary();

  return (
    <UserProfileWidget
      profile={user}
      counters={{
        diaries_count: diariesCount,
        public_diaries_count: publicDiariesCount,
      }}
    />
  );
}

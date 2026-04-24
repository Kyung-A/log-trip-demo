"use client";

import { useDiary } from "@/features/diary";
import { AccountSettings, UserProfileWidget, useUser } from "@/features/user";

export default function MyPage() {
  const { user } = useUser();
  const { diariesCount, publicDiariesCount } = useDiary();

  return (
    <UserProfileWidget
      isMine
      profile={user}
      counters={{
        diaries_count: diariesCount,
        public_diaries_count: publicDiariesCount,
      }}
    >
      <AccountSettings />
    </UserProfileWidget>
  );
}

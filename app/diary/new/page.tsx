import { getRegions } from "@/entities/region";

import { DiaryForm } from "@/features/diary-create";

import { DEMO_USER_ID } from "@/shared/data/fake-user";
import { AuthLayout } from "@/widgets/auth";

export default async function CreateDiary() {
  const regions = await getRegions();

  return (
    <AuthLayout>
      <DiaryForm userId={DEMO_USER_ID} regions={regions} />
    </AuthLayout>
  );
}

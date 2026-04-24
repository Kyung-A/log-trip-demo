import { DiaryForm } from "@/features/diary";
import { getRegions } from "@/features/region";

import { DEMO_USER_ID } from "@/shared/data";

export default async function CreateDiary() {
  const regions = await getRegions();

  return <DiaryForm userId={DEMO_USER_ID} regions={regions} />;
}

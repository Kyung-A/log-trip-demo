import { redirect } from "next/navigation";

import { getDemoUser } from "@/shared/lib/demoAuth";

export default async function Home() {
  const user = await getDemoUser();
  if (user) redirect("/world-map");
  redirect("/login");
}

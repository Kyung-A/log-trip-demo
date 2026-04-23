"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { fakeUser, DEMO_EMAIL, DEMO_PASSWORD } from "@/shared/data/fake-user";

const COOKIE_NAME = "demo-session";

export async function getDemoUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  if (!session) return null;
  return fakeUser;
}

export async function loginAction(email: string, password: string) {
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, "1", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    redirect("/world-map");
  }
  return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/login");
}

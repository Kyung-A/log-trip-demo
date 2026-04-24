"use client";

import { usePathname } from "next/navigation";

import { TabBar } from "./TabBar";

const HIDE_TABBAR_PATHS = ["/login", "/plan/new", "/diary/new"];

export function TabBarWrapper() {
  const pathname = usePathname();
  const hide = HIDE_TABBAR_PATHS.some((p) => pathname.startsWith(p));
  if (hide) return null;
  return <TabBar />;
}

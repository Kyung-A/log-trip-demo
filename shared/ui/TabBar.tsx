"use client";

import { useState } from "react";

import {
  Briefcase,
  CalendarDays,
  Map,
  PenSquare,
  Plus,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const TABS = [
  { href: "/world-map", label: "세계지도", icon: Map },
  { href: "/diary", label: "여행", icon: Briefcase },
  { href: null, label: "", icon: PenSquare }, // 가운데 작성 버튼
  { href: "/plan", label: "일정", icon: CalendarDays },
  { href: "/mypage", label: "마이페이지", icon: User },
];

export function TabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showWriteMenu, setShowWriteMenu] = useState(false);

  const isActive = (href: string | null) => {
    if (!href) return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      {showWriteMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setShowWriteMenu(false)}
        />
      )}

      {showWriteMenu && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-y-2 items-center bg-[#d5b2a7] rounded-lg">
          <button
            onClick={() => {
              setShowWriteMenu(false);
              router.push("/plan/new");
            }}
            className="px-6 py-3 text-white font-semibold"
          >
            동행 모집
          </button>
          <button
            onClick={() => {
              setShowWriteMenu(false);
              router.push("/diary/new");
            }}
            className="pb-3 px-6 text-white font-semibold"
          >
            일기 쓰기
          </button>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto flex items-center px-3.5">
          {TABS.map((tab, i) => {
            if (tab.href === null) {
              return (
                <button
                  key={i}
                  onClick={() => setShowWriteMenu((prev) => !prev)}
                  className="flex-1 flex flex-col items-center justify-center py-2"
                >
                  <div className="w-11 h-11 absolute -top-3 rounded-full bg-[#d5b2a7] flex items-center justify-center">
                    <Plus size={30} color="#fff" />
                  </div>
                </button>
              );
            }

            const active = isActive(tab.href);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex-1 flex flex-col items-center justify-center py-2 gap-y-0.5"
              >
                <Icon
                  size={20}
                  color={active ? "#a38f86" : "#A9A9A9"}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                <span
                  className="text-xs"
                  style={{ color: active ? "#a38f86" : "#A9A9A9" }}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

"use client";
import { useMemo, useState } from "react";

import { DiaryList, useDiary } from "@/features/diary";
import { EmptyView } from "@/shared";

export default function Diary() {
  const [currentTab, setCurrentTab] = useState<"diary" | "community">("diary");
  const { data, setData } = useDiary();

  const displayedDiaries = useMemo(() => {
    if (currentTab === "community") {
      return data.filter((d) => d.is_public && !d.is_report);
    }
    return data;
  }, [data, currentTab]);

  return (
    <>
      <header className="px-4 pb-4 pt-14 sticky top-0 z-30 bg-white">
        <h1 className="text-3xl font-semibold">여행</h1>
        <nav className="mt-2 flex items-center gap-x-2">
          <button
            onClick={() => setCurrentTab("diary")}
            className={`px-4 rounded-full py-0.5 text-base cursor-pointer border ${
              currentTab === "diary"
                ? "bg-[#e9dcd9] border-[#e9dcd9] text-latte font-semibold"
                : "text-zinc-500 border-zinc-300"
            }`}
          >
            일기
          </button>
          <button
            onClick={() => setCurrentTab("community")}
            className={`px-4 rounded-full py-0.5 text-base cursor-pointer border ${
              currentTab === "community"
                ? "bg-[#e9dcd9] border-[#e9dcd9] text-latte font-semibold"
                : "text-zinc-500 border-zinc-300"
            }`}
          >
            커뮤니티
          </button>
        </nav>
      </header>

      {displayedDiaries.length === 0 ? (
        <EmptyView
          message={
            currentTab === "community"
              ? "공개된 일기가 없습니다\n가장 먼저 내 일기를 공개 해보세요!"
              : "작성된 일기가 없습니다"
          }
        />
      ) : (
        <DiaryList
          data={displayedDiaries}
          setData={setData}
          currentTab={currentTab}
          isNotFeed={currentTab === "diary" ? true : false}
        />
      )}
    </>
  );
}

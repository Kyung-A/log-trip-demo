"use client";

import { useState } from "react"; // useState 추가

import dayjs from "dayjs";

import { PlanList, usePlan } from "@/features/plan";
import { ITravelPlan } from "@/features/plan";

type TabType = "all" | "ing" | "early" | "end";

const TAB_LABELS: Record<TabType, string> = {
  all: "전체",
  ing: "진행중인 여행",
  early: "예정",
  end: "지난 여행",
};

const filterPlans = (plans: ITravelPlan[], tab: TabType) => {
  const today = dayjs().startOf("day");
  return plans.filter((plan) => {
    const start = dayjs(plan.start_date);
    const end = dayjs(plan.end_date);
    if (tab === "ing") return start.isBefore(today) && end.isAfter(today);
    if (tab === "early") return start.isAfter(today);
    if (tab === "end") return end.isBefore(today);
    return true;
  });
};

export default function PlanPage() {
  const { plans } = usePlan();
  const [currentTab, setCurrentTab] = useState<TabType>("all");

  const filtered = filterPlans(plans, currentTab);

  return (
    <div className="bg-beige min-h-screen w-full overflow-hidden">
      <header className="px-4 pb-4 pt-14 sticky top-0 z-30 bg-white">
        <h1 className="text-3xl font-semibold">여행 일정</h1>

        <nav className="flex mt-2 items-center gap-x-2 flex-nowrap overflow-x-auto">
          {(Object.keys(TAB_LABELS) as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`px-4 rounded-full py-0.5 text-base cursor-pointer border shrink-0 transition-colors ${
                currentTab === tab
                  ? "bg-[#e9dcd9] border-[#e9dcd9] text-latte font-semibold"
                  : "text-zinc-500 border-zinc-300 hover:border-zinc-400"
              }`}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </nav>
      </header>

      <PlanList plans={filtered} />
    </div>
  );
}

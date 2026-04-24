"use client";

import { Dispatch, SetStateAction, useCallback } from "react";

import { toast } from "react-toastify";

import { DiaryItem } from "./DiaryItem";
import { IDiary } from "../../types";

export const DiaryList = ({
  data,
  setData,
  currentTab,
  isNotFeed,
}: {
  data: IDiary[];
  setData: Dispatch<SetStateAction<IDiary[]>>;
  currentTab: string;
  isNotFeed: boolean;
}) => {
  const handleReportDiary = useCallback(
    async (id: string) => {
      if (!confirm("정말 신고하시겠습니까?")) return;

      setData((prev) =>
        prev.map((v) => (v.id === id ? { ...v, is_report: true } : v)),
      );
      toast.success("신고 처리 되었습니다.");
    },
    [setData],
  );

  const handleDeleteDiary = useCallback(
    async (item: IDiary) => {
      if (!confirm("정말 삭제하시겠습니까?")) return;
      setData((prev) => prev.filter((d) => d.id !== item.id));
    },
    [setData],
  );

  const handleIsPublicDiaryChange = useCallback(
    async (id: string, state: boolean) => {
      setData((prev) =>
        prev.map((v) => (v.id === id ? { ...v, is_public: state } : v)),
      );
    },
    [setData],
  );

  return (
    <ul className="w-full min-h-dvh pb-20 bg-zinc-100">
      {data.map((item) => (
        <DiaryItem
          key={`${currentTab}-${item.id}`}
          item={item}
          handleReportDiary={handleReportDiary}
          handleDeleteDiary={handleDeleteDiary}
          handleIsPublicDiaryChange={handleIsPublicDiaryChange}
          isNotFeed={isNotFeed}
        />
      ))}
    </ul>
  );
};

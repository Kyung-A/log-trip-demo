"use client";

import {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { useSessionStorage } from "@/shared";
import { fakeDiaries, DEMO_USER_ID } from "@/shared/data";

import { IDiary } from "../types";

interface DiaryContextType {
  data: IDiary[];
  setData: Dispatch<SetStateAction<IDiary[]>>;
  diariesCount: number;
  publicDiariesCount: number;
}

const DiaryContext = createContext<DiaryContextType | null>(null);

export const DiaryProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useSessionStorage("diary", fakeDiaries);

  const diariesCount = data.filter((d) => d.user_id === DEMO_USER_ID).length;
  const publicDiariesCount = data.filter(
    (d) => d.user_id === DEMO_USER_ID && d.is_public,
  ).length;

  return (
    <DiaryContext.Provider
      value={{ data, setData, diariesCount, publicDiariesCount }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error("useDiary must be used within a DiaryProvider");
  }
  return context;
};

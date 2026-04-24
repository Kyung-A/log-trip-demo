"use client";

import {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { useSessionStorage } from "@/shared";
import { fakeDiaries } from "@/shared/data";

import { IDiary } from "../types";

interface DiaryContextType {
  data: IDiary[];
  setData: Dispatch<SetStateAction<IDiary[]>>;
}

const DiaryContext = createContext<DiaryContextType | null>(null);

export const DiaryProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useSessionStorage("diary", fakeDiaries);

  return (
    <DiaryContext.Provider value={{ data, setData }}>
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

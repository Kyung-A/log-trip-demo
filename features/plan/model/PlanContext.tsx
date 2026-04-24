"use client";

import {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { ITravelPlan } from "@/features/plan";
import { IPlanItem } from "@/features/plan-item";
import { useSessionStorage } from "@/shared";
import { fakePlanItems, fakePlans } from "@/shared/data";

interface PlanContextType {
  plans: ITravelPlan[];
  setPlans: Dispatch<SetStateAction<ITravelPlan[]>>;
  planItems: IPlanItem[];
  setPlanItems: Dispatch<SetStateAction<IPlanItem[]>>;
}

const PlanContext = createContext<PlanContextType | null>(null);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plans, setPlans] = useSessionStorage("plans", fakePlans);
  const [planItems, setPlanItems] = useSessionStorage(
    "plan-items",
    fakePlanItems,
  );

  return (
    <PlanContext.Provider value={{ plans, setPlans, planItems, setPlanItems }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider");
  return context;
};

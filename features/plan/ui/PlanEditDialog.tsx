"use client";

import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";

import { IRegion } from "@/features/region";

import { usePlan } from "../model";
import { ITravelPlan } from "../types";
import { CitySelectList } from "./CitySelectList";
import { PlanStep2 } from "./PlanStep2";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface EditFormValues {
  cities: IRegion[];
  dateRange: DateRange;
}

interface PlanEditDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  plan: ITravelPlan;
  regions: IRegion[] | null;
}

export const PlanEditDialog = ({
  isOpen,
  setIsOpen,
  plan,
  regions,
}: PlanEditDialogProps) => {
  const [editStep, setEditStep] = useState<1 | 2>(1);
  const { setPlans } = usePlan();

  const { watch, setValue, handleSubmit, formState, reset } =
    useForm<EditFormValues>({
      defaultValues: {
        cities:
          regions?.filter((r) =>
            plan.region_names.some((rn) => rn.region_name === r.region_name),
          ) ?? [],
        dateRange: {
          start: new Date(plan.start_date),
          end: new Date(plan.end_date),
        },
      },
    });

  const cities = watch("cities");
  const dateRange = watch("dateRange");

  useEffect(() => {
    if (isOpen) {
      reset({
        cities:
          regions?.filter((r) =>
            plan.region_names.some((rn) => rn.region_name === r.region_name),
          ) ?? [],
        dateRange: {
          start: new Date(plan.start_date),
          end: new Date(plan.end_date),
        },
      });
      setEditStep(1);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data: EditFormValues) => {
    if (!data.dateRange.start || !data.dateRange.end) return;

    const regionNames = data.cities.map((c) => ({
      id: c.id,
      region_name: c.region_name,
    }));

    setPlans((prev) =>
      prev.map((p) =>
        p.id === plan.id
          ? {
              ...p,
              title: regionNames.map((r) => r.region_name).join(", ") + " 여행",
              region_names: regionNames,
              start_date: dayjs(data.dateRange.start).format("YYYY-MM-DD"),
              end_date: dayjs(data.dateRange.end).format("YYYY-MM-DD"),
            }
          : p,
      ),
    );

    handleClose();
  };

  if (!isOpen) return null;

  return (
    <dialog
      open={isOpen}
      className="fixed inset-0 z-50 w-full h-full bg-white max-w-3xl mx-auto flex flex-col"
    >
      <header className="flex items-center justify-between px-4 pb-2 pt-14 border-b border-zinc-200 shrink-0">
        <button
          type="button"
          onClick={handleClose}
          className="flex items-center gap-x-1"
        >
          <ChevronLeft size={22} color="#646464" />
          <span className="text-lg">뒤로</span>
        </button>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <div className="flex-1 overflow-y-auto">
          {editStep === 1 ? (
            <CitySelectList
              value={cities}
              onChange={(val) => setValue("cities", val)}
              options={regions}
            />
          ) : (
            <PlanStep2
              value={dateRange}
              onChange={(val) => setValue("dateRange", val)}
            />
          )}
        </div>

        <div className="px-4 pb-16 pt-3 flex gap-x-2 shrink-0 border-t border-zinc-100">
          {editStep === 1 ? (
            <button
              type="button"
              disabled={cities.length === 0}
              onClick={() => setEditStep(2)}
              className="flex-1 bg-latte text-white font-semibold py-3 rounded-lg disabled:bg-zinc-200 disabled:text-zinc-400"
            >
              다음
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setEditStep(1)}
                className="flex-1 border border-zinc-300 text-zinc-600 font-semibold py-3 rounded-lg"
              >
                이전
              </button>
              <button
                type="submit"
                disabled={
                  !dateRange.start || !dateRange.end || formState.isSubmitting
                }
                className="flex-1 bg-latte text-white font-semibold py-3 rounded-lg disabled:bg-zinc-200 disabled:text-zinc-400"
              >
                {formState.isSubmitting ? "수정 중..." : "완료"}
              </button>
            </>
          )}
        </div>
      </form>
    </dialog>
  );
};

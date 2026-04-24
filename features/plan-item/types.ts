export interface IPlanItem {
  id: string;
  plan_id: string;
  day_number: number;
  title: string;
  place?: string | null;
  time: string; // "HH:mm"
  memo?: string | null;
  created_at: string;
}

export interface ICreatePlanItemInput {
  plan_id: string;
  day_number: number;
  title: string;
  place?: string | null;
  time: string;
  memo?: string | null;
}

export interface IUpdatePlanItemInput {
  title?: string;
  place?: string | null;
  time?: string;
  memo?: string | null;
}

export interface IPlanRegion {
  id: string;
  region_name: string;
}

export interface ITravelPlan {
  id: string;
  user_id: string;
  title: string;
  region_names: IPlanRegion[];
  start_date: string; // "YYYY-MM-DD"
  end_date: string;
  created_at: string;
}

export interface ICreatePlanInput {
  title: string;
  region_names: IPlanRegion[];
  start_date: string;
  end_date: string;
}

export interface IUpdatePlanInput {
  title?: string;
  region_names?: IPlanRegion[];
  start_date?: string;
  end_date?: string;
}

import { ITravelPlan } from "@/features/plan";
import { IPlanItem } from "@/features/plan-item";

import { DEMO_USER_ID } from "./fake-user";

export const fakePlans: ITravelPlan[] = [
  {
    id: "plan-001",
    user_id: DEMO_USER_ID,
    title: "봄 도쿄 여행",
    region_names: [{ id: "r1", region_name: "도쿄" }],
    start_date: "2025-03-25",
    end_date: "2025-03-30",
    created_at: "2025-01-10T00:00:00.000Z",
  },
  {
    id: "plan-002",
    user_id: DEMO_USER_ID,
    title: "유럽 배낭여행",
    region_names: [
      { id: "r2", region_name: "파리" },
      { id: "r3", region_name: "밀라노" },
      { id: "r4", region_name: "마드리드" },
    ],
    start_date: "2025-06-10",
    end_date: "2025-06-25",
    created_at: "2025-02-20T00:00:00.000Z",
  },
  {
    id: "plan-003",
    user_id: DEMO_USER_ID,
    title: "동남아 휴양 여행",
    region_names: [
      { id: "r5", region_name: "방콕" },
      { id: "r6", region_name: "치앙마이" },
    ],
    start_date: "2025-08-20",
    end_date: "2025-08-28",
    created_at: "2025-05-01T00:00:00.000Z",
  },
  {
    id: "plan-004",
    user_id: DEMO_USER_ID,
    title: "가을 일본 단풍 여행",
    region_names: [
      { id: "r7", region_name: "교토" },
      { id: "r8", region_name: "오사카" },
      { id: "r9", region_name: "나라" },
    ],
    start_date: "2025-11-05",
    end_date: "2025-11-12",
    created_at: "2025-07-15T00:00:00.000Z",
  },
];

export const fakePlanItems: IPlanItem[] = [
  // plan-001: 봄 도쿄 여행
  {
    id: "item-001",
    plan_id: "plan-001",
    day_number: 1,
    title: "하네다 공항 도착, 숙소 체크인",
    place: "하네다 공항",
    time: "14:00",
    memo: "도쿄 모노레일 이용",
    created_at: "2025-01-10T01:00:00.000Z",
  },
  {
    id: "item-002",
    plan_id: "plan-001",
    day_number: 1,
    title: "시부야 거리 산책",
    place: "시부야",
    time: "18:00",
    memo: null,
    created_at: "2025-01-10T02:00:00.000Z",
  },
  {
    id: "item-003",
    plan_id: "plan-001",
    day_number: 2,
    title: "우에노 공원 벚꽃 구경",
    place: "우에노 공원",
    time: "10:00",
    memo: "도시락 준비해서 피크닉",
    created_at: "2025-01-10T03:00:00.000Z",
  },
  {
    id: "item-004",
    plan_id: "plan-001",
    day_number: 2,
    title: "아사쿠사 센소지",
    place: "아사쿠사",
    time: "14:00",
    memo: null,
    created_at: "2025-01-10T04:00:00.000Z",
  },
  {
    id: "item-005",
    plan_id: "plan-001",
    day_number: 3,
    title: "하라주쿠 다케시타 거리",
    place: "하라주쿠",
    time: "11:00",
    memo: null,
    created_at: "2025-01-10T05:00:00.000Z",
  },
  // plan-002: 유럽 배낭여행
  {
    id: "item-006",
    plan_id: "plan-002",
    day_number: 1,
    title: "파리 도착, 에펠탑 야경 감상",
    place: "에펠탑",
    time: "20:00",
    memo: "사전 예매 필수",
    created_at: "2025-02-20T01:00:00.000Z",
  },
  {
    id: "item-007",
    plan_id: "plan-002",
    day_number: 2,
    title: "루브르 박물관",
    place: "루브르 박물관",
    time: "09:00",
    memo: "오디오 가이드 대여",
    created_at: "2025-02-20T02:00:00.000Z",
  },
  {
    id: "item-008",
    plan_id: "plan-002",
    day_number: 6,
    title: "두오모 성당",
    place: "밀라노 두오모",
    time: "10:00",
    memo: "옥상 투어 예약",
    created_at: "2025-02-20T03:00:00.000Z",
  },
  // plan-003: 동남아 휴양
  {
    id: "item-009",
    plan_id: "plan-003",
    day_number: 1,
    title: "방콕 도착, 왓 포 방문",
    place: "왓 포",
    time: "15:00",
    memo: null,
    created_at: "2025-05-01T01:00:00.000Z",
  },
  {
    id: "item-010",
    plan_id: "plan-003",
    day_number: 2,
    title: "카오산 로드 나이트마켓",
    place: "카오산 로드",
    time: "19:00",
    memo: "팟타이, 망고 스무디 필수",
    created_at: "2025-05-01T02:00:00.000Z",
  },
];

export const getPlanById = (id: string) =>
  fakePlans.find((p) => p.id === id) ?? null;

export const getPlanItemById = (id: string) =>
  fakePlanItems.find((item) => item.id === id) ?? null;

export const getPlanItemsByPlanId = (planId: string) =>
  fakePlanItems.filter((item) => item.plan_id === planId);

export const addFakePlan = (plan: ITravelPlan) => {
  fakePlans.push(plan);
};

export const removeFakePlan = (id: string) => {
  const idx = fakePlans.findIndex((p) => p.id === id);
  if (idx !== -1) fakePlans.splice(idx, 1);
  fakePlanItems.splice(
    0,
    fakePlanItems.length,
    ...fakePlanItems.filter((item) => item.plan_id !== id),
  );
};

export const updateFakePlanById = (id: string, input: Partial<ITravelPlan>) => {
  const plan = fakePlans.find((p) => p.id === id);
  if (plan) Object.assign(plan, input);
};

export const addFakePlanItem = (item: IPlanItem) => {
  fakePlanItems.push(item);
};

export const removeFakePlanItem = (id: string) => {
  const idx = fakePlanItems.findIndex((item) => item.id === id);
  if (idx !== -1) fakePlanItems.splice(idx, 1);
};

export const updateFakePlanItemById = (
  id: string,
  input: Partial<IPlanItem>,
) => {
  const item = fakePlanItems.find((i) => i.id === id);
  if (item) Object.assign(item, input);
};

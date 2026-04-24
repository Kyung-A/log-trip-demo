import { IDiary } from "@/features/diary";

import { DEMO_USER_ID } from "./fake-user";

const demoUserInfo = {
  nickname: "여행자김로그",
  email: "demo@logtrip.com",
  profile_image: "",
  about: "여행을 통해 세상을 배우는 중입니다.",
};

export const fakeDiaries: IDiary[] = [
  {
    id: "diary-001",
    user_id: DEMO_USER_ID,
    user_info: demoUserInfo,
    title: "베이징, 역사 속으로의 시간 여행",
    text_content:
      "자금성의 거대한 규모에 압도당했다. 붉은 벽과 황금색 지붕이 끝없이 이어지는 풍경은 정말 장관이었다. 만리장성까지 올라가 보았는데, 가파른 계단이 힘들었지만 정상에서 내려다본 풍경은 평생 잊지 못할 것 같다. 저녁에 먹은 베이징 덕은 껍질이 아주 바삭해서 일품이었다.",
    drawing_content: null,
    is_drawing: false,
    travel_date: new Date("2024-03-28"),
    diary_images: [
      {
        id: "diary-001-img-01",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      },
      {
        id: "diary-001-img-02",
        url: "https://images.unsplash.com/photo-1776111463661-70ba4bb6d246?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    diary_regions: [
      {
        region_name: "베이징시",
        shape_name: "Beijing Municipality",
        region_code: "CN-001",
        country_code: "CN",
        country_name: "중국",
      },
    ],
    is_public: false,
    is_report: false,
  },
  {
    id: "diary-002",
    user_id: DEMO_USER_ID,
    user_info: demoUserInfo,
    title: "강원도의 푸른 바다와 산",
    text_content:
      "강원도의 동해 바다는 언제 봐도 가슴이 뚫린다. 속초 중앙시장에서 닭강정을 사 들고 해변을 걸었다. 설악산 케이블카를 타고 정상에서 내려다본 단풍과 바다의 조화는 말로 표현하기 힘들 정도로 아름다웠다. 강원도만의 여유로움이 정말 좋다.",
    drawing_content: null,
    is_drawing: false,
    travel_date: new Date("2024-06-12"),
    diary_images: [],
    diary_regions: [
      {
        region_name: "강원특별자치도",
        shape_name: "Gangwon",
        region_code: "KR-42",
        country_code: "KR",
        country_name: "대한민국",
      },
    ],
    is_public: false,
    is_report: false,
  },
  {
    id: "diary-003",
    user_id: DEMO_USER_ID,
    user_info: demoUserInfo,
    title: "제주의 돌과 바람, 그리고 바다",
    text_content:
      "제주도는 갈 때마다 새로운 매력을 준다. 올레길을 걷다 만난 돌담길이 참 정겹다. 애월의 카페에서 멍하니 바다를 바라보며 마신 한라봉 에이드가 정말 맛있었다. 해 질 무렵 금오름에서 본 노을은 내 여행 중 가장 완벽한 풍경이었다.",
    drawing_content: null,
    is_drawing: false,
    travel_date: new Date("2024-06-16"),
    diary_images: [],
    diary_regions: [
      {
        region_name: "제주시",
        shape_name: "Jeju-si",
        region_code: "KR-39-110",
        country_code: "KR",
        country_name: "대한민국",
      },
    ],
    is_public: false,
    is_report: false,
  },
  {
    id: "diary-004",
    user_id: DEMO_USER_ID,
    user_info: demoUserInfo,
    title: null,
    text_content: null,
    drawing_content:
      "https://royrraqcazneifejftrk.supabase.co/storage/v1/object/public/log-trip-images/diary-images/9c122663-c226-4513-8a3a-b1aeeefa04a8/1bf11bcd-04e4-487c-9ccd-33fbd93e6941.jpg",
    is_drawing: true,
    travel_date: new Date("2024-06-21"),
    diary_images: [],
    diary_regions: [
      {
        region_name: "후쿠오카현",
        shape_name: null,
        region_code: "JP-40",
        country_code: "JP",
        country_name: "일본",
      },
    ],
    is_public: false,
    is_report: false,
  },
  {
    id: "diary-005",
    user_id: DEMO_USER_ID,
    user_info: demoUserInfo,
    title: "블라디보스토크, 유럽을 닮은 항구 도시",
    text_content:
      "한국에서 가장 가까운 유럽, 블라디보스토크에 왔다. 독수리 전망대에서 내려다본 금각교의 야경은 로맨틱 그 자체였다. 신선한 킹크랩을 배불리 먹고, 아르바트 거리를 걸으며 버스킹 공연을 구경했다. 이국적인 건물들과 항구 도시 특유의 분위기에 흠뻑 취해 시간을 보냈다.",
    drawing_content: null,
    is_drawing: false,
    travel_date: new Date("2024-09-03"),
    diary_images: [],
    diary_regions: [
      {
        region_name: "블라디보스토크",
        shape_name: null,
        region_code: "RU-PRI",
        country_code: "RU",
        country_name: "러시아",
      },
    ],
    is_public: false,
    is_report: false,
  },
  {
    id: "diary-006",
    user_id: DEMO_USER_ID,
    user_info: demoUserInfo,
    title: "교토의 금각사, 황금빛 가을",
    text_content:
      "교토의 금각사를 단풍이 물드는 계절에 찾았다. 연못에 비친 황금빛 사원의 모습이 너무 아름다워 한동안 그 자리를 떠날 수 없었다. 기온 거리를 걷다 게이샤를 마주쳤는데, 짧은 순간이었지만 마치 시간 여행을 한 것 같은 느낌이었다.",
    drawing_content: null,
    is_drawing: false,
    travel_date: new Date("2024-11-08"),
    diary_images: [],
    diary_regions: [
      {
        region_code: "JP-26",
        region_name: "교토부",
        shape_name: "Kyoto",
        country_code: "JP",
        country_name: "일본",
      },
    ],
    is_public: true,
    is_report: false,
  },
];

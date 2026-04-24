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
    title: "도쿄의 봄, 벚꽃과 함께한 3일",
    text_content:
      "우에노 공원의 벚꽃이 만개했다. 분홍빛 꽃잎이 바람에 흩날리는 걸 보며 온몸으로 봄을 느꼈다. 시부야의 교차로에서 인파에 섞여 걷고, 아사쿠사의 센소지에서 소원을 빌었다. 라멘 한 그릇에 하루의 피로가 싹 날아갔다.",
    drawing_content: null,
    is_drawing: false,
    travel_date: new Date("2024-03-28"),
    diary_images: [],
    diary_regions: [
      {
        region_code: "JP-13",
        region_name: "도쿄도",
        shape_name: "Tokyo",
        country_code: "JP",
        country_name: "일본",
      },
    ],
    is_public: false,
    is_report: false,
  },
  {
    id: "diary-002",
    user_id: DEMO_USER_ID,
    user_info: demoUserInfo,
    title: "파리의 에펠탑 아래서",
    text_content:
      "파리에 도착한 첫날, 무거운 캐리어를 끌고 에펠탑으로 향했다. 저녁 불빛에 빛나는 에펠탑은 사진에서 보던 것보다 훨씬 웅장했다. 센 강변을 따라 걸으며 크레이프를 먹었다. 달고 부드러운 맛이 여행의 피로를 잊게 해줬다.",
    drawing_content: null,
    is_drawing: false,
    travel_date: new Date("2024-06-12"),
    diary_images: [],
    diary_regions: [
      {
        region_code: "FR-IDF",
        region_name: "일 드 프랑스",
        shape_name: "Île-de-France",
        country_code: "FR",
        country_name: "프랑스",
      },
    ],
    is_public: false,
    is_report: false,
  },
  {
    id: "diary-003",
    user_id: DEMO_USER_ID,
    user_info: demoUserInfo,
    title: "밀라노 두오모 성당, 압도적인 아름다움",
    text_content:
      "밀라노 두오모 성당 앞에 서는 순간 말문이 막혔다. 수백 년에 걸쳐 완성된 고딕 양식의 웅장함이 온몸으로 느껴졌다. 옥상에 올라가 도시 전체를 내려다보는 뷰가 정말 환상적이었다. 아페롤 스프리츠 한 잔과 함께 황금빛 저녁을 보냈다.",
    drawing_content: null,
    is_drawing: false,
    travel_date: new Date("2024-06-16"),
    diary_images: [],
    diary_regions: [
      {
        region_code: "IT-MI",
        region_name: "밀라노",
        shape_name: "Milan",
        country_code: "IT",
        country_name: "이탈리아",
      },
    ],
    is_public: false,
    is_report: false,
  },
  {
    id: "diary-004",
    user_id: DEMO_USER_ID,
    user_info: demoUserInfo,
    title: "마드리드, 프라도 미술관의 하루",
    text_content:
      "프라도 미술관에서 고야와 벨라스케스의 작품 앞에 몇 시간이나 서 있었다. 역사책에서만 보던 그림들을 실제로 마주하는 감동은 이루 말할 수 없었다. 그란 비아 거리를 따라 걸으며 타파스와 상그리아로 저녁을 채웠다.",
    drawing_content: null,
    is_drawing: false,
    travel_date: new Date("2024-06-21"),
    diary_images: [],
    diary_regions: [
      {
        region_code: "ES-MD",
        region_name: "마드리드",
        shape_name: "Madrid",
        country_code: "ES",
        country_name: "스페인",
      },
    ],
    is_public: false,
    is_report: false,
  },
  {
    id: "diary-005",
    user_id: DEMO_USER_ID,
    user_info: demoUserInfo,
    title: "방콕 왓 포의 와불과 카오산 로드의 밤",
    text_content:
      "왓 포의 거대한 와불 앞에 서니 그 크기에 압도됐다. 황금빛으로 빛나는 불상의 미소가 마음을 평온하게 만들었다. 저녁에는 카오산 로드로 나가 팟타이를 먹고 망고 스무디를 마셨다. 세계 각지의 여행자들과 어울리며 즉흥적인 파티를 즐겼다.",
    drawing_content: null,
    is_drawing: false,
    travel_date: new Date("2024-09-03"),
    diary_images: [],
    diary_regions: [
      {
        region_code: "TH-10",
        region_name: "방콕",
        shape_name: "Bangkok",
        country_code: "TH",
        country_name: "태국",
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
  {
    id: "diary-007",
    user_id: DEMO_USER_ID,
    user_info: demoUserInfo,
    title: "오사카 도톤보리, 음식의 천국",
    text_content:
      "오사카는 그야말로 먹부림의 도시였다. 도톤보리에서 타코야키, 오코노미야키, 구시카츠를 차례로 먹었다. 배가 너무 불러 걷기도 힘들었지만 그래도 멈출 수 없었다. 글리코 간판 앞에서 사진을 찍고, 밤늦게까지 돌아다녔다.",
    drawing_content: null,
    is_drawing: false,
    travel_date: new Date("2024-11-10"),
    diary_images: [],
    diary_regions: [
      {
        region_code: "JP-27",
        region_name: "오사카부",
        shape_name: "Osaka",
        country_code: "JP",
        country_name: "일본",
      },
    ],
    is_public: false,
    is_report: false,
  },
];

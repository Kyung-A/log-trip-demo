export {};

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
    forceRefreshMap?: () => void;
    forceRefreshList?: () => void;
    showWebAlert?: (msg: string) => void;
  }

  // Server Action과 Server Component가 모듈 인스턴스를 다르게 가질 수 있어
  // global 싱글턴으로 fake 데이터를 공유한다
  var __fakeDiaries: import("@/entities/diary").IDiary[] | undefined;
  var __fakePlans: import("@/entities/plan").ITravelPlan[] | undefined;
  var __fakePlanItems: import("@/entities/plan").IPlanItem[] | undefined;
  var __fakeUser: import("@/entities/user").IProfile | undefined;
}

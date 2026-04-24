# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 주요 명령어

```bash
npm run dev          # 개발 서버 시작
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 실행
```

---

## 절대 규칙 — 데모 모드

> **Supabase DB 호출, 외부 스토리지 업로드, 서버 액션을 새로 추가하거나 복원해서는 안 된다.**
> **모든 CRUD는 세션 스토리지에 저장된 전역 Context 상태를 직접 변경한다.**

---

## 1. 상태 관리 — Context + Session Storage

전역 데이터는 모두 `useSessionStorage` 훅을 통해 세션 스토리지에 저장되며, Context로 앱 전체에 공급된다.

| Context | 파일 | 세션 키 | 초기값 |
|---|---|---|---|
| `UserProvider` / `useUser` | `features/user/model/UserContext.tsx` | `"user"` | `fakeUser` |
| `PlanProvider` / `usePlan` | `features/plan/model/PlanContext.tsx` | `"plans"`, `"plan-items"` | `fakePlans`, `fakePlanItems` |
| `DiaryProvider` / `useDiary` | `features/diary/model/DiaryContext.tsx` | `"diary"` | `fakeDiaries` |

### 규칙

- 새로운 도메인 데이터가 필요하면 반드시 동일한 패턴으로 Context를 만든다.
- `app/layout.tsx`에 Provider를 추가해 전역에서 접근 가능하게 한다.
- Context에서 파생되는 집계값(예: `diariesCount`, `publicDiariesCount`)은 setter 없이 Context 내부에서 `data`를 기반으로 직접 계산해 제공한다.
- **서버 액션(`"use server"`)은 사용하지 않는다.**

---

## 2. CRUD 구현 패턴

모든 CRUD는 Context의 setter(`setUser`, `setPlans`, `setPlanItems`, `setData`)를 직접 호출한다.

```ts
// Create
setItems((prev) => [{ id: uuidv4(), ...newItem }, ...prev]);

// Update
setItems((prev) =>
  prev.map((item) => (item.id === targetId ? { ...item, ...changes } : item)),
);

// Delete — 반드시 삭제 대상 item.id 하나만 제거, 다른 항목 보존
setItems((prev) => prev.filter((item) => item.id !== targetId));
```

> **Delete 주의**: `filter` 조건에 `plan_id` 등 추가 조건을 AND로 묶으면 다른 플랜/도메인의 데이터가 함께 제거된다. 삭제는 항상 고유 ID 하나로만 필터링한다.

---

## 3. 가짜 데이터 (`shared/data/fake-*.ts`)

- **역할**: Context의 세션 스토리지 초기값(seed)으로만 사용한다.
- **ID**: 페이크 데이터의 ID는 실제 DB와 매핑이 필요한 경우(예: region_names) 실제 ID값으로 맞춰야 한다.
- **뮤테이션 헬퍼 금지**: `updateFake*`, `addFake*`, `removeFake*` 같은 인메모리 직접 변경 헬퍼는 만들지 않는다. 상태 변경은 Context setter로만 한다.

```
shared/data/
  fake-user.ts       // fakeUser (IProfile 초기값)
  fake-diaries.ts    // fakeDiaries (IDiary[] 초기값)
  fake-plans.ts      // fakePlans, fakePlanItems 초기값
```

---

## 4. 이미지 처리

- 이미지 업로드는 외부 스토리지를 사용하지 않는다.
- 선택한 파일은 `URL.createObjectURL`로 blob URL을 만들어 미리보기에 사용한다.
- **저장 시**: `blobUrlToBase64` (`shared/lib/blobUrlToBase64.ts`)로 data URL로 변환해 세션 스토리지에 그대로 저장·표시한다.
- `shared/api/storage/` 함수들은 no-op 스텁이므로 호출하지 않는다.

```ts
// 올바른 이미지 저장 패턴
let imageUrl: string | null = currentImg;
if (currentImg?.startsWith("blob:")) {
  imageUrl = await blobUrlToBase64(currentImg);
}
```

---

## 5. 사용자 인증

- 세션·쿠키 기반 인증 없음.
- 로그인(`app/login/email/page.tsx`)에서 입력값을 `DEMO_EMAIL` / `DEMO_PASSWORD`(`shared/data/fake-user.ts`)와 클라이언트 측에서 단순 비교한다.
- 일치하면 `/world-map`으로 이동. 새로고침 시 `/login`으로 리다이렉트.
- 로그아웃은 `/login`으로 이동만 수행.
- 사용자 프로필 수정은 `useUser()`의 `setUser`로 처리하며, 관련 일기의 `user_info`도 함께 동기화한다.

---

## 6. 렌더링 — 클라이언트 컴포넌트 원칙

세션 스토리지는 브라우저 전용이므로 Context를 사용하는 모든 컴포넌트와 페이지는 반드시 클라이언트 컴포넌트여야 한다.

- Context hook(`useUser`, `usePlan`, `useDiary`)을 사용하는 컴포넌트·페이지 파일 상단에 `"use client"` 선언 필수.
- `app/` 하위 page.tsx도 Context를 사용하면 `"use client"`를 붙인다.
- 서버 컴포넌트에서 가짜 데이터를 직접 import해 props로 내려주는 패턴은 사용하지 않는다(세션 스토리지 변경이 반영되지 않음).

---

## 7. 파일 구조 컨벤션

```
features/
  {domain}/
    model/
      {Domain}Context.tsx   // Context + Provider + useXxx hook
      index.ts              // model exports
    ui/
      ...                   // 컴포넌트
      index.ts
    types.ts
    index.ts                // 전체 re-export

shared/
  data/
    fake-*.ts               // 세션 스토리지 초기값(seed)
    index.ts
  hooks/
    useSessionStorage.ts    // 세션 스토리지 동기화 훅
  lib/
    blobUrlToBase64.ts      // 이미지 변환 유틸

app/
  layout.tsx                // 모든 Provider 등록
  {page}/
    page.tsx                // "use client" + Context hook 사용
```

---

## 8. 예외 — 실제 API 호출 허용 목록

아래 두 API만 실제 외부 호출을 유지한다. 그 외 외부 호출은 추가하지 않는다.

- `features/region/api/getRegions.ts` — `adm_regions` 테이블 조회
- `features/region/api/getGeoJson.ts` — 외부 GeoJSON API

---

## 9. 동적 라우트 컴포넌트 주의사항

같은 동적 라우트 패턴(`/plan/[id]`) 사이를 이동할 때 Next.js는 컴포넌트를 재사용(리마운트 없음)한다. 플랜이 바뀔 때 로컬 state를 초기화하려면 `key={id}` prop을 명시한다.

```tsx
// app/plan/[id]/page.tsx
<PlanDetailClient key={plan.id} plan={plan} regions={regions} />
```

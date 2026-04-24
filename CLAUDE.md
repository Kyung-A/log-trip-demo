# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 주요 명령어

```bash
npm run dev          # 개발 서버 시작
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 실행
```

## 데모 모드 — 절대 규칙

> **이 저장소의 모든 CRUD는 반드시 `shared/data/fake-*.ts`의 인메모리 데이터를 직접 변경해야 한다. Supabase DB 호출, 외부 스토리지 업로드, 외부 API 호출을 새로 추가하거나 복원해서는 안 된다.**

- **가짜 데이터**: `shared/data/fake-*.ts` — 일기·계획·사용자 픽스처 및 뮤테이션 헬퍼
  - Create → 헬퍼(`addFake*`)로 배열에 push, `uuid`로 ID 생성
  - Update → 헬퍼(`updateFake*`)로 배열 내 항목을 `Object.assign`
  - Delete → 헬퍼(`removeFake*`)로 배열에서 splice
- **이미지**: 업로드 없이 blob URL → data URL(`blobUrlToBase64`) 변환 후 그대로 저장·표시한다. `shared/api/storage/` 함수들은 no-op 스텁이며 Supabase 스토리지를 호출하지 않는다.
- **예외**: `entities/region/api/getRegions.ts`(`adm_regions` 조회)와 `entities/region/api/getGeoJson.ts`(외부 GeoJSON API)는 실제 호출을 유지한다.
- **데모 인증**: 세션·쿠키 없음. 로그인 폼(`app/login/email/page.tsx`)에서 `DEMO_EMAIL`/`DEMO_PASSWORD`(`shared/data/fake-user.ts`)와 클라이언트 측으로 비교 후 일치하면 `/world-map`으로 이동. 새로고침 시 `/login`으로 리다이렉트되어 재로그인 필요. 로그아웃은 `/login`으로 이동만 수행.
- `shared/lib/supabase/` 코드는 존재하지만 데모 모드에서는 사용하지 않는다.

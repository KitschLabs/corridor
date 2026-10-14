# Corridor 로컬 개발

현재 범위는 인증 없는 Navigation·레이아웃 프리뷰다. 샘플 데이터는 모두 허구이며,
코드의 조직·본인 필터는 UI 동작 확인용이다. 실제 보안 경계는 후속 Supabase RLS로 구현한다.

## 실행

Node.js 24와 Bun 1.3.9에서 작업했다. 패키지 버전은 `package.json`과 `bun.lock`을 따른다.

```sh
bun install --frozen-lockfile
bun run dev
```

개발 서버: `http://127.0.0.1:3000`. 포트 변경: `bun run dev --port 3100`.
설치·실행에 Supabase/Vercel 환경변수는 필요하지 않다.

## 검증

```sh
bun run lint
bun run typecheck
bun run build
bunx playwright install chromium
bun run test
```

Playwright는 3100 포트의 로컬 개발 서버를 시작하거나 기존 서버를 재사용한다.
탭 이동, 상세·뒤로가기, ko/en, 필터 조합·초기화, 조직별 검색, 관심 항목 상세,
개인 화면, 작성 프리뷰, 360px 레이아웃을 검사한다.
스크린샷은 무시되는 `test-results/`에 저장한다.

설치된 Microsoft Edge를 사용할 때는 PowerShell에서
`$env:PLAYWRIGHT_CHANNEL = "msedge"`를 설정한 뒤 `bun run test`를 실행할 수 있다.
이 경우 Chromium 별도 다운로드가 필요하지 않다.

2026-10-14 검증: lint·typecheck·production build 통과, Microsoft Edge에서
Playwright 6개 테스트 통과. 데스크톱 1440px와 모바일 360px 스크린샷을 확인했다.
실제 인증·DB·Storage 권한 테스트는 해당 기능이 아직 없어 실행하지 않았다.

## 코드 경계

| 위치 | 책임 |
| --- | --- |
| `src/app/(workspace)/` | 네 탭과 업무 상세 경로 |
| `src/components/workspace/shell.tsx` | 공통 Navigation, 검색, 조직·언어 전환, 설정 |
| `src/components/workspace/` | 탭별 레이아웃, 공통 표시·모달 |
| `src/components/ui/button.tsx` | shadcn/ui 버튼 |
| `src/lib/demo-data.ts` | 허구 fixture, 샘플 조직·검색 필터 |
| `src/lib/messages.ts` | 한국어·영어 UI 문구 |
| `src/app/workspace.css` | 브랜드 토큰, 레이아웃, 반응형 스타일 |

`bun.lock`은 생성된 의존성 데이터이며 1,000줄 제한에 맞춰 불필요한 빈 줄만 제거했다.
의존성을 변경한 후 같은 기준을 확인한다. `bun install --frozen-lockfile` 재현 설치를 검증했다.

실제 로그인·DB 조회, 노트 저장·공유, 댓글 등록, Markdown 변환·멘션 자동완성,
에이전트 수집·분석은 아직 연결하지 않았다. 작성 모달은 입력을 저장하지 않는다고 표시한다.
전역 검색은 샘플 데이터만 검색하며 새로고침하면 조직·언어 선택은 초기화된다.
My Workstreams는 업무별 최신 변경과 필요한 경우 본인의 마지막 변경을 함께 표시한다.

후속 기능은 [MVP 계획](plan/mvp.md)에 따라 연결한다. 프리뷰에서 표시되는 입력·
설정 컨트롤을 운영 권한 검증으로 간주하지 않는다.

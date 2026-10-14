# Corridor

Workstream management for early-stage AI-native teams.

> Share what matters, not everything you do.

Corridor는 3–15명 규모의 초기 스타트업이 개인의 기록과 팀의 방향을 연결하는
협업 공간입니다. 로켓이 안전한 비행을 위해 따라야 하는 회랑에서 이름을 따왔습니다.
개인의 생각과 실험은 비공개로 남기고, 팀에 필요한 진전·발견·장애물·결정만 공유합니다.

## 제품 경험

| 공간 | 할 수 있는 일 |
| --- | --- |
| Mission Control | Goal 카드, PIC별 Workstream 행, 목표별 Attention Needed, Workstream별 최근 변경 최대 2개 타임라인 |
| Live Feed | 팀 Changes 최신순 피드, 산출물 링크, 샘플 실시간 재생 |
| My Work | 참여 업무와 최신·내 마지막 변경, 비공개 노트, 개인 활동 수집 영역 |
| Workstreams | 목표·PIC·참여자·상태 필터, Context·Current State·Timeline·Discussion |
| Team Focus | 팀 Mission, 현재 목표, 목표별 Workstream 탐색 |

모든 탭은 모든 역할에 동일하게 제공됩니다. 역할에 따라 탭을 구분하거나 숨기지 않습니다.
팀 데이터는 조직 구성원 모두가 조회하고 개인 데이터는 본인만 접근합니다.
Global Search, 조직 전환, 프로필·설정은 모든 탭에서 접근할 수 있습니다.

Workstream은 팀이 추진하는 주요 업무 흐름입니다. 제목과 PIC 한 명만 필수이며,
목표 연결은 선택입니다. 작은 작업마다 티켓을 만들거나 진행률을 입력할 필요가 없습니다.

개인 노트는 Owner/Admin을 포함한 다른 팀원이 볼 수 없습니다. Workstream 연결이나
멘션으로 공개되지 않습니다. 공유할 부분과 이미지를 선택하고 내용을 검토한 뒤,
별도의 팀 업데이트로 발행합니다. 원본 노트는 계속 비공개로 유지됩니다.

## MVP 범위

- Google OAuth와 Email Magic Link 로그인, 팀 생성, 만료형 초대 링크, 여러 조직 전환.
- 개인 Markdown 노트와 이미지, 자동 저장, 목록·검색, 선택적 팀 공유.
- Mission, 단일 레벨 목표, Workstream, 네 가지 업데이트 유형, 평면 댓글.
- 사용자·Workstream 멘션, 공통 검색·업무 필터, 데스크톱·모바일 대응.
- 한국어·영어 UI 동시 제공. 사용자가 작성한 본문은 자동 번역하지 않습니다.

PIC는 Workstream마다 정확히 한 명입니다. Owner/Admin/PIC가 Workstream을 관리하며,
모든 팀원은 Workstream을 만들고 업데이트·댓글을 작성할 수 있습니다.
팀을 떠난 뒤에도 개인 노트와 이미지는 작성자에게 남고 팀 연결은 해제됩니다.

Task 티켓, Kanban, Sprint, 복잡한 OKR, 실시간 채팅, 멘션·업무 알림,
자동 요약, AI 관리자, MCP 서버, 외부 서비스 연동, 개인 성과 분석은 MVP 범위 밖입니다.
로그인용 Magic Link 이메일은 업무 알림 제외 범위에 포함되지 않습니다.

## 기술 구성

| 영역 | 선택 |
| --- | --- |
| 애플리케이션·배포 | Next.js App Router, TypeScript, Vercel |
| 인증·데이터·이미지 | Supabase Auth, PostgreSQL, Storage, RLS |
| UI | Tailwind CSS, shadcn/ui |
| 콘텐츠 | Tiptap 편집기, Markdown 원문 저장, react-markdown 렌더링 |
| 검증 | Zod, Vitest, Playwright, DB·Storage 권한 테스트 |

별도 API 서버를 두지 않습니다. Next.js의 서버 경계와 PostgreSQL RLS에서 권한을
검증합니다. 개인·팀 이미지 저장소는 모두 비공개입니다.

## 브랜드

로켓 발사 이미지의 분위기를 유지한 Corridor Black `#080F15`, Deep Sky Blue `#1769B3`,
Ignition Red `#D63F32`를 사용합니다. 파랑은 주요 행동, 붉은색은 강조,
전체 UI는 검정 배경과 밝은 글자의 다크 테마로 제공합니다. 두 색의 그라디언트와 상세 사용 기준은
[브랜드 가이드](docs/brand.md)에 있습니다.

## 문서

| 문서 | 용도 |
| --- | --- |
| [제품 명세](docs/product.md) | 사용자 흐름, 화면, 기능별 완료 조건 |
| [아키텍처·데이터 설계](docs/architecture.md) | 데이터 모델, 권한, 저장·공유 계약 |
| [MVP 구현 계획](docs/plan/mvp.md) | 개발 순서, 산출물, 검증·완료 기준 |
| [브랜드 가이드](docs/brand.md) | 팔레트·그라디언트, 사용·접근성 기준 |
| [결정 기록](docs/decisions.md) | 확정 사항, 구현 제안, 미결정 사항 |

## 로컬 레이아웃 프리뷰

```sh
bun install --frozen-lockfile
bun run dev
```

[로컬 프리뷰](http://127.0.0.1:3000)에서 네 탭, Workstream 상세, 검색·필터,
조직 선택과 ko/en 전환을 확인할 수 있습니다. 예시 데이터만 사용하며 환경변수는 필요하지 않습니다.
작성 화면은 저장·공유하지 않는 프리뷰입니다. 인증·DB·Markdown 편집기·에이전트 수집은
후속 구현 범위이며, 프리뷰를 실제 개인 데이터 저장소로 사용하지 않습니다.
자동 수집 영역은 연결 전 빈 상태로, 주의 항목은 팀 차원의 병목·업무 조율을 위한 수동 등록 예시로 표시합니다.

검증 명령과 구현 경계는 [개발 안내](docs/development.md)를 참고하세요.

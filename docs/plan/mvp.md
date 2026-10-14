# Corridor MVP 구현 계획

상태: Navigation·탭 레이아웃 프리뷰 구현, 기능 MVP는 후속. 기준일: 2026-10-14 (Asia/Seoul).
Next.js 앱 셸과 샘플 데이터 화면이 있다. 인증·DB·배포는 아직 없다. 이 문서는 [제품 명세](../product.md)와
[아키텍처 계약](../architecture.md)을 실행 단위로 나눈다.
확정과 제안은 [결정 기록](../decisions.md)을 따른다.

각 단계에서 ko/en·권한·실패 경로를 함께 완성한다. 검증을 마지막 단계로 미루지 않는다.
개발 공수·출시 날짜는 담당 인원과 운영 환경이 정해진 뒤 산정한다.

## 현재 구현 — Navigation·레이아웃

- 공통 Navigation: WORKSPACE에 My Work / Live Feed / Workstreams, 바로 다음 TEAM에 Mission Control / Team Focus. 역할별 숨김 없음.
- Live Feed: 현재 조직의 Changes를 최신순으로 통합한다. 작성자·유형·시각·연결 Workstream과 상세 보기를 제공한다.
  현재는 샘플 최신 5개를 4초마다 추가하는 재생 프리뷰이며 일시정지·재개·다시 재생을 지원한다.
  실제 실시간 수신은 인증된 조직별 서버 구독 연결 후 구현한다. 개인 노트·비공개 활동은 피드에 포함하지 않는다.
- Changes 산출물: GitHub PR, Google Drive 문서·편집본, Instagram 릴스 링크를 행 우측 아이콘과 상세 화면에 표시한다.
  현재 링크는 example.com의 명시적 더미 URL이며 실제 내부 자료나 업로드를 가리키지 않는다. 새 탭으로 열린다.
- Changes와 개인 노트 시간은 브라우저 현지 시간 기준으로 오늘 `n분 전`/`n시간 전`, 어제 `어제 HH:mm`,
  이전 `YYYY.MM.DD HH:mm`으로 표시한다. 1분 미만은 `방금`, 미래 시각은 날짜·시간을 표시하고 30초마다 갱신한다.
- Mission Control: Goal 카드·Workstream별 PIC·참여자 프로필, Goal별 Attention·Workstreams 필터. 업무별 이름·한 줄 소개와 최근 변경 최대 2개 타임라인. 선택 해제 지원.
- My Work: 본인 PIC/참여 업무, 업무별 최신·내 마지막 변경, 본인 노트, Captured Activities 빈 상태.
- Workstreams: Goal/PIC/참여자/상태 필터와 상세의 Context·Current State·Timeline·Discussion.
- Team Focus: Mission, 현재 목표, 연결 업무. 모든 탭에 검색·조직 전환·프로필 설정.

프리뷰는 샘플 데이터로 탐색하고 작성 UI만 미리 볼 수 있다. 입력 저장·인증·실제 접근 제어·
자동 활동 수집을 구현했다고 표시하지 않는다. 검증과 실행 방법은 [개발 안내](../development.md)에 기록한다.
기존 Phase 0의 editor·권한 검증과 아래 기능 개발은 계속 필요하다.

## Phase 0 — 기술 위험 확인·기반 결정

먼저 가장 데이터 손실 위험이 큰 Markdown 왕복과 권한 경계를 확인한다.

| 작업 | 산출물 | 통과 기준 |
| --- | --- | --- |
| 런타임·도구 선택 | 고정 Node·Next.js·패키지 관리자·lockfile | 실제 설치·빌드 확인, 명령 문서화 |
| editor spike | 최소 Tiptap+Markdown+renderer 샘플과 fixture | 원문의 모든 서식·멘션·image UUID가 의미를 보존 |
| 참조 파서 검증 | editor custom token과 renderer AST 처리 | 코드·이스케이프·잘못된 UUID·한/영 라벨 오인 없음 |
| 운영 대상 확인 | 개발·Preview·Production 대상과 redirect 기록 | 프로젝트·리전·비용·원격 변경 범위 확정 |
| 권한 상세 확인 | entity별 정책과 수명주기 | 초대·Owner·탈퇴·초안 정책의 미결정 확인 |

Tiptap spike가 실패하면 정규식이나 HTML/JSON 이중 원본으로 우회하지 않는다.
깨지는 예제와 대안을 제시하고 편집 경험/도구 변경을 사용자와 결정한다.

**완료 조건:** 콘텐츠 보존 가능성을 입증하고 Foundation에 필요한 환경·도구가 정해진다.

## Phase 1 — 앱 셸·인증·조직

| 작업 | 구현 단위 | 검증 |
| --- | --- | --- |
| scaffold | 구현된 App Router, TypeScript, Tailwind, shadcn 버튼, ko/en, 브랜드 토큰 기반 확장 | lint·타입·빌드, 360px·desktop 셸 |
| Supabase client | server/browser 분리, 쿠키·검증·세션 갱신 | 새로고침·만료·로그아웃·무효 세션 |
| 로그인 | Google, Magic Link, callback, 안전한 return path | 성공·실패·만료, open redirect 차단 |
| profile·조직 생성 | profile, organizations, members + 생성 트랜잭션 | 실패 시 반쪽 조직 없음, Owner 확보 |
| 초대·조직 전환 | invites, 발급/취소/수락, 멤버 목록·전환 | 만료·취소·중복 수락·조직 A/B 격리 |
| 권한·탈퇴 | 역할·제거·소유권 이전 기본안 | 자기 권한 상승·마지막 Owner 제거 차단 |

초대 토큰을 URL 로그·analytics에 넣지 않는다. UI 버튼 유무로 권한을 검증하지 않는다.
읽기뿐 아니라 직접 DB/API 쓰기 정책도 이 단계에서 검증한다.

**완료 조건:** 두 사용자가 팀을 만들고 가입하고, 한 사용자가 두 팀을 안전하게 전환한다.

## Phase 2 — 개인 Markdown 노트·이미지

| 작업 | 구현 단위 | 검증 |
| --- | --- | --- |
| 노트 CRUD·검색 | notes table, My Work, editor, 소유자 RLS | Owner/Admin도 타인 노트 조회·수정 불가 |
| 저장 상태 | debounce·직렬 요청·revision CAS | 연속 입력·응답 지연·두 탭 충돌·오류 복구 |
| 개인 이미지 | attachments, private bucket, 검증·업로드·삽입 | 10MiB 경계·MIME 위장·비인증·타인 접근 |
| 이미지 표시·삭제 | attachment UUID 해석·임시 URL·정리 | 만료 갱신, 저장 실패 전에 object 미삭제 |
| 개인 보존 | 탈퇴 시 관계 해제·팀 미연결 목록 | 본문·이미지 유지, 팀 데이터 새 조회 불가 |

Workstream 연동은 Phase 3까지 비활성으로 두되 임의 샘플 업무를 운영 DB에 만들지 않는다.
phase 간 임시 UI 상태는 앱 내부에서 명확히 표현한다.

**완료 조건:** 작성자가 노트·이미지를 다시 열고 검색·편집할 수 있으며
다른 팀원과 관리자에게 노출되지 않는다. 실패한 저장은 저장됨으로 표시하지 않는다.

## Phase 3 — Team Focus·Workstreams

| 작업 | 구현 단위 | 검증 |
| --- | --- | --- |
| Mission·목표 | focus route, goal 편집·정렬·완료·보관 | 역할별 수정 제한, 목표 단일 레벨 |
| Workstream | 목록·4종 필터·Context·Current State·Timeline·Discussion, 생성·보관 | 제목/PIC만 필수, 진행률 필드 없음 |
| 팀/개인 요약 | Mission Control의 전체 업무와 My Work의 참여 업무, 업무별 최신·본인 마지막 변경 | 역할별 탭 동일, 개인·팀 데이터 격리 |
| PIC·참여자 | 같은 조직의 구성원, 권한·복합 FK | 다른 조직 연결 차단, PIC 정확히 한 명 |
| 목표·노트 연결 | 선택 goal/workstream 관계 | 연결해도 개인 노트 비공개 |
| 탈퇴·제거 보강 | PIC 재지정, 참여·개인 연결 정리 | 담당 남은 제거 차단, 처리 원자성 |

**완료 조건:** Mission→목표→Workstream으로 방향을 이해하고,
PIC가 현재 상황·다음 방향을 관리한다. 모든 팀원은 Workstream을 생성할 수 있다.

## Phase 4 — 업데이트·댓글·Activity

| 작업 | 구현 단위 | 검증 |
| --- | --- | --- |
| 업데이트 | 네 유형, 제목·본문, 직접 발행·작성자 수정 | 기본 progress, draft의 팀 조회 차단 |
| 댓글 | 업무/업데이트 중 하나, 평면 CRUD | XOR·동일 조직·작성자/관리자 삭제 권한 |
| 팀 이미지 | team bucket, 대상별 업로드·읽기·정리 | 비멤버·탈퇴자·잘못된 대상 접근 차단 |
| Recent Changes·Timeline | 업데이트+댓글 조회, cursor, 작성자·업무·유형 필터 | Mission Control·업무 상세에 같은 조회 계약 적용 |
| Attention Needed | 수동 팀 신호: 업무 간 병목·업무 분담·의사결정·위험, 영향·근거·관련 업무와 해결 처리 | 개별 업데이트 유형만으로 노출하지 않음; 다중 Goal 연결·조직 격리; 할당 수만으로 과부하 판정 금지 |
| Global Search | 업무·발행 업데이트·목표·본인 노트 검색 | 다른 조직·타인 노트·초안 유출 차단 |
| 프로필 | 멘션 대상의 팀 프로필 | 같은 팀 최소 정보만, 임의 사용자 조회 차단 |

**완료 조건:** 팀원 두 명이 진전·발견·장애물·결정을 공유하고 댓글로 논의한다.
개인 노트·draft·자동 저장은 Activity에 나타나지 않는다.

## Phase 5 — 멘션·선택 공유

| 작업 | 구현 단위 | 검증 |
| --- | --- | --- |
| 자동완성 | `@` 사용자 / `#` 업무, 키보드·모바일 | 같은 조직만, Markdown 제목 입력과 구분 |
| 참조 렌더링 | UUID 해석·최신 라벨·내부 이동 | 이름 변경·대상 보관/탈퇴·권한 없음·코드 구문 |
| 선택 공유 UI | selection→편집→이미지 선택→발행 확인 | 선택 밖 본문·이미지 자동 포함 없음 |
| 발행 orchestration | draft·request ID·이미지 복사·원자 publish | 복사 중 실패·DB 실패·중복 클릭·권한 변경 |
| 취소·정리 | 초안/복사 object 정리와 원본 분리 | 타인·원본·이미 발행된 object 미삭제 |

멘션 parsing은 Phase 0의 계약을 확장하고 별도 관계 테이블은 만들지 않는다.
실패 시 공유 초안을 팀에 부분적으로 보여주는 방식은 허용하지 않는다.

**완료 조건:** 개인 기록에서 필요한 부분과 이미지만 정확히 한 번 발행되고
원본·초안·개인 object 경로는 팀원에게 노출되지 않는다.

## Phase 6 — 전체 흐름 검증·사용 파일럿·배포

기능 완료와 배포 승인 사이에 아래 기준을 확인한다.

| 검증 축 | 필요한 증거 |
| --- | --- |
| DB 권한 | 비인증·타 조직·같은 팀·Owner/Admin·작성자·PIC별 직접 요청 결과 |
| Storage | 두 private bucket, forged attachment, pending/draft, 탈퇴·삭제·URL 만료 |
| 콘텐츠 | Markdown round-trip fixture, HTML·scheme·잘못된 참조·한/영 입력 |
| 데이터 보존 | 충돌·네트워크 실패·중복 발행·이미지 복사 중 실패·멤버 제거 |
| 제품 E2E | 로그인→초대→My Work→업무→선택 공유→댓글→Mission Control→조직 전환 |
| Navigation | 모든 역할의 동일 탭, 접근 가능한 데이터만 검색·표시, 비연동 수집 빈 상태 |
| 언어·기기 | ko/en 정상·빈·오류 화면, desktop/360px, 키보드·터치 |
| 운영 | 환경 격리·redirect·로그 비밀 제거·업로드 제한·복구 계획·승인된 비용 |

Vitest는 파서·직렬화·입력 검증·저장 상태·공유 실패 로직을 검증한다.
로컬 DB 통합 테스트는 실제 RLS·CHECK·FK를 사용자 JWT별로 실행한다.
Playwright는 두 사용자·두 조직으로 사용자 흐름을 확인한다.
Storage를 포함한 로컬 통합 테스트와 승인된 Preview smoke를 구분한다.
실제 팀 파일럿은 타인의 개인 노트를 운영자에게 제출하는 방식으로 검증하지 않는다.

**완료 조건:** [제품 완료 시나리오](../product.md#제품-완료-시나리오)를 모두 통과하고,
운영 대상·베타 제한·배포 의도가 확정된 뒤 승인된 PR/배포 흐름으로 출시한다.
실제 검증하지 않은 항목은 통과로 표시하지 않는다.

## 개발 순서·체크포인트

```text
editor/reference spike
  → auth + organizations + invite + isolation
  → private notes + image + save protection
  → focus + workstreams + PIC + leave contract
  → updates + comments + activity + team image
  → mentions + selected share + failure recovery
  → end-to-end + team pilot + approved deployment
```

각 phase는 하나의 큰 PR 대신 목적별 작은 PR로 나눈다. CI에 실제로 구성된
lint·타입·unit·DB·E2E·빌드 명령만 문서화하고 관련 검사를 수행한다.
새 non-trivial logic에는 실패를 잡는 최소 검증을 남긴다.
공통 코드·예제·fixture를 포함해 모든 파일이 1,000줄 미만인지 확인한다.

## v0.3 대비 구체화

| 원문에서 비어 있거나 충돌한 부분 | 이번 계획 |
| --- | --- |
| 팀 가입·다중 조직·언어 미정 | 사용자 답변으로 초대 링크·다중 조직·ko/en 확정 |
| 테이블 10개 | 초대 수명주기를 위해 11개; 나머지는 기존 엔티티 보강 |
| 개인 노트의 조직 FK 필수 | 탈퇴 뒤 보존 요구에 맞춰 nullable + 개인 공간 제공 |
| 이미지 URL 영구 저장 위험 | attachment UUID 저장, 권한 확인 후 임시 표시 |
| 자동 저장·공유 실패 미정 | revision 충돌·실패 표시·비공개 draft·중복 발행 방지 |
| Activity의 댓글 유무 불일치 | 원문 기능 목록을 따라 업데이트와 댓글 모두 포함 |
| 단계 6에 보안 테스트 집중 | 각 단계부터 RLS·Storage·콘텐츠·실패 테스트 포함 |

추가 티켓·AI·알림·통합 시스템은 만들지 않는다. 운영 예산·도메인·계정 삭제 등은
[미결정 목록](../decisions.md#구현출시-전-미결정)에서 관리한다.

Captured Activities와 자동 Attention Needed는 UI 영역·공개 범위만 준비한다.
실제 에이전트 연결·자동 분석·추적은 별도 후속 작업이며 초기 MVP의 완료 조건에 포함하지 않는다.

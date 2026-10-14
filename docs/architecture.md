# Corridor 아키텍처·데이터 설계

원문 v0.3의 스택·10개 핵심 엔티티를 유지한다. 초대 링크 요구사항으로
`organization_invites`를 추가해 애플리케이션 테이블은 11개를 계획한다.
이 문서는 구현 계약이며 실행 가능한 스키마·검증된 마이그레이션이 아니다.
제품 흐름은 [제품 명세](product.md), 승인 상태는 [결정 기록](decisions.md)을 따른다.

## 경계와 코드 구성

```text
Browser: editor / ko-en UI / temporary unsaved content
  → Next.js: authenticated reads, validated mutations, upload/share handlers
    → Supabase Auth + PostgreSQL RLS + private Storage
```

Server Components는 조회·초기 렌더링, Client Components는 편집·자동완성·업로드를 맡는다.
일반 데이터 변경은 사용자 세션이 있는 Supabase client를 사용하는 Server Actions로,
파일 바이트 검증·공유 이미지 복사는 Route Handlers로 처리하는 기본안이다.
별도 Express/Nest 서버나 범용 service/repository 계층을 추가하지 않는다.

초기 레이아웃은 `src/app/` 경로와 `src/components/workspace/` 공통 셸·화면,
`src/lib/demo-data.ts` 샘플 데이터로 구성한다. 이후 `src/components/editor/` 공통 편집·렌더링,
`src/features/{notes,organizations,focus,workstreams,activity}/` 도메인 로직,
`src/lib/supabase/` 브라우저·서버 client를 추가한다. UI 문구는 `src/lib/messages.ts`의 ko/en 사전,
`tests/` 검증. 파일은 책임별로 나누고 각각 최대 999줄로 유지한다.

SSR에는 쿠키 기반 client와 세션 갱신 경계가 필요하다. 인증은 검증된 claims/user로
확인하고 읽어온 session 값만 신뢰하지 않는다. 정확한 파일·API는 고정한 Next.js 버전에
맞춘다. [Supabase SSR 가이드](https://supabase.com/docs/guides/auth/server-side/nextjs)

사용자별 응답·쿠키 응답·서명된 이미지 URL은 공용 캐시에 저장하지 않는다.
publishable key는 공개 client용이며 관리자 secret/service-role key는 서버 전용이다.
일반 CRUD에 관리자 키를 사용하지 않는다. 원격 프로젝트·권한·리전은 연결 전에 확인한다.

## 데이터 모델

모든 ID는 UUID, 시간은 `timestamptz`와 UTC를 사용한다.
원문의 Markdown 필드·상태 집합·작성자 필드는 그대로 유지하며 아래는 보강 사항이다.
작성자·조직·대상 ID는 생성 후 임의로 바꿀 수 없도록 DB에서도 제한한다.

| 테이블 | 핵심 계약·보강 |
| --- | --- |
| `profiles` | `auth.users`와 1:1, 표시 이름·아바타; 제안: UI locale ko/en 추가 |
| `organizations` | 이름·설명·Mission; 생성과 첫 Owner 등록은 원자적 처리 |
| `organization_members` | `(organization_id,user_id)` unique, 역할 CHECK; Owner 한 명 제안 |
| `organization_invites` | 조직·발급자·token_hash·만료·취소 시각; 원문 외 추가 |
| `team_goals` | 조직·제목·설명·성공 기준·상태·정렬·선택 목표일 |
| `workstreams` | 조직·선택 목표·필수 PIC·상태·설명·현재 상황·다음 방향 |
| `workstream_members` | 조직 ID 보강, 동일 조직 구성원과 업무를 연결; PIC 중복 행 불필요 |
| `workstream_updates` | 조직 ID 보강; 유형 기본 progress; 제안: draft/published·published_at·publish_request_id |
| `comments` | 두 대상 중 하나, 같은 조직·작성자, 본문 필수 |
| `personal_notes` | 작성자·선택 조직·선택 Workstream·본문; 제안: revision, 조직 nullable |
| `attachments` | 업로더·선택 조직·대상 유형/ID·bucket/path·MIME/size; 제안: pending/ready |

초대 토큰 원문·서명 URL·HTML 변환본·Tiptap JSON을 DB의 콘텐츠 원본으로 저장하지 않는다.
개인 노트 공유 출처를 팀 업데이트에 공개하지 않는다. 별도 activity·mentions 테이블은 없다.

### 조직 경계·참조 무결성

- Workstream의 PIC는 `(organization_id,pic_id)`로 현재 멤버를 참조한다.
  참여자도 조직 멤버를 참조한다. 멤버 삭제는 PIC 재지정 전 차단한다.
- 목표·Workstream·업데이트에 `(organization_id,id)` 참조 키를 두고 복합 FK로
  서로 다른 조직의 목표·업무·댓글을 연결하지 못하게 한다.
- 댓글은 `workstream_id`와 `update_id` 중 정확히 하나만 존재하도록 CHECK한다.
  업데이트 댓글은 부모 업데이트가 실제로 같은 조직에 속하는지 검증한다.
- 노트의 Workstream 연결은 같은 조직만 허용한다. `organization_id IS NULL`이면
  `workstream_id`도 NULL이다. 탈퇴 시 연결을 해제하며 노트를 cascade 삭제하지 않는다.
- `attachments`의 다형성 대상은 일반 FK로 검증되지 않는다. DB trigger/제한된 RPC와
  RLS에서 대상 존재·조직·소유권을 확인한다. API 검증만으로 직접 Data API 쓰기를 허용하지 않는다.

인덱스 기본안: 멤버 `(user_id,organization_id)`, 노트 `(user_id,updated_at,id)`,
목표 `(organization_id,status,sort_order)`, Workstream `(organization_id,status)`,
업데이트 `(organization_id,published_at,id)`와 `(workstream_id,published_at,id)`,
댓글의 각 대상·`created_at,id`, attachment `(target_type,target_id)`와 unique bucket/path.
검색 인덱스는 측정 후 추가한다. 필터·RLS에 사용되는 FK는 실제 쿼리 계획으로 검증한다.

## 권한 기본안

모든 역할은 동일한 Mission Control / My Work / Workstreams / Team Focus 탭에 접근한다.
내비게이션을 숨겨 권한을 표현하지 않는다. 아래 정책은 데이터 조회와 변경에 적용한다.
개인 데이터와 미발행 초안의 비공개 예외를 제외한 팀 데이터는 모든 현재 멤버가 조회한다.

Workstream 관리 주체는 확정 요구사항이다. 그 밖의 역할별 세부 권한은 다음 제안으로
구체화한다. `팀원`은 해당 조직의 현재 멤버, `작성자`도 팀 콘텐츠에서는 현재 멤버여야 한다.

| 대상·행동 | Owner | Admin | Member/PIC |
| --- | --- | --- | --- |
| 팀 데이터 조회 | 허용 | 허용 | 허용 |
| 조직 정보·Mission·목표 관리 | 허용 | 허용 | 불가 |
| 초대 발급·취소 | 허용 | 허용 | 불가 |
| 역할 변경·Owner 이전 | 허용 | 불가 | 불가 |
| Member 제거 | 허용 | 일반 Member만 | 불가 |
| Workstream 생성 | 허용 | 허용 | 모든 팀원 허용 |
| 업무 설명·상태·PIC·참여자·목표 연결·보관 | 허용 | 허용 | 해당 PIC만 |
| 업데이트·댓글 작성 | 허용 | 허용 | 모든 팀원 허용 |
| 게시물 수정 | 본인 글만 | 본인 글만 | 본인 글만 |
| 발행 게시물·댓글 삭제 | 허용 | 허용 | 본인 글만 |
| 공유 초안 조회·편집·삭제 | 본인 것만 | 본인 것만 | 본인 것만 |
| 개인 노트·개인 이미지 | 본인 것만 | 본인 것만 | 본인 것만 |

목표·Workstream은 보관을 제공하고 영구 삭제는 MVP UI에서 제외하는 기본안이다.
Owner는 소유권 이전 없이 탈퇴할 수 없으며, 관리자는 자신보다 높은 역할을 제거할 수 없다.
PIC의 셀프 변경도 다른 현재 팀원 지정 후 완료한다. 작성자가 탈퇴한 게시물은 팀에 남지만
작성자는 더 이상 접근하지 못한다. 개인 기록은 아래 계약으로 독립 보존한다.

프로필은 본인과 허용된 같은 팀 구성원의 표시 정보만 조회한다. 다른 조직의 멤버 검색이나
프로필 URL을 통한 사용자 열거를 허용하지 않는다. 탈퇴한 작성자는 팀 이력에서 비활성으로
표시하고 필요 없는 개인 프로필 정보를 추가 조회하지 않는다.

### RLS·직접 접근

애플리케이션 테이블과 Storage의 SELECT/INSERT/UPDATE/DELETE를 각각 설계한다.
읽기 권한만으로 쓰기 권한을 부여하지 않으며 UPDATE에는 현재 행·변경 후 행 검증을
적용한다. 조직 역할은 현재 멤버십에서 판단하고 사용자가 수정 가능한 metadata를 신뢰하지 않는다.
멤버십 정책의 자기 참조 재귀를 피하도록 설계하고, 권한 상승 helper가 꼭 필요하면
고정 search_path·최소 실행 권한·명시적 사용자 검증으로 제한한다.
[Supabase RLS 가이드](https://supabase.com/docs/guides/database/postgres/row-level-security)

금지된 열 변경·대상 재지정·역할 상승은 Server Action뿐 아니라 직접 Data API 호출에서도
실패해야 한다. Activity 뷰/RPC도 호출자의 RLS를 적용하고 개인·초안 데이터를 제외한다.

## 초대와 조직 전환

Owner/Admin이 고엔트로피 토큰을 생성하고 DB에는 해시만 저장한다.
7일 만료·관리자 취소·여러 팀원 수락 가능한 링크를 제안한다. 로그인한 사용자가 토큰을
제출하면 서버가 유효성·가입 제한을 확인해 Member로 가입시킨다. 기존 멤버의 재수락은
성공 처리하고 중복 행을 만들지 않는다. 토큰 수락과 멤버 생성은 원자적으로 처리한다.

링크를 전달받은 사람도 가입할 수 있는 모델이므로 외부 베타 전에 적절성을 재확인한다.
초대 토큰은 로그·분석·외부 referrer에 남기지 않는다. 만료·취소·무효 링크는
조직의 비공개 정보 없이 같은 오류 화면으로 처리한다.

조직 전환은 새 URL·멤버십을 검증하고 노트 검색·멘션·Activity·Storage 캐시를
조직별로 분리한다. 이전 편집의 미저장 내용을 처리한 뒤 전환한다.
탈퇴·제거는 트랜잭션에서 Owner/PIC 제약을 확인하고 노트의 조직·업무 연결 및
개인 attachment의 조직 연결을 해제한 뒤 멤버십·참여자 관계를 제거한다.
팀 미연결 노트의 CRUD와 이미지 접근은 작성자 ID로만 판단한다.

## 자동 저장 계약

제안: 입력 중 800ms debounce, 페이지 내 이동 전 마지막 저장 시도, 문서당 요청 한 개씩
직렬화. 저장 상태는 `dirty → saving → saved / failed / conflict`다.
요청은 `expected_revision`을 보내고 서버가 일치할 때만 수정·revision 증가를 수행한다.
성공 응답이 왔어도 그동안 새 입력이 있으면 다음 저장을 이어간다.

다른 탭에서 수정한 경우 기존 본문을 덮어쓰지 않고 서버 버전과 현재 편집 내용을
선택·복사하도록 한다. 자동 병합·공동 편집은 제외한다.
실패 시 메모리의 편집 내용을 유지하고 재시도·원문 복사를 제공한다.
`beforeunload` 경고는 보조 수단이며 저장 완료를 보장하지 않는다.
오프라인 영속 초안은 MVP 기본안에 포함되지 않아 저장 전 탭 종료 시 유실 가능성을 UI에 알린다.

## Markdown과 멘션

Markdown TEXT만 콘텐츠 원본으로 저장한다. 지원 서식은 제목, 강조, 목록·체크리스트,
인용, 코드, 링크, 이미지, 사용자·Workstream 멘션이다.
편집기와 renderer는 같은 참조 문법을 지원한다.

```markdown
@[지오](user:550e8400-e29b-41d4-a716-446655440000)
#[품질 개선](workstream:850e8400-e29b-41d4-a716-446655440000)
![실험 결과](attachment:650e8400-e29b-41d4-a716-446655440000)
```

attachment UUID를 본문에 저장하고 렌더링 시 권한을 확인해 임시 URL을 만든다.
서명 URL·개인 object 경로를 Markdown에 영구 저장하지 않는다.
custom token/AST 단계에서만 참조를 해석한다. 코드·이스케이프·일반 링크를 건드리지 않고
표시 라벨의 괄호·Unicode를 안전하게 직렬화한다. 참조 해석 결과도 접근 권한을 다시 확인한다.

raw HTML은 기본 거부하고 링크 scheme은 허용 목록으로 제한한다.
`user:`·`workstream:`·`attachment:`는 일반 링크로 열지 않고 전용 renderer로 처리한다.
외부 이미지는 자동 로딩하지 않는다. Markdown을 통해 추적 이미지나 임의 서버 fetch를 만들지 않는다.

현재 공식 Tiptap Markdown 확장은 beta로 안내되므로 버전을 고정하고 모든 지원 노드,
한·영 본문, 사용자 정의 참조의 저장→재로드→재저장 의미 보존을 먼저 검증한다.
지원되지 않는 내용을 조용히 삭제하지 않는다.
[Tiptap Markdown 문서](https://tiptap.dev/docs/editor/markdown)

## 이미지 계약

형식은 PNG/JPEG/WebP/GIF, 파일당 제한은 원문 기준 10MB다.
실행 기본안은 10 MiB(`10 * 1024 * 1024` bytes)로 명확히 하고 UI에도 MiB를 표시한다.
SVG·HTML·임의 파일은 받지 않는다. 확장자뿐 아니라 파일 signature·실제 디코딩·크기를
검증하고 이미지 픽셀·GIF 프레임 상한은 구현 시 정한다. 사용자는 대체 텍스트를 입력할 수 있다.

`private-images/{user_id}/{uuid}`와 `team-images/{organization_id}/{uuid}`를 사용하고
두 bucket은 private이다. 신규 업로드는 임의 경로 upsert를 허용하지 않는다.
메타데이터의 대상 권한과 object RLS를 연결하며 서버 검증을 거치지 않은 파일은 ready가 될 수 없다.
pending object/attachment는 업로더만 접근하고 실패 시 해당 UUID만 정리한다.

발행 콘텐츠의 이미지는 현재 팀원만, 개인 이미지는 작성자만 접근한다.
문서의 다른 attachment UUID를 직접 넣어도 권한을 우회할 수 없어야 한다.
동일 사용자의 다른 노트 이미지도 명시적 복사/연결 없이 허용하지 않는다.
첨부 제거는 본문 저장 성공 후 참조를 확인해 수행한다. 실패한 본문 저장 전에 파일을 지우지 않는다.
소유권·상태를 확인해 미사용 업로드를 정리하고 다른 문서의 이미지를 삭제하지 않는다.

제안: 이미지 서명 URL TTL 60초, 권한 확인 후 발급·만료 시 갱신.
이미 발급된 URL은 팀 제거 뒤에도 만료 전까지 유효할 수 있다. 제거 즉시 새 조회·발급은
차단하지만 완전한 즉시 회수를 주장하지 않는다. 엄격한 즉시 회수가 필요하면 인증 프록시를 선택한다.
[Supabase Storage 접근 제어](https://supabase.com/docs/guides/storage/security/access-control)

## 개인 노트 공유 계약

DB 트랜잭션은 Storage object 복사까지 원자적으로 묶지 못하므로 발행 전 초안을 이용한다.

1. 사용자·노트 소유권·대상 멤버십·Workstream을 확인한다. 선택한 본문·attachment만 받는다.
2. `publish_request_id`로 작성자 전용 draft 업데이트를 생성하거나 기존 요청을 재사용한다.
3. 선택한 개인 이미지를 새 UUID의 팀 object로 복사하고 draft attachment를 등록한다.
   공유 초안·이미지는 작성자만 조회하며 일반 팀원에게 미리 노출하지 않는다.
4. 모든 이미지가 준비되면 참조를 새 attachment ID로 치환한다. DB 트랜잭션에서 권한을
   다시 확인하고 본문·ready 상태·`published_at`을 함께 확정한다.
5. 실패하면 draft로 남겨 재시도/취소한다. 완료된 요청을 재호출해도 같은 게시물을 반환한다.

팀원에게는 published만 보인다. 실패·취소의 orphan object는 그 요청에 한해 정리한다.
추가 이미지의 선택·제거도 발행 전에 검증하고 원본 note ID나 경로를 팀 메타데이터에 노출하지 않는다.
원본 수정·삭제와 팀 게시물은 독립적이다.

## 조회·Activity

기존 Activity 조회는 Mission Control의 Workstream별 최근 변경 최대 2개와 업무 Timeline에 사용한다.
독립 Activity 탭은 없다. Global Search는 같은 조직의 업무·발행 업데이트·목표와 본인 노트를
서버에서 권한별로 검색한다. 모든 테이블을 관리자 키로 합친 뒤 브라우저에서 필터하지 않는다.

Attention Needed는 개별 Update와 분리된 팀 신호 조회 계약을 사용한다. 조직, 유형(의존성 병목·
업무 분담·의사결정·위험), 상황, 팀 영향, 근거·확인 시각, 논의할 내용, 관련 Workstream·팀원,
해결 여부를 포함한다. 여러 업무를 연결할 수 있으며 Goal 필터는 관련 업무의 Goal 중 하나라도
일치하면 포함한다. 조직 전체 신호는 전체 보기에서 제공한다. 조직 범위 검증을 먼저 적용한다.
프리뷰는 수동 등록 fixture이며 저장·해결 API는 아직 없다. 실제 저장 모델은 구현 시 확정한다.
작성자·관련 PIC·Owner/Admin의 해결 처리를 기본안으로 한다. 기존 11개 핵심 테이블 외
팀 신호 저장 구조는 별도 설계 대상이다. Update의 유형이나 경과 시간만으로 신호를 생성하지 않는다.
업무 할당 집계는 조직·진행 상태·PIC/참여를 구분하고, 과부하 여부는 개수만으로 판단하지 않는다.
자동 분석 입력은 추후 같은 표시 계약으로 연결하되 개인 원문을 팀에 자동 공개하지 않는다.

My Work의 변경 조회는 업무별 최신 변경과 본인의 마지막 변경을 기준으로 하며 방문 시각을 사용하지 않는다.
Captured Activities의 수집·저장 테이블은 에이전트 연동 시 설계하며 현재 11개 테이블에
자동 추적 테이블을 미리 추가하지 않는다.

업데이트·댓글을 권한 있는 조직 범위에서 합쳐 조회한다. 최신순 정렬 키는
`event_time, entity_type, id`이며 cursor에도 같은 키를 사용한다.
기본 페이지 크기 20, 서버 최대 50을 제안한다. offset 중복·누락을 줄이고 조직·작성자·유형
필터를 서버에서 적용한다. 댓글 수는 현재 접근 가능한 댓글만 집계한다.
별도 이벤트 테이블·Realtime 구독·개인 활동 분석은 MVP에 추가하지 않는다.

## 환경·보안 운영 준비

로컬·Preview·Production의 인증 redirect와 데이터 대상을 분리하는 기본안이다.
실제 Supabase 프로젝트·Vercel 연결·도메인·비용은 미결정이다.
환경 예제에는 placeholder만 쓰고 고정 버전·lockfile을 기록한다.
이미지·노트 원문·초대 토큰·서명 URL은 로그에 남기지 않고 오류 ID·단계만 기록한다.
원격 설정·SQL·배포는 승인된 대상에서만 수행한다. 다른 레포의 DB 정책을 가져오지 않는다.

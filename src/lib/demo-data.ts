import { kitschGoals, kitschStreams } from "./kitsch-fixtures";
import { kitschUpdates } from "./kitsch-updates";
import { type Localized, type Locale } from "./messages";

// Fictional fixtures only. Production private data must never be shipped in this module.
export const viewerId = "min";
export const people = [
  { id: "min", name: "Min", initials: "MN", color: "blue" },
  { id: "hana", name: "Hana", initials: "HN", color: "red" },
  { id: "alex", name: "Alex", initials: "AX", color: "gray" },
  { id: "june", name: "June", initials: "JN", color: "blue" },
  { id: "robin", name: "Robin", initials: "RB", color: "gray" },
];
export const organizations = [
  { id: "corridor", name: "Kitsch Labs", initials: "KL" },
];
export const goals = kitschGoals;
export type Stream = {
  id: string;
  orgId: string;
  code: string;
  title: Localized;
  description: Localized;
  state: Localized;
  next: Localized;
  pic: string;
  members: string[];
  goalId: string;
  status: "active" | "paused" | "completed" | "archived";
};
export const streams: Stream[] = kitschStreams;
export type TeamAttention = {
  id: string;
  orgId: string;
  kind: "dependency" | "workload" | "decision";
  title: Localized;
  impact: Localized;
  evidence: Localized;
  discussion: Localized;
  streamIds: string[];
  peopleIds: string[];
};

// Manually flagged fictional team signals, not inferred from update age or activity.
export const teamAttention: TeamAttention[] = [
  {
    "id": "production-dependency",
    "orgId": "corridor",
    "kind": "dependency",
    "title": {
      "ko": "대본 승인이 3일째 대기 중이라 음성 제작과 평가가 함께 밀리고 있어요.",
      "en": "Script approval has held up voice production and evaluation for three days."
    },
    "impact": {
      "ko": "필수 녹음 범위를 먼저 확정할 팀 결정이 필요합니다.",
      "en": "The team needs to agree on the essential recording scope."
    },
    "evidence": {
      "ko": "가상 시나리오: 신규 음성 제작의 감정 대사 승인이 대기 중이며 루마·린 품질 평가에도 영향을 줍니다.",
      "en": "Fictional scenario: emotion-line approval is pending and affects Luma and Rin evaluation."
    },
    "discussion": {
      "ko": "필수 대사부터 승인하고 감정 대사는 다음 녹음으로 분리할까요?",
      "en": "Should we approve essential lines first and record emotional lines separately?"
    },
    "streamIds": [
      "voice-production",
      "voice-quality"
    ],
    "peopleIds": [
      "hana",
      "min"
    ]
  },
  {
    "id": "evaluation-workload",
    "orgId": "corridor",
    "kind": "workload",
    "title": {
      "ko": "Min의 음성 품질·연기 표현 검토와 모델 평가 일정이 겹쳐 있어요.",
      "en": "Min's voice quality, acting, and model evaluation reviews overlap."
    },
    "impact": {
      "ko": "평가 검토를 나누거나 제작 일정을 조정해야 합니다.",
      "en": "Share evaluation reviews or adjust production scheduling."
    },
    "evidence": {
      "ko": "가상 배정: PIC 2개와 모델 평가·신규 음성 제작·Voice Kit 참여 3개입니다. 개수만으로 과부하를 판정한 것이 아닌 팀 조율 요청 예시입니다.",
      "en": "Fictional assignment: two PIC roles and three memberships across evaluation, production, and Voice Kit. This is a coordination request, not overload inferred from counts."
    },
    "discussion": {
      "ko": "모델 비교 청취를 Alex와 나누고 연기 검토 시간을 따로 확보할까요?",
      "en": "Could Alex share model listening reviews to leave time for acting evaluation?"
    },
    "streamIds": [
      "acting",
      "model-evaluation"
    ],
    "peopleIds": [
      "min",
      "alex"
    ]
  },
  {
    "id": "retry-decision",
    "orgId": "corridor",
    "kind": "decision",
    "title": {
      "ko": "파트너 데모 확대 전에 중복 재시도 처리 기준을 정해야 해요.",
      "en": "Agree on duplicate retry handling before expanding the partner demo."
    },
    "impact": {
      "ko": "재연결 시 오디오 중복 재생이 파트너 체험을 해칠 수 있습니다.",
      "en": "Duplicate playback after reconnection could harm the partner experience."
    },
    "evidence": {
      "ko": "가상 부하 테스트 24개 요청 중 2개 중복 처리. 실제 운영 장애 수치가 아닙니다.",
      "en": "Fictional load test: two duplicate requests out of 24; not a production incident metric."
    },
    "discussion": {
      "ko": "중복 방지 검증을 먼저 마친 뒤 데모 범위를 넓힐까요?",
      "en": "Should duplicate protection be validated before expanding the demo?"
    },
    "streamIds": [
      "voice-reliability",
      "partner-integration"
    ],
    "peopleIds": [
      "alex",
      "june"
    ]
  },
  {
    "id": "budget-decision",
    "orgId": "corridor",
    "kind": "decision",
    "title": {
      "ko": "음성 제작과 평가 실험의 예산 배분을 함께 결정해야 해요.",
      "en": "Voice production and evaluation need a joint budget decision."
    },
    "impact": {
      "ko": "다음 녹음 범위와 실험 횟수가 함께 달라집니다.",
      "en": "The decision affects recording scope and experiment volume."
    },
    "evidence": {
      "ko": "가상 월 예산 4200만원 기준의 예시입니다. 실제 회사 예산이나 투자 현황을 나타내지 않습니다.",
      "en": "Example based on a fictional monthly budget of KRW 42 million, unrelated to actual finances."
    },
    "discussion": {
      "ko": "필수 녹음 분량을 확보한 뒤 남은 예산으로 실험 범위를 정할까요?",
      "en": "Should we reserve essential recording funds before setting experiment scope?"
    },
    "streamIds": [
      "cash-planning",
      "voice-production"
    ],
    "peopleIds": [
      "robin",
      "hana"
    ]
  }
];

export type Update = {
  id: string;
  createdAt: string;
  streamId: string;
  author: string;
  type: "progress" | "learning" | "blocker" | "decision";
  title: Localized;
  body: Localized;
  attention?: "decision" | "blocker" | "risk";
  artifacts?: {
    service: "github" | "drive" | "instagram";
    title: Localized;
    url: string;
  }[];
};
export const updates: Update[] = kitschUpdates;

export function myWorkChanges(items: Update[], streamId: string, userId: string) {
  const ordered = items.filter((item) => item.streamId === streamId)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) || a.id.localeCompare(b.id));
  const latest = ordered[0];
  const mine = latest?.author !== userId ? ordered.find((item) => item.author === userId) : undefined;
  return { latest, mine };
}

export function recentStreamUpdates(items: Update[], streamId: string) {
  return items
    .filter((item) => item.streamId === streamId)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) || a.id.localeCompare(b.id))
    .slice(0, 2);
}

export const notes = [
  {
    "id": "n1",
    updatedAt: "2026-10-14T10:35:00+09:00",
    "orgId": "corridor",
    "owner": "min",
    "title": {
      "ko": "음성 청취 인터뷰 메모",
      "en": "Voice listening interview notes"
    },
    "body": {
      "ko": "## 청취 메모\n루마의 문장 끝 호흡을 다시 확인한다.\n\n- 숫자 읽기와 고유명사를 나눠 듣기\n- 가상 모델 Velora-T2와 Nimbus-S4 비교",
      "en": "## Listening notes\nReview Luma's sentence endings.\n\n- Separate numbers and proper names\n- Compare fictional Velora-T2 and Nimbus-S4"
    },
  },
  {
    "id": "n2",
    updatedAt: "2026-10-13T13:51:00+09:00",
    "orgId": "corridor",
    "owner": "min",
    "title": {
      "ko": "다음 감정 평가 질문",
      "en": "Next emotion review questions"
    },
    "body": {
      "ko": "## 검토할 것\n- 미세한 망설임이 드러나는가?\n- 웃음 뒤의 침묵은 자연스러운가?\n\n개인 검토용 가상 기록입니다.",
      "en": "## Review questions\n- Is subtle hesitation audible?\n- Is the pause after laughter natural?\n\nFictional private review notes."
    },
  }
];

export function organizationData(orgId: string) {
  const workstreams = streams.filter((stream) => stream.orgId === orgId);
  const ids = new Set(workstreams.map((stream) => stream.id));
  return {
    streams: workstreams,
    goals: goals.filter((goal) => goal.orgId === orgId),
    attention: teamAttention.filter((item) => item.orgId === orgId),
    updates: updates.filter((update) => ids.has(update.streamId)),
    notes: notes.filter(
      (note) => note.orgId === orgId && note.owner === viewerId,
    ),
  };
}

export function searchWorkspace(orgId: string, query: string, locale: Locale) {
  const data = organizationData(orgId);
  const all = [
    ...data.streams.map((item) => ({
      id: item.id,
      kind: "workstream" as const,
      title: item.title[locale],
      body: `${item.description[locale]} ${item.state[locale]}`,
      href: `/workstreams/${item.id}`,
    })),
    ...data.updates.map((item) => ({
      id: item.id,
      kind: "update" as const,
      title: item.title[locale],
      body: item.body[locale],
      href: `/workstreams/${item.streamId}#${item.id}`,
    })),
    ...data.goals.map((item) => ({
      id: item.id,
      kind: "goal" as const,
      title: item.title[locale],
      body: item.description[locale],
      href: `/team-focus#${item.id}`,
    })),
    ...data.notes.map((item) => ({
      id: item.id,
      kind: "note" as const,
      title: item.title[locale],
      body: item.body[locale],
      href: `/my-work#${item.id}`,
    })),
  ];
  const needle = query.trim().toLocaleLowerCase();
  return needle
    ? all.filter((item) =>
        `${item.title} ${item.body}`.toLocaleLowerCase().includes(needle),
      )
    : [];
}

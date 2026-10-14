import type { Stream } from "./demo-data";

// Entirely synthetic scenarios. Names, assignments, models, parameters and metrics are fictional.
export const kitschGoals = [
  {
    "id": "g1",
    "orgId": "corridor",
    "title": {
      "ko": "자연스럽고 표현력 있는 목소리를 만든다",
      "en": "Create natural, expressive voices"
    },
    "description": {
      "ko": "개성과 감정이 살아 있는 음성 품질을 만듭니다.",
      "en": "Build voice quality full of character and emotion."
    }
  },
  {
    "id": "g2",
    "orgId": "corridor",
    "title": {
      "ko": "개성 있는 Voice IP 라인업을 확보한다",
      "en": "Build a distinctive Voice IP lineup"
    },
    "description": {
      "ko": "보이스 기획부터 제작까지 매력적인 목소리를 확보합니다.",
      "en": "Develop compelling voices from concept to production."
    }
  },
  {
    "id": "g3",
    "orgId": "corridor",
    "title": {
      "ko": "에이전트에 Kitsch Voice를 쉽게 연결한다",
      "en": "Connect Kitsch Voice to agents easily"
    },
    "description": {
      "ko": "개발자와 파트너의 첫 음성 경험을 단순하게 만듭니다.",
      "en": "Simplify first voice experiences for developers and partners."
    }
  },
  {
    "id": "g4",
    "orgId": "corridor",
    "title": {
      "ko": "목소리 체험을 지속적인 사용과 결제로 연결한다",
      "en": "Turn voice trials into ongoing use and payment"
    },
    "description": {
      "ko": "유입·체험·팀 사용·결제의 흐름을 개선합니다.",
      "en": "Improve discovery, trials, team usage, and payment."
    }
  },
  {
    "id": "g5",
    "orgId": "corridor",
    "title": {
      "ko": "제품 개발과 시장 진입을 지속할 자금을 확보한다",
      "en": "Fund sustained development and market entry"
    },
    "description": {
      "ko": "제품과 시장 실험을 이어갈 자원을 마련합니다.",
      "en": "Secure resources for product and market experiments."
    }
  }
];

export const kitschStreams: Stream[] = [
  {
    "id": "voice-quality",
    "orgId": "corridor",
    "code": "WS–01",
    "title": {
      "ko": "루마·린 음성 품질",
      "en": "Luma & Rin voice quality"
    },
    "description": {
      "ko": "화자 개성과 자연스러운 운율을 개선합니다.",
      "en": "Improve speaker identity and natural prosody."
    },
    "state": {
      "ko": "청취 평가에서 문장 끝 호흡이 개선됐습니다.",
      "en": "Listening reviews show improved sentence endings."
    },
    "next": {
      "ko": "긴 대사의 화자 일관성을 확인합니다.",
      "en": "Check speaker consistency in long dialogue."
    },
    "pic": "min",
    "members": [
      "hana"
    ],
    "goalId": "g1",
    "status": "active"
  },
  {
    "id": "acting",
    "orgId": "corridor",
    "code": "WS–02",
    "title": {
      "ko": "감정·연기 표현",
      "en": "Emotion & acting"
    },
    "description": {
      "ko": "감정 지시와 웃음·한숨의 표현 범위를 넓힙니다.",
      "en": "Expand emotional direction, laughter, and sighs."
    },
    "state": {
      "ko": "약한 감정 지시의 차이가 충분히 드러나지 않습니다.",
      "en": "Subtle emotional directions are not distinct enough."
    },
    "next": {
      "ko": "미세 감정과 강한 연기를 분리해 비교합니다.",
      "en": "Compare subtle emotion separately from strong acting."
    },
    "pic": "min",
    "members": [
      "june"
    ],
    "goalId": "g1",
    "status": "active"
  },
  {
    "id": "model-evaluation",
    "orgId": "corridor",
    "code": "WS–03",
    "title": {
      "ko": "음성 모델 실험·평가",
      "en": "Voice experiments & evaluation"
    },
    "description": {
      "ko": "학습 결과를 재현 가능한 평가로 비교합니다.",
      "en": "Compare training runs with reproducible evaluations."
    },
    "state": {
      "ko": "가상 후보 두 개의 품질과 비용 비교를 준비했습니다.",
      "en": "Quality and cost comparisons for two fictional candidates are ready."
    },
    "next": {
      "ko": "동일한 청취 세트로 후보를 재평가합니다.",
      "en": "Re-evaluate candidates with the same listening set."
    },
    "pic": "alex",
    "members": [
      "min"
    ],
    "goalId": "g1",
    "status": "active"
  },
  {
    "id": "voice-partnerships",
    "orgId": "corridor",
    "code": "WS–04",
    "title": {
      "ko": "성우 파트너십·보이스 기획",
      "en": "Voice partnerships & concepts"
    },
    "description": {
      "ko": "캐릭터의 개성과 성우의 참여 조건을 함께 설계합니다.",
      "en": "Shape character identity and actor participation terms."
    },
    "state": {
      "ko": "가상 캐릭터 세 종의 피드백을 정리했습니다.",
      "en": "Feedback for three fictional characters is organized."
    },
    "next": {
      "ko": "사용 범위와 녹음 방향을 함께 확정합니다.",
      "en": "Agree on usage scope and recording direction."
    },
    "pic": "hana",
    "members": [
      "june"
    ],
    "goalId": "g2",
    "status": "active"
  },
  {
    "id": "voice-production",
    "orgId": "corridor",
    "code": "WS–05",
    "title": {
      "ko": "신규 음성 제작",
      "en": "New voice production"
    },
    "description": {
      "ko": "녹음 준비부터 검수와 음성 등록까지 연결합니다.",
      "en": "Connect recording preparation, quality review, and voice registration."
    },
    "state": {
      "ko": "대본 승인 대기로 녹음 준비가 지연되고 있습니다.",
      "en": "Recording preparation is waiting for script approval."
    },
    "next": {
      "ko": "필수 대사부터 승인 범위를 결정합니다.",
      "en": "Agree on an initial script approval scope."
    },
    "pic": "hana",
    "members": [
      "min"
    ],
    "goalId": "g2",
    "status": "paused"
  },
  {
    "id": "voice-kit",
    "orgId": "corridor",
    "code": "WS–06",
    "title": {
      "ko": "Agent Voice Kit",
      "en": "Agent Voice Kit"
    },
    "description": {
      "ko": "개발자가 첫 음성 응답까지 빠르게 도달하도록 합니다.",
      "en": "Help developers reach their first voice response quickly."
    },
    "state": {
      "ko": "MCP와 호환 API 예제의 오류 안내를 정리했습니다.",
      "en": "Error guidance for MCP and compatible API examples is ready."
    },
    "next": {
      "ko": "처음 사용하는 개발자에게 예제를 검증받습니다.",
      "en": "Validate examples with first-time developers."
    },
    "pic": "alex",
    "members": [
      "min"
    ],
    "goalId": "g3",
    "status": "active"
  },
  {
    "id": "partner-integration",
    "orgId": "corridor",
    "code": "WS–07",
    "title": {
      "ko": "파트너 음성 연동",
      "en": "Partner voice integration"
    },
    "description": {
      "ko": "파트너의 제품 맥락에서 음성 경험을 검증합니다.",
      "en": "Validate voice experiences in partner products."
    },
    "state": {
      "ko": "가상 파트너의 대화 데모 연결을 마쳤습니다.",
      "en": "The fictional partner conversation demo is connected."
    },
    "next": {
      "ko": "재연결과 긴 대화 시나리오를 검증합니다.",
      "en": "Validate reconnection and long conversations."
    },
    "pic": "june",
    "members": [
      "alex"
    ],
    "goalId": "g3",
    "status": "active"
  },
  {
    "id": "voice-reliability",
    "orgId": "corridor",
    "code": "WS–08",
    "title": {
      "ko": "음성 서비스 안정성",
      "en": "Voice service reliability"
    },
    "description": {
      "ko": "실패와 지연을 관찰하고 복구 경험을 개선합니다.",
      "en": "Observe failures and latency and improve recovery."
    },
    "state": {
      "ko": "가상 부하 테스트에서 재시도 중복을 발견했습니다.",
      "en": "A fictional load test exposed duplicate retries."
    },
    "next": {
      "ko": "중복 요청 방지 조건을 검증합니다.",
      "en": "Verify duplicate-request protection."
    },
    "pic": "alex",
    "members": [
      "june"
    ],
    "goalId": "g3",
    "status": "active"
  },
  {
    "id": "icp-messaging",
    "orgId": "corridor",
    "code": "WS–09",
    "title": {
      "ko": "ICP·솔루션 메시지",
      "en": "ICP & solution messaging"
    },
    "description": {
      "ko": "고객의 사용 목적을 구체적인 제품 메시지로 연결합니다.",
      "en": "Connect customer use cases to concrete product messaging."
    },
    "state": {
      "ko": "캐릭터 에이전트용 솔루션 문구를 검토 중입니다.",
      "en": "Character-agent solution messaging is under review."
    },
    "next": {
      "ko": "체험 버튼 앞의 핵심 약속을 확정합니다.",
      "en": "Finalize the promise shown before the demo action."
    },
    "pic": "june",
    "members": [
      "hana"
    ],
    "goalId": "g4",
    "status": "active"
  },
  {
    "id": "voice-discovery",
    "orgId": "corridor",
    "code": "WS–10",
    "title": {
      "ko": "보이스 체험·유입",
      "en": "Voice discovery & acquisition"
    },
    "description": {
      "ko": "데모와 콘텐츠에서 제품 체험으로 자연스럽게 이어집니다.",
      "en": "Connect demos and content to product trials."
    },
    "state": {
      "ko": "가상 캐릭터 데모의 체험 동선을 비교했습니다.",
      "en": "Compared trial paths in a fictional character demo."
    },
    "next": {
      "ko": "보이스 선택까지 이어지는 문구를 다듬습니다.",
      "en": "Refine copy leading to voice selection."
    },
    "pic": "hana",
    "members": [
      "june"
    ],
    "goalId": "g4",
    "status": "active"
  },
  {
    "id": "workspace-billing",
    "orgId": "corridor",
    "code": "WS–11",
    "title": {
      "ko": "워크스페이스·결제 경험",
      "en": "Workspace & billing experience"
    },
    "description": {
      "ko": "팀 사용과 결제 과정의 마찰을 줄입니다.",
      "en": "Reduce friction in team usage and billing."
    },
    "state": {
      "ko": "샘플 결제 실패 안내와 복구 동선을 정리했습니다.",
      "en": "Sample payment failure and recovery flows are ready."
    },
    "next": {
      "ko": "크레딧 부족 안내를 팀 사용 흐름에서 검증합니다.",
      "en": "Validate low-credit guidance in team workflows."
    },
    "pic": "june",
    "members": [
      "alex"
    ],
    "goalId": "g4",
    "status": "active"
  },
  {
    "id": "fundraising",
    "orgId": "corridor",
    "code": "WS–12",
    "title": {
      "ko": "투자 유치",
      "en": "Fundraising"
    },
    "description": {
      "ko": "제품 방향과 시장 가설을 투자 논의에 연결합니다.",
      "en": "Connect product direction and market hypotheses to investor discussions."
    },
    "state": {
      "ko": "가상 투자 미팅의 후속 질문을 정리했습니다.",
      "en": "Follow-up questions from fictional investor meetings are organized."
    },
    "next": {
      "ko": "제품 데모와 시장 설명의 연결을 보완합니다.",
      "en": "Strengthen the connection between the demo and market narrative."
    },
    "pic": "robin",
    "members": [
      "hana"
    ],
    "goalId": "g5",
    "status": "active"
  },
  {
    "id": "cash-planning",
    "orgId": "corridor",
    "code": "WS–13",
    "title": {
      "ko": "자금 운영",
      "en": "Cash planning"
    },
    "description": {
      "ko": "개발과 시장 실험에 필요한 지출을 함께 계획합니다.",
      "en": "Plan spending for development and market experiments."
    },
    "state": {
      "ko": "가상 비용 계획의 시나리오 비교를 마쳤습니다.",
      "en": "Fictional spending scenarios have been compared."
    },
    "next": {
      "ko": "실험 예산과 제작 일정을 함께 조정합니다.",
      "en": "Align experiment budgets with production schedules."
    },
    "pic": "robin",
    "members": [
      "alex"
    ],
    "goalId": "g5",
    "status": "active"
  }
];


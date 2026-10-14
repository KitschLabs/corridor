import type { Update } from "./demo-data";

// Synthetic demo changes, including all model names and numerical values.
export const kitschUpdates: Update[] = [
  {
    "id": "voice-quality-1",
    artifacts: [{"service": "drive", "title": {"ko": "루마·린 청취 비교표", "en": "Luma & Rin listening comparison"}, "url": "https://example.com/artifacts/drive/voice-quality-1"}],
    "streamId": "voice-quality",
    "author": "min",
    "type": "progress",
    "createdAt": "2026-10-14T09:00:00+09:00",
    "title": {
      "ko": "문장 끝 호흡 개선 확인",
      "en": "Sentence endings sound more natural"
    },
    "body": {
      "ko": "Velora-T2 가상 모델의 청취 점수가 3.8에서 4.2로 개선됐습니다. 48개 합성 문장 기준이며 긴 대사는 추가 확인이 필요합니다.",
      "en": "The fictional Velora-T2 listening score rose from 3.8 to 4.2 across 48 synthetic sentences. Long dialogue still needs review."
    }
  },
  {
    "id": "voice-quality-2",
    artifacts: [{"service": "drive", "title": {"ko": "발음 오류 검토 시트", "en": "Pronunciation review sheet"}, "url": "https://example.com/artifacts/drive/voice-quality-2"}],
    "streamId": "voice-quality",
    "author": "min",
    "type": "learning",
    "createdAt": "2026-10-13T09:00:00+09:00",
    "title": {
      "ko": "고유명사 발음 오류 분류",
      "en": "Proper-name errors categorized"
    },
    "body": {
      "ko": "가상 평가세트 72문장 중 6문장에서 강세가 어긋났습니다. 고유명사 구간을 별도로 비교합니다.",
      "en": "Six of 72 fictional evaluation sentences had misplaced stress. Proper names will be compared separately."
    }
  },
  {
    "id": "voice-quality-3",
    "streamId": "voice-quality",
    "author": "hana",
    "type": "decision",
    "createdAt": "2026-10-12T09:00:00+09:00",
    "title": {
      "ko": "화자별 기준 청취본 구성",
      "en": "Speaker reference set prepared"
    },
    "body": {
      "ko": "루마는 부드러운 대화, 린은 또렷한 안내를 기준으로 청취본을 구성했습니다.",
      "en": "Luma references focus on warm dialogue; Rin references on clear guidance."
    }
  },
  {
    "id": "acting-1",
    artifacts: [{"service": "drive", "title": {"ko": "감정 연기 비교 영상", "en": "Emotion comparison video"}, "url": "https://example.com/artifacts/drive/acting-1"}],
    "streamId": "acting",
    "author": "min",
    "type": "blocker",
    "createdAt": "2026-10-14T09:15:00+09:00",
    "title": {
      "ko": "약한 감정 지시는 재설계 필요",
      "en": "Subtle emotion prompts need revision"
    },
    "body": {
      "ko": "강도 0.25와 0.45의 가상 비교에서 차이가 작았습니다. 단계 수를 늘리기 전에 지시어부터 정리합니다.",
      "en": "Fictional intensity settings 0.25 and 0.45 sounded similar. Refine prompts before adding levels."
    }
  },
  {
    "id": "acting-2",
    artifacts: [{"service": "drive", "title": {"ko": "웃음 전환 청취본", "en": "Laughter transition samples"}, "url": "https://example.com/artifacts/drive/acting-2"}],
    "streamId": "acting",
    "author": "min",
    "type": "learning",
    "createdAt": "2026-10-13T09:15:00+09:00",
    "title": {
      "ko": "웃음과 대사 연결 청취",
      "en": "Reviewed laughter-to-speech transitions"
    },
    "body": {
      "ko": "합성 샘플 36개 중 5개에서 웃음 뒤 침묵이 길었습니다. 연결 구간을 별도 라벨로 남겼습니다.",
      "en": "Five of 36 synthetic samples had long pauses after laughter. Transition segments were labeled separately."
    }
  },
  {
    "id": "acting-3",
    "streamId": "acting",
    "author": "june",
    "type": "decision",
    "createdAt": "2026-10-12T09:15:00+09:00",
    "title": {
      "ko": "연기 지시어 초안 합의",
      "en": "Acting prompt vocabulary agreed"
    },
    "body": {
      "ko": "기쁨·망설임·안도 세 범주부터 평가하기로 했습니다.",
      "en": "We agreed to evaluate joy, hesitation, and relief first."
    }
  },
  {
    "id": "model-evaluation-1",
    artifacts: [{"service": "drive", "title": {"ko": "가상 모델 평가 리포트", "en": "Fictional model evaluation report"}, "url": "https://example.com/artifacts/drive/model-evaluation-1"}],
    "streamId": "model-evaluation",
    "author": "alex",
    "type": "progress",
    "createdAt": "2026-10-14T09:30:00+09:00",
    "title": {
      "ko": "후보 비교표 검토 요청",
      "en": "Candidate comparison ready for review"
    },
    "body": {
      "ko": "가상 후보 Velora-T2와 Nimbus-S4의 선호율은 61%와 39%였습니다. 평가자 18명의 샘플 결과로 출시 판단은 보류합니다.",
      "en": "Fictional candidates Velora-T2 and Nimbus-S4 received 61% and 39% preference from 18 sample reviewers. A release decision remains open."
    }
  },
  {
    "id": "model-evaluation-2",
    artifacts: [{"service": "github", "title": {"ko": "평가 입력 고정 PR #42", "en": "Freeze evaluation inputs PR #42"}, "url": "https://example.com/artifacts/github/model-evaluation-2"}],
    "streamId": "model-evaluation",
    "author": "min",
    "type": "learning",
    "createdAt": "2026-10-13T09:30:00+09:00",
    "title": {
      "ko": "평가 입력 세트 고정",
      "en": "Evaluation inputs frozen"
    },
    "body": {
      "ko": "문장 96개, seed 731, temperature 0.68로 가상 비교 조건을 고정했습니다.",
      "en": "Fictional comparison settings were frozen at 96 sentences, seed 731, and temperature 0.68."
    }
  },
  {
    "id": "model-evaluation-3",
    "streamId": "model-evaluation",
    "author": "min",
    "type": "decision",
    "createdAt": "2026-10-12T09:30:00+09:00",
    "title": {
      "ko": "학습 조건 비교 계획 작성",
      "en": "Training comparison planned"
    },
    "body": {
      "ko": "가상 학습률 0.00007, batch 12, 2400 steps를 기준으로 한 조건씩 비교합니다.",
      "en": "Use fictional learning rate 0.00007, batch 12, and 2400 steps, varying one condition at a time."
    }
  },
  {
    "id": "voice-partnerships-1",
    artifacts: [{"service": "drive", "title": {"ko": "캐릭터 콘셉트 보드", "en": "Character concept board"}, "url": "https://example.com/artifacts/drive/voice-partnerships-1"}],
    "streamId": "voice-partnerships",
    "author": "hana",
    "type": "progress",
    "createdAt": "2026-10-14T10:00:00+09:00",
    "title": {
      "ko": "보이스 콘셉트 3종 검토",
      "en": "Three voice concepts reviewed"
    },
    "body": {
      "ko": "차분한 안내자·장난스러운 동료·담백한 해설자 콘셉트를 비교했습니다. 두 콘셉트의 차별화를 더 명확히 합니다.",
      "en": "Compared a calm guide, playful companion, and understated narrator. Two concepts need clearer differentiation."
    }
  },
  {
    "id": "voice-partnerships-2",
    "streamId": "voice-partnerships",
    "author": "hana",
    "type": "learning",
    "createdAt": "2026-10-13T10:00:00+09:00",
    "title": {
      "ko": "파트너 피드백 반영",
      "en": "Partner feedback incorporated"
    },
    "body": {
      "ko": "가상 파트너의 요청에 따라 감정 예시와 활용 장면을 제안서에 추가했습니다.",
      "en": "Added emotional examples and use cases in response to fictional partner feedback."
    }
  },
  {
    "id": "voice-partnerships-3",
    "streamId": "voice-partnerships",
    "author": "june",
    "type": "decision",
    "createdAt": "2026-10-12T10:00:00+09:00",
    "title": {
      "ko": "보이스 기획안 초안 공유",
      "en": "Voice concept draft shared"
    },
    "body": {
      "ko": "대사 길이보다 캐릭터의 말투와 관계성을 중심으로 기획안을 작성했습니다.",
      "en": "The draft emphasizes speaking style and relationships rather than script length."
    }
  },
  {
    "id": "voice-production-1",
    artifacts: [{"service": "drive", "title": {"ko": "녹음 대본 검토본", "en": "Recording script review"}, "url": "https://example.com/artifacts/drive/voice-production-1"}],
    "streamId": "voice-production",
    "author": "hana",
    "type": "blocker",
    "createdAt": "2026-10-14T10:15:00+09:00",
    "title": {
      "ko": "대본 승인 대기로 제작 일정 조율",
      "en": "Production schedule needs script approval"
    },
    "body": {
      "ko": "가상 녹음 패키지의 감정 대사 승인이 3일째 대기 중입니다. 품질 평가 일정에도 영향이 있어 범위 조율을 요청합니다.",
      "en": "Emotion lines in the fictional recording package have awaited approval for three days, affecting quality evaluation scheduling."
    }
  },
  {
    "id": "voice-production-2",
    "streamId": "voice-production",
    "author": "hana",
    "type": "learning",
    "createdAt": "2026-10-13T10:15:00+09:00",
    "title": {
      "ko": "녹음 검수 기준 정리",
      "en": "Recording checks documented"
    },
    "body": {
      "ko": "클리핑·긴 침묵·대사 누락을 우선 검수하고 재녹음 요청 사유를 함께 남깁니다.",
      "en": "Check clipping, long silence, and missing lines first; record reasons for retakes."
    }
  },
  {
    "id": "voice-production-3",
    "streamId": "voice-production",
    "author": "min",
    "type": "decision",
    "createdAt": "2026-10-12T10:15:00+09:00",
    "title": {
      "ko": "신규 캐릭터 대본 구성",
      "en": "New character scripts prepared"
    },
    "body": {
      "ko": "일상 대화와 안내 대사를 분리해 각 보이스의 활용 맥락을 확인할 수 있게 했습니다.",
      "en": "Separate casual dialogue from guidance so each voice can be assessed in context."
    }
  },
  {
    "id": "voice-kit-1",
    artifacts: [{"service": "github", "title": {"ko": "음성 응답 예제 PR #57", "en": "Voice response examples PR #57"}, "url": "https://example.com/artifacts/github/voice-kit-1"}],
    "streamId": "voice-kit",
    "author": "alex",
    "type": "progress",
    "createdAt": "2026-10-14T10:30:00+09:00",
    "title": {
      "ko": "첫 음성 응답 예제 통합",
      "en": "First voice response examples unified"
    },
    "body": {
      "ko": "MCP와 호환 API 예제에서 같은 가상 보이스 ID를 사용합니다. 실패 시 재시도 안내도 추가했습니다.",
      "en": "MCP and compatible API examples now use the same fictional voice ID and include retry guidance."
    }
  },
  {
    "id": "voice-kit-2",
    artifacts: [{"service": "github", "title": {"ko": "인증 오류 안내 PR #54", "en": "Authentication errors PR #54"}, "url": "https://example.com/artifacts/github/voice-kit-2"}],
    "streamId": "voice-kit",
    "author": "alex",
    "type": "learning",
    "createdAt": "2026-10-13T10:30:00+09:00",
    "title": {
      "ko": "인증 오류 메시지 개선",
      "en": "Authentication errors clarified"
    },
    "body": {
      "ko": "키 누락과 권한 부족을 구분해 다음 행동을 안내합니다.",
      "en": "Distinguish missing keys from insufficient permissions and explain next steps."
    }
  },
  {
    "id": "voice-kit-3",
    "streamId": "voice-kit",
    "author": "min",
    "type": "decision",
    "createdAt": "2026-10-12T10:30:00+09:00",
    "title": {
      "ko": "최소 연동 경로 정리",
      "en": "Minimal integration path documented"
    },
    "body": {
      "ko": "보이스 선택·텍스트 전달·오디오 재생의 세 단계로 예제를 구성했습니다.",
      "en": "Examples follow three steps: choose a voice, submit text, and play audio."
    }
  },
  {
    "id": "partner-integration-1",
    artifacts: [{"service": "drive", "title": {"ko": "파트너 데모 녹화본", "en": "Partner demo recording"}, "url": "https://example.com/artifacts/drive/partner-integration-1"}],
    "streamId": "partner-integration",
    "author": "june",
    "type": "progress",
    "createdAt": "2026-10-14T11:00:00+09:00",
    "title": {
      "ko": "대화 데모 통합 검토",
      "en": "Conversation demo integration reviewed"
    },
    "body": {
      "ko": "가상 프로젝트 Paper Moon에서 응답 중 취소 흐름을 확인했습니다. 중복 재생 방지는 추가 점검합니다.",
      "en": "Reviewed response cancellation in fictional project Paper Moon. Duplicate playback still needs checking."
    }
  },
  {
    "id": "partner-integration-2",
    artifacts: [{"service": "github", "title": {"ko": "재연결 시나리오 PR #61", "en": "Reconnection scenarios PR #61"}, "url": "https://example.com/artifacts/github/partner-integration-2"}],
    "streamId": "partner-integration",
    "author": "june",
    "type": "learning",
    "createdAt": "2026-10-13T11:00:00+09:00",
    "title": {
      "ko": "연결 끊김 시나리오 추가",
      "en": "Disconnection scenarios added"
    },
    "body": {
      "ko": "네트워크 복귀 후 이전 오디오를 다시 재생하지 않도록 시나리오를 정리했습니다.",
      "en": "Documented scenarios to avoid replaying stale audio after network recovery."
    }
  },
  {
    "id": "partner-integration-3",
    "streamId": "partner-integration",
    "author": "alex",
    "type": "decision",
    "createdAt": "2026-10-12T11:00:00+09:00",
    "title": {
      "ko": "파트너 요구사항 정리",
      "en": "Partner requirements organized"
    },
    "body": {
      "ko": "음성 선택 유지와 응답 취소를 첫 연동의 필수 항목으로 합의했습니다.",
      "en": "Persistent voice selection and response cancellation are required for initial integration."
    }
  },
  {
    "id": "voice-reliability-1",
    artifacts: [{"service": "github", "title": {"ko": "재시도 중복 방지 PR #63", "en": "Duplicate retry protection PR #63"}, "url": "https://example.com/artifacts/github/voice-reliability-1"}],
    "streamId": "voice-reliability",
    "author": "alex",
    "type": "blocker",
    "createdAt": "2026-10-14T11:15:00+09:00",
    "title": {
      "ko": "중복 재시도 조건 발견",
      "en": "Duplicate retry condition found"
    },
    "body": {
      "ko": "가상 동시 요청 24개 테스트에서 2개가 중복 처리됐습니다. 타임아웃 이후 재시도 경로를 먼저 보완합니다.",
      "en": "Two of 24 concurrent fictional requests were processed twice. Fix retries after timeout first."
    }
  },
  {
    "id": "voice-reliability-2",
    "streamId": "voice-reliability",
    "author": "alex",
    "type": "learning",
    "createdAt": "2026-10-13T11:15:00+09:00",
    "title": {
      "ko": "응답 지연 관측 추가",
      "en": "Response latency observations added"
    },
    "body": {
      "ko": "가상 테스트의 p95 첫 오디오 지연은 740ms였습니다. 실측 서비스 지표가 아닌 UI 예시입니다.",
      "en": "Fictional test p95 time to first audio was 740ms. This is UI sample data, not a production metric."
    }
  },
  {
    "id": "voice-reliability-3",
    "streamId": "voice-reliability",
    "author": "june",
    "type": "decision",
    "createdAt": "2026-10-12T11:15:00+09:00",
    "title": {
      "ko": "생성 실패 분류 합의",
      "en": "Generation failures categorized"
    },
    "body": {
      "ko": "입력 오류·연결 실패·처리 실패를 구분해 대응 담당자를 정리했습니다.",
      "en": "Separate input, connection, and processing failures for clearer response ownership."
    }
  },
  {
    "id": "icp-messaging-1",
    artifacts: [{"service": "drive", "title": {"ko": "솔루션 페이지 카피", "en": "Solution page copy"}, "url": "https://example.com/artifacts/drive/icp-messaging-1"}],
    "streamId": "icp-messaging",
    "author": "june",
    "type": "progress",
    "createdAt": "2026-10-14T11:30:00+09:00",
    "title": {
      "ko": "솔루션 페이지 문구 검토",
      "en": "Solution page copy reviewed"
    },
    "body": {
      "ko": "기능 나열 대신 캐릭터의 일관된 목소리와 감정 표현을 앞에 배치했습니다.",
      "en": "Lead with consistent character voices and emotional expression instead of feature lists."
    }
  },
  {
    "id": "icp-messaging-2",
    "streamId": "icp-messaging",
    "author": "june",
    "type": "learning",
    "createdAt": "2026-10-13T11:30:00+09:00",
    "title": {
      "ko": "고객 인터뷰 가설 정리",
      "en": "Customer interview hypotheses organized"
    },
    "body": {
      "ko": "가상 인터뷰에서는 첫 연동 난이도와 보이스 개성에 대한 질문을 분리했습니다.",
      "en": "Fictional interviews separate integration difficulty from voice identity."
    }
  },
  {
    "id": "icp-messaging-3",
    "streamId": "icp-messaging",
    "author": "hana",
    "type": "decision",
    "createdAt": "2026-10-12T11:30:00+09:00",
    "title": {
      "ko": "핵심 고객 시나리오 선택",
      "en": "Core customer scenario selected"
    },
    "body": {
      "ko": "초기 메시지는 캐릭터 에이전트 제작자의 음성 도입에 집중하기로 했습니다.",
      "en": "Initial messaging focuses on voice adoption by character-agent builders."
    }
  },
  {
    "id": "voice-discovery-1",
    artifacts: [{"service": "instagram", "title": {"ko": "Starling 보이스 소개 릴스", "en": "Starling voice introduction reel"}, "url": "https://example.com/artifacts/instagram/voice-discovery-1"}, {"service": "drive", "title": {"ko": "릴스 최종 편집본·썸네일", "en": "Final reel edit & thumbnail"}, "url": "https://example.com/artifacts/drive/voice-discovery-1"}],
    "streamId": "voice-discovery",
    "author": "hana",
    "type": "progress",
    "createdAt": "2026-10-14T12:00:00+09:00",
    "title": {
      "ko": "Starling 보이스 소개 릴스 업로드",
      "en": "Starling voice introduction reel published"
    },
    "body": {
      "ko": "가상 캐릭터 Starling의 24초 소개 릴스와 썸네일을 제작했습니다. 업로드 예시와 최종 편집본을 연결하고 보이스 체험 CTA를 넣었습니다.",
      "en": "Created a 24-second introduction reel and thumbnail for fictional character Starling. Linked the example upload and final edit with a voice trial CTA."
    }
  },
  {
    "id": "voice-discovery-2",
    artifacts: [{"service": "drive", "title": {"ko": "체험 전환 분석 시트", "en": "Trial conversion analysis"}, "url": "https://example.com/artifacts/drive/voice-discovery-2"}],
    "streamId": "voice-discovery",
    "author": "hana",
    "type": "learning",
    "createdAt": "2026-10-13T12:00:00+09:00",
    "title": {
      "ko": "체험 버튼 위치 비교",
      "en": "Trial action placement compared"
    },
    "body": {
      "ko": "가상 방문 320회에서 체험 클릭률 12.5%를 기록했습니다. 실제 유입 성과가 아닌 비교용 예시입니다.",
      "en": "A fictional 320-visit sample shows a 12.5% trial click rate; this is not actual acquisition performance."
    }
  },
  {
    "id": "voice-discovery-3",
    artifacts: [{"service": "instagram", "title": {"ko": "보이스 캐릭터 티저", "en": "Voice character teaser"}, "url": "https://example.com/artifacts/instagram/voice-discovery-3"}],
    "streamId": "voice-discovery",
    "author": "june",
    "type": "decision",
    "createdAt": "2026-10-12T12:00:00+09:00",
    "title": {
      "ko": "보이스 캐릭터 티저 편집",
      "en": "Voice character teaser edited"
    },
    "body": {
      "ko": "목소리 설명과 짧은 대사를 함께 보여주도록 구성했습니다.",
      "en": "Pair each voice description with a short spoken example."
    }
  },
  {
    "id": "workspace-billing-1",
    artifacts: [{"service": "github", "title": {"ko": "결제 재시도 흐름 PR #68", "en": "Payment retry flow PR #68"}, "url": "https://example.com/artifacts/github/workspace-billing-1"}],
    "streamId": "workspace-billing",
    "author": "june",
    "type": "progress",
    "createdAt": "2026-10-14T12:15:00+09:00",
    "title": {
      "ko": "결제 실패 후 복구 흐름 검토",
      "en": "Payment recovery flow reviewed"
    },
    "body": {
      "ko": "실패한 결제를 재시도해도 같은 요청이 중복 처리되지 않는 시나리오를 정리했습니다.",
      "en": "Documented a scenario where retrying a failed payment does not duplicate the request."
    }
  },
  {
    "id": "workspace-billing-2",
    "streamId": "workspace-billing",
    "author": "june",
    "type": "learning",
    "createdAt": "2026-10-13T12:15:00+09:00",
    "title": {
      "ko": "크레딧 부족 안내 초안",
      "en": "Low-credit guidance drafted"
    },
    "body": {
      "ko": "가상 잔액 180포인트와 예상 사용량 240포인트를 함께 보여주도록 했습니다.",
      "en": "Display fictional balance of 180 points alongside an estimated usage of 240 points."
    }
  },
  {
    "id": "workspace-billing-3",
    "streamId": "workspace-billing",
    "author": "alex",
    "type": "decision",
    "createdAt": "2026-10-12T12:15:00+09:00",
    "title": {
      "ko": "팀 첫 생성 흐름 점검",
      "en": "Team first-generation flow reviewed"
    },
    "body": {
      "ko": "조직 선택과 보이스 선택을 거쳐 생성까지 이어지는 경로를 점검했습니다.",
      "en": "Reviewed organization selection, voice selection, and generation."
    }
  },
  {
    "id": "fundraising-1",
    artifacts: [{"service": "drive", "title": {"ko": "IR 후속 질문 정리", "en": "IR follow-up questions"}, "url": "https://example.com/artifacts/drive/fundraising-1"}],
    "streamId": "fundraising",
    "author": "robin",
    "type": "progress",
    "createdAt": "2026-10-14T12:30:00+09:00",
    "title": {
      "ko": "후속 질문과 답변 초안 정리",
      "en": "Follow-up answers drafted"
    },
    "body": {
      "ko": "가상 투자사 North Pier의 질문을 제품 차별성·도입 경로·확장성으로 묶었습니다.",
      "en": "Grouped fictional investor North Pier questions into differentiation, adoption, and scalability."
    }
  },
  {
    "id": "fundraising-2",
    "streamId": "fundraising",
    "author": "robin",
    "type": "learning",
    "createdAt": "2026-10-13T12:30:00+09:00",
    "title": {
      "ko": "IR 데모 흐름 검토",
      "en": "IR demo flow reviewed"
    },
    "body": {
      "ko": "제품 소개 뒤에 캐릭터 음성 비교를 배치해 설명과 체험을 연결합니다.",
      "en": "Place a character voice comparison after the product introduction."
    }
  },
  {
    "id": "fundraising-3",
    "streamId": "fundraising",
    "author": "hana",
    "type": "decision",
    "createdAt": "2026-10-12T12:30:00+09:00",
    "title": {
      "ko": "투자 논의 자료 구성",
      "en": "Fundraising materials organized"
    },
    "body": {
      "ko": "팀의 미션과 고객 문제, 제품 경험 순서로 자료를 구성했습니다.",
      "en": "Organized materials around mission, customer problems, and product experience."
    }
  },
  {
    "id": "cash-planning-1",
    artifacts: [{"service": "drive", "title": {"ko": "가상 예산 시나리오", "en": "Fictional budget scenarios"}, "url": "https://example.com/artifacts/drive/cash-planning-1"}],
    "streamId": "cash-planning",
    "author": "robin",
    "type": "progress",
    "createdAt": "2026-10-14T13:00:00+09:00",
    "title": {
      "ko": "실험·제작 예산 조율 요청",
      "en": "Experiment and production budgets need alignment"
    },
    "body": {
      "ko": "가상 월 예산 4200만원 중 음성 제작과 평가 비용의 배분을 결정해야 합니다. 실제 회사 재무 수치가 아닙니다.",
      "en": "Allocate voice production and evaluation within a fictional monthly budget of KRW 42 million. These are not actual company finances."
    }
  },
  {
    "id": "cash-planning-2",
    "streamId": "cash-planning",
    "author": "robin",
    "type": "learning",
    "createdAt": "2026-10-13T13:00:00+09:00",
    "title": {
      "ko": "운영 시나리오 비교",
      "en": "Operating scenarios compared"
    },
    "body": {
      "ko": "가상 시나리오별 예상 운영 기간을 7.5개월과 9개월로 비교했습니다. 예시 가정이며 실제 현금흐름과 무관합니다.",
      "en": "Compared fictional runway assumptions of 7.5 and 9 months, unrelated to actual cash flow."
    }
  },
  {
    "id": "cash-planning-3",
    "streamId": "cash-planning",
    "author": "alex",
    "type": "decision",
    "createdAt": "2026-10-12T13:00:00+09:00",
    "title": {
      "ko": "비용 항목 정리",
      "en": "Cost categories organized"
    },
    "body": {
      "ko": "고정 운영비·음성 제작비·실험비를 분리해 팀이 조정할 수 있는 범위를 표시했습니다.",
      "en": "Separated fixed operations, voice production, and experiments to show adjustable spending."
    }
  }
];


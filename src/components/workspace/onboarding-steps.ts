import { text, type Localized } from "@/lib/messages";

export type TourStep = { target: string; title: string; body: Localized; nav?: boolean };
export const tourKey = "corridor:onboarding:v1:";
export const tabTours = [
  { path: "/my-work", title: "My Work", body: text("내가 참여하는 업무와 개인 기록을 모아봅니다. 마지막 작업의 맥락을 이어가세요.", "Find your workstreams and private notes, and pick up where you left off.") },
  { path: "/live-feed", title: "Live Feed", body: text("팀원들이 남긴 Changes를 시간순으로 확인합니다. 팀의 새로운 움직임을 따라가세요.", "Follow your team's changes in chronological order.") },
  { path: "/workstreams", title: "Workstreams", body: text("업무별 목적, 현재 상태, 최근 변화를 탐색하고 함께 논의합니다.", "Explore the purpose, current state, and recent changes of each workstream.") },
  { path: "/mission-control", title: "Mission Control", body: text("팀 전체의 상황을 한눈에 확인하고, 결정과 조율이 필요한 문제를 발견합니다.", "See the whole team's situation and find issues that need a decision or coordination.") },
  { path: "/team-focus", title: "Team Focus", body: text("팀의 미션과 목표, 목표에 연결된 Workstreams를 확인합니다.", "Explore your team's mission, goals, and related workstreams.") },
  { path: "/connect", title: "Connect", body: text("Codex 또는 Claude Code를 연결하는 방법을 확인합니다.", "Learn how to connect Codex or Claude Code to Corridor.") },
];
export const navigationSteps: TourStep[] = tabTours.map((tab) => ({
  target: `.sidebar a[href="${tab.path}"]`, title: tab.title, body: tab.body, nav: true,
}));
export const pageSteps: Record<string, TourStep[]> = {
  "/mission-control": [
    { target: ".mission-goals", title: "Goals", body: text("목표 카드를 선택하면 관련 Workstreams와 주의 사항만 모아볼 수 있습니다. 다시 누르면 전체를 표시합니다.", "Select a goal to filter workstreams and attention items. Select it again to see everything.") },
    { target: ".page > .section", title: "Attention Needed", body: text("업무 간 병목, 특정 팀원에게 몰린 업무, 위험처럼 팀 차원의 판단이 필요한 사항입니다.", "Find bottlenecks, uneven workloads, and risks that need team-wide attention.") },
    { target: ".pic-row", title: "Workstreams", body: text("PIC별로 업무를 모았습니다. 카드를 좌우로 넘기며 각 업무의 최근 Changes를 확인하세요.", "Browse workstreams grouped by PIC. Scroll cards horizontally to see their latest changes.") },
  ],
  "/my-work": [
    { target: ".stream-list .my-stream", title: "My Workstreams", body: text("내가 PIC이거나 참여 중인 업무입니다. 최근 Change와 내가 마지막으로 남긴 기록을 함께 확인합니다.", "See workstreams you own or participate in, with the latest change and your last contribution.") },
    { target: ".note-grid", title: "Personal Notes", body: text("나만 볼 수 있는 업무 기록입니다. 노트를 열어 맥락을 복원하고 메모 작성으로 기록을 남기세요.", "These notes are private to you. Open a note to restore context or write a new one.") },
    { target: ".captured-panel", title: "Captured Activities", body: text("연결한 에이전트의 개인 활동이 모이는 공간입니다. 팀에 공유할 내용은 직접 검토하고 선택합니다.", "A place for personal activity from your connected agents. Review and choose what to share.") },
  ],
  "/live-feed": [
    { target: ".feed-panel .change-row", title: "Changes", body: text("새로운 Change가 위에 쌓입니다. 제목을 눌러 상세 내용을 보고, 우측 서비스 아이콘으로 산출물을 열어보세요.", "New changes appear at the top. Open a title for details or a service icon for its artifact.") },
  ],
  "/workstreams": [
    { target: ".filter-bar", title: "Filters", body: text("목표, PIC, 참여자, 상태로 원하는 업무를 좁혀보세요.", "Filter work by goal, PIC, participant, or status.") },
    { target: ".workstream-card", title: "Workstream", body: text("카드에서 현재 상태와 담당자를 확인하고, 클릭해서 업무의 맥락과 타임라인을 살펴보세요.", "Check the current state and owner, then open the card for context and a timeline.") },
  ],
  "/team-focus": [
    { target: ".mission-statement", title: "Mission", body: text("팀이 무엇을 위해 일하는지 공유하는 장기적인 방향입니다.", "The long-term direction that explains why your team does its work.") },
    { target: ".goal-card", title: "Current Goals", body: text("현재 달성하려는 목표와 연결된 Workstreams입니다. 업무 링크를 눌러 실행 상황을 확인하세요.", "Explore current goals and their related workstreams. Open a workstream to see progress.") },
  ],
  "/connect": [
    { target: ".connect-clients", title: "Codex · Claude Code", body: text("사용하는 에이전트를 선택하면 해당 도구의 설치 명령어가 표시됩니다.", "Choose your agent to see its installation commands.") },
    { target: ".connect-terminal", title: "MCP", body: text("명령어를 복사하고, 아래 안내에 따라 계정과 조직을 연결하세요.", "Copy the commands, then follow the account and organization connection steps below.") },
  ],
  "/workstreams/detail": [
    { target: ".context-bar", title: "Context", body: text("업무의 PIC, 참여자, 연결된 목표를 확인합니다.", "See the workstream's PIC, participants, and linked goal.") },
    { target: ".current-state", title: "Current State", body: text("지금의 상황과 다음 방향을 확인합니다.", "Read the current situation and next direction.") },
    { target: ".dashboard-columns .panel", title: "Timeline", body: text("업무의 주요 변화를 시간순으로 확인하고 업데이트를 남깁니다.", "Review key changes over time and add updates.") },
    { target: ".discussion-panel", title: "Discussion", body: text("댓글과 멘션으로 업무에 대한 질문과 의견을 나눕니다.", "Discuss the work through comments and mentions.") },
  ],
};

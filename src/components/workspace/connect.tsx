"use client";

import { useState } from "react";
import { Check, Copy, Terminal, Plug, ArrowRight, Layers3, LockKeyhole } from "lucide-react";
import { useWorkspace } from "./provider";
import "./connect.css";

const copy = {
  ko: {
    title: "에이전트와 업무를 연결하세요",
    intro: "작업하던 곳에서 팀의 맥락을 읽고, 중요한 변화를 Corridor에 남기세요.",
    install: "플러그인 설치", terminal: "터미널에서 실행", copy: "명령어 복사", copied: "복사됨",
    failed: "복사할 수 없습니다. 명령어를 선택해 복사하세요.",
    source: "<marketplace-repository>와 <marketplace>에 플러그인 저장소와 마켓플레이스 이름을 입력하세요.",
    account: "계정 연결", accountBody: "에이전트에서 Corridor에 연결해 달라고 요청하고, 브라우저에서 로그인하세요.",
    organization: "조직 선택", organizationBody: "함께 작업할 조직을 선택하고, 연결할 Workstream을 지정하세요.",
    prompt: "이렇게 시작하세요", example: "내 Workstream의 최근 변화를 확인하고, 이번 작업 내용을 Change로 정리해줘.",
    context: "팀의 맥락", contextBody: "목표와 Workstream의 현재 상태를 작업 중인 에이전트에서 확인합니다.",
    changes: "작업에서 Change로", changesBody: "완료한 작업과 산출물을 정리하고, 검토한 내용을 팀에 공유합니다.",
    private: "내 기록은 나에게", privateBody: "개인 활동과 노트는 비공개로 관리하고, 공유할 내용을 직접 선택합니다.",
  },
  en: {
    title: "Connect your agent to your work",
    intro: "Bring team context into your tools and share meaningful changes with Corridor.",
    install: "Install the plugin", terminal: "Run in your terminal", copy: "Copy commands", copied: "Copied",
    failed: "Unable to copy. Select and copy the commands manually.",
    source: "Replace <marketplace-repository> and <marketplace> with the plugin repository and marketplace name.",
    account: "Connect your account", accountBody: "Ask your agent to connect to Corridor, then sign in through your browser.",
    organization: "Choose your organization", organizationBody: "Choose the organization you work with and the Workstream to connect.",
    prompt: "Start a conversation", example: "Check recent changes in my Workstreams and summarize this session as a Change.",
    context: "Team context", contextBody: "Read goals and the current state of your Workstreams from your agent.",
    changes: "From work to Change", changesBody: "Summarize your work and artifacts, then review what you share with the team.",
    private: "Your notes stay yours", privateBody: "Keep activities and notes private, and choose what to share.",
  },
};

export function Connect() {
  const { locale } = useWorkspace();
  const t = copy[locale];
  const [client, setClient] = useState("Codex");
  const [feedback, setFeedback] = useState<"copied" | "failed" | null>(null);
  // Placeholder distribution identifiers until the plugin package is published.
  const commands = client === "Codex"
    ? "codex plugin marketplace add <marketplace-repository>\ncodex plugin add corridor@<marketplace>"
    : "claude plugin marketplace add <marketplace-repository>\nclaude plugin install corridor@<marketplace>";

  async function copyCommands() {
    try {
      await navigator.clipboard.writeText(commands);
      setFeedback("copied");
    } catch {
      setFeedback("failed");
    }
  }

  return (
    <div className="connect-page">
      <section className="connect-intro">
        <span className="connect-symbol"><Plug size={28} /></span>
        <div><span className="tiny-label muted">CORRIDOR × MCP</span><h2>{t.title}</h2><p>{t.intro}</p></div>
      </section>
      <div className="connect-layout">
        <section className="connect-setup" aria-label={t.install}>
          <div className="connect-step-title"><span>01</span><h3>{t.install}</h3></div>
          <div className="connect-clients" role="group" aria-label="Agent">
            {["Codex", "Claude Code"].map((name) => <button key={name} aria-pressed={client === name} onClick={() => { setClient(name); setFeedback(null); }}><Terminal size={17} />{name}</button>)}
          </div>
          <div className="connect-terminal">
            <div className="connect-terminal-bar"><span>{t.terminal}</span><button onClick={copyCommands} aria-label={t.copy}>{feedback === "copied" ? <Check size={16} /> : <Copy size={16} />}{feedback === "copied" ? t.copied : t.copy}</button></div>
            <pre><code>{commands}</code></pre>
          </div>
          <p className="connect-source">{t.source}</p>
          <span className="sr-only" role="status">{feedback ? t[feedback] : ""}</span>
          {feedback === "failed" && <p role="alert">{t.failed}</p>}
          <div className="connect-step"><div className="connect-step-title"><span>02</span><h3>{t.account}</h3></div><p>{t.accountBody}</p></div>
          <div className="connect-step"><div className="connect-step-title"><span>03</span><h3>{t.organization}</h3></div><p>{t.organizationBody}</p></div>
        </section>
        <aside className="connect-context">
          {[
            { icon: Layers3, title: t.context, body: t.contextBody },
            { icon: ArrowRight, title: t.changes, body: t.changesBody },
            { icon: LockKeyhole, title: t.private, body: t.privateBody },
          ].map(({ icon: Icon, title, body }) => <div className="connect-feature" key={title}><Icon size={19} /><div><h3>{title}</h3><p>{body}</p></div></div>)}
          <div className="connect-prompt"><span className="tiny-label muted">{t.prompt}</span><p>“{t.example}”</p></div>
        </aside>
      </div>
    </div>
  );
}

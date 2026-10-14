"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  MessageCircle,
  Users,
  TriangleAlert,
  GitBranch,
  CircleHelp,
} from "lucide-react";
import { people, viewerId, myWorkChanges, type Stream, type Update, type TeamAttention } from "@/lib/demo-data";
import { useWorkspace } from "./provider";
import { Avatar, Modal, Status } from "./primitives";
import { formatTime } from "@/lib/format-time";

function ArtifactLinks({ item, expanded = false }: { item: Update; expanded?: boolean }) {
  const { locale } = useWorkspace();
  const services = {
    github: "GitHub PR",
    drive: "Google Drive",
    instagram: "Instagram",
  };
  if (!item.artifacts?.length) return null;
  return (
    <span className={`change-artifacts ${expanded ? "expanded" : ""}`}>
      {item.artifacts.map((artifact) => {
        const name = services[artifact.service];
        const label = `${name}: ${artifact.title[locale]} (${locale === "ko" ? "예시 링크 · 새 탭" : "example link · new tab"})`;
        return (
          <a key={artifact.url} href={artifact.url} target="_blank" rel="noopener noreferrer"
            className={`artifact-link ${artifact.service}`} aria-label={label} title={label}>
            <Image src={`/service-logos/${artifact.service}.svg`} width={18} height={18} alt="" className="service-logo" />
            {expanded && <span>{artifact.title[locale]}</span>}
          </a>
        );
      })}
    </span>
  );
}

export function StreamRows({ items }: { items: Stream[] }) {
  const { t, locale, data } = useWorkspace();
  return (
    <div className="stream-list">
      {items.length ? (
        items.map((item) => {
          const { latest, mine } = myWorkChanges(data.updates, item.id, viewerId);
          return (
            <article className="my-stream" key={item.id} aria-label={item.title[locale]}>
            <Link
              className="stream-row"
              href={`/workstreams/${item.id}`}
            >
              <span className="stream-symbol">
                <GitBranch size={18} />
              </span>
              <div className="stream-description">
                <div className="stream-title">
                  <h3>{item.title[locale]}</h3>
                  <span className="stream-code">{item.code}</span>
                </div>
                <p>{item.state[locale]}</p>
              </div>
              <div className="stream-meta">
                <Status status={item.status} />
                <span className="person">
                  <Avatar id={item.pic} small />
                  <span>
                    {people.find((person) => person.id === item.pic)?.name}
                  </span>
                </span>
              </div>
              <ArrowUpRight size={16} className="row-arrow" />
            </Link>
            <Changes items={latest ? [latest] : []} timeline />
            {mine && <div className="my-last-change">
              <span className="tiny-label muted">{t.myLastChange}</span>
              <Changes items={[mine]} timeline />
            </div>}
            </article>
          );
        })
      ) : (
        <p className="empty-state">{t.empty}</p>
      )}
    </div>
  );
}

export function Changes({
  items,
  compact = false,
  timeline = false,
}: {
  items: Update[];
  compact?: boolean;
  timeline?: boolean;
}) {
  const { t, locale, data, now } = useWorkspace();
  const [selected, setSelected] = useState<Update | null>(null);
  return (
    <>
      <div className={`change-list ${compact ? "compact" : ""} ${timeline ? "change-timeline" : ""}`}>
        {items.length ? (
          items.map((item) => {
            const stream = data.streams.find(
              (stream) => stream.id === item.streamId,
            )!;
            return (
              <article className={`change-row ${item.id.startsWith("demo-") ? "demo-arrival" : ""}`} key={item.id} id={timeline ? undefined : item.id}>
                <Avatar id={item.author} small />
                <div>
                  <div className="change-meta">
                    <strong>
                      {people.find((person) => person.id === item.author)?.name}
                    </strong>
                    <span className={`update-kind ${item.type}`}>
                      {t[item.type]}
                    </span>
                    <time dateTime={item.createdAt} title={formatTime(item.createdAt, locale, null)}>{formatTime(item.createdAt, locale, now)}</time>
                  </div>
                  <button
                    className="change-title"
                    onClick={() => setSelected(item)}
                  >
                    {item.title[locale]}
                  </button>
                  {!timeline && <Link
                    className="change-stream"
                    href={`/workstreams/${stream.id}`}
                  >
                    <GitBranch size={12} />
                    {stream.title[locale]}
                  </Link>}
                </div>
                <ArtifactLinks item={item} />
              </article>
            );
          })
        ) : (
          <p className="empty-state">{t.emptyChanges}</p>
        )}
      </div>
      {selected && (
        <Modal title={t.readUpdate} onClose={() => setSelected(null)}>
          <div className="update-detail">
            <span className={`update-kind ${selected.type}`}>
              {t[selected.type]}
            </span>
            <h3>{selected.title[locale]}</h3>
            <p>{selected.body[locale]}</p>
            <ArtifactLinks item={selected} expanded />
            <div className="update-detail-footer">
              <Link
                className="text-link"
                href={`/workstreams/${selected.streamId}`}
                onClick={() => setSelected(null)}
              >
                {t.workstream}
                <ArrowRight size={16} />
              </Link>
              <Link
                className="text-link"
                href={`/workstreams/${selected.streamId}#discussion`}
                onClick={() => setSelected(null)}
              >
                <MessageCircle size={16} />
                {t.discussion}
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export function Attention({ items }: { items: TeamAttention[] }) {
  const { t, locale, data } = useWorkspace();
  const [selected, setSelected] = useState<TeamAttention | null>(null);
  return (
    <>
      <div className="attention-grid">
        {items.length ? (
          items.map((item) => {
            const Icon =
              item.kind === "decision"
                ? CircleHelp
                : item.kind === "workload"
                  ? Users
                  : TriangleAlert;
            return (
              <button
                className={`attention-card ${item.kind}`}
                key={item.id}
                onClick={() => setSelected(item)}
              >
                <span className="attention-top">
                  <span className="attention-label">
                    <Icon size={16} />
                    {t[item.kind]}
                  </span>
                  <ArrowUpRight size={16} />
                </span>
                <h3>{item.title[locale]}</h3>
                <p className="attention-impact">{item.impact[locale]}</p>
                <span className="attention-bottom">
                  <span>{t.manualSignal}</span>
                  <span className="member-avatars">
                    {item.peopleIds.map((id) => <Avatar id={id} key={id} small />)}
                  </span>
                </span>
              </button>
            );
          })
        ) : (
          <p className="empty-state">{t.attentionClear}</p>
        )}
      </div>
      {selected && (
        <Modal title={t.attention} onClose={() => setSelected(null)}>
          <div className="update-detail">
            <h3>{selected.title[locale]}</h3>
            <p>{selected.impact[locale]}</p>
            <h4>{t.signalEvidence}</h4>
            <p>{selected.evidence[locale]}</p>
            <h4>{t.teamDiscussion}</h4>
            <p>{selected.discussion[locale]}</p>
            <h4>{t.related}</h4>
            <div className="attention-related">
              {data.streams.filter((stream) => selected.streamIds.includes(stream.id)).map((stream) => (
                <Link className="text-link" href={`/workstreams/${stream.id}#discussion`} key={stream.id}>
                  {stream.title[locale]}<ArrowRight size={16} />
                </Link>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

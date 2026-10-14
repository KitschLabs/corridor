"use client";

import { Button } from "@/components/ui/button";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  FileText,
  LockKeyhole,
  Radio,
  Crosshair,
  Sparkles,
  PenLine,
} from "lucide-react";
import { people, viewerId, recentStreamUpdates } from "@/lib/demo-data";
import { useWorkspace } from "./provider";
import { Avatar, Composer, PageHeading, SectionHeading, Modal } from "./primitives";
import { Attention, Changes, StreamRows } from "./sections";
import { formatTime } from "@/lib/format-time";

function PicRow({ pic, count, children }: { pic: string; count: number; children: ReactNode }) {
  const { t } = useWorkspace();
  const ref = useRef<HTMLDivElement>(null);
  const name = people.find((person) => person.id === pic)?.name;
  return (
    <section className="pic-row" aria-label={`PIC: ${name}`}>
      <header className="pic-row-heading">
        <Avatar id={pic} small /><h3>{name}</h3>
        <span className="tiny-label muted">PIC</span><span className="count-label">{count}</span>
        <div className="board-actions">
          <button className="icon-button" aria-label={t.scrollLeft} onClick={() => ref.current?.scrollBy({ left: -ref.current.clientWidth * .8 })}><ArrowLeft size={18} /></button>
          <button className="icon-button" aria-label={t.scrollRight} onClick={() => ref.current?.scrollBy({ left: ref.current.clientWidth * .8 })}><ArrowRight size={18} /></button>
        </div>
      </header>
      <div className="pic-cards" ref={ref} role="region" aria-label={`${name} Workstreams`} tabIndex={0}>{children}</div>
    </section>
  );
}

export function MissionControl() {
  const { t, locale, data } = useWorkspace();
  const [goalId, setGoalId] = useState<string | null>(null);
  const selectedGoal = data.goals.find((goal) => goal.id === goalId);
  const streams = data.streams.filter((stream) => !selectedGoal || stream.goalId === selectedGoal.id);
  const streamIds = new Set(streams.map((stream) => stream.id));
  const attention = data.attention.filter((item) =>
    !selectedGoal || item.streamIds.some((id) => streamIds.has(id)),
  );
  return (
    <div className="page">
      <section aria-label="Goals">
        <SectionHeading title="Goals" href="/team-focus" />
        <div className="mission-goals">
          {data.goals.map((goal) => {
            const selected = selectedGoal?.id === goal.id;
            return (
              <button
                key={goal.id}
                className="mission-goal"
                aria-pressed={selected}
                aria-label={goal.title[locale]}
                onClick={() => setGoalId(selected ? null : goal.id)}
              >
                <span className="mission-goal-top">
                  <Crosshair size={18} />
                </span>
                <span className="mission-goal-title">{goal.title[locale]}</span>
                <span className="mission-goal-description">{goal.description[locale]}</span>
              </button>
            );
          })}
          {!data.goals.length && <p className="empty-state">{t.emptyGoals}</p>}
        </div>
      </section>
      <section className="section">
        <SectionHeading
          title="Attention Needed"

          action={
            <span className="count-label">
              {attention.length}
            </span>
          }
        />
        <Attention items={attention} key={goalId ?? "all"} />
      </section>
      <section className="section">
        <SectionHeading title="Workstreams" href="/workstreams" />
        <div className="stream-timelines" key={goalId ?? "all"} role="region" aria-label={t.picWorkstreams}>
          {[...new Set(streams.map((stream) => stream.pic))].map((pic) => (
            <PicRow pic={pic} count={streams.filter((stream) => stream.pic === pic).length} key={pic}>
          {streams.filter((stream) => stream.pic === pic).map((stream) => (
            <article className="panel stream-timeline" key={stream.id}>
              <header className="stream-timeline-heading">
                <h3><Link href={`/workstreams/${stream.id}`}>{stream.title[locale]}<ArrowRight size={16} /></Link></h3>
                <p>{stream.description[locale]}</p>
              </header>
              <Changes items={recentStreamUpdates(data.updates, stream.id)} timeline />
            </article>
          ))}
            </PicRow>
          ))}
          {!streams.length && <p className="empty-state">{t.empty}</p>}
        </div>
      </section>
    </div>
  );
}

export function MyWork() {
  const { t, locale, data, now } = useWorkspace();
  const [compose, setCompose] = useState(false);
  const [selectedNote, setSelectedNote] = useState<
    (typeof data.notes)[number] | null
  >(null);
  const personalStreams = data.streams.filter(
    (stream) => stream.pic === viewerId || stream.members.includes(viewerId),
  );
  return (
    <div className="page">
      <PageHeading

        action={
          <Button className="primary-button" onClick={() => setCompose(true)}>
            <Plus size={17} />
            {t.noteAction}
          </Button>
        }
      />
      <section className="panel">
        <SectionHeading title="My Workstreams" />
        <StreamRows items={personalStreams} />
      </section>
      <div className="dashboard-columns lower-columns">
        <section className="panel">
          <SectionHeading
            title="Personal Notes"

            action={<LockKeyhole size={17} className="muted" />}
          />
          <div className="note-grid">
            {data.notes.length ? (
              data.notes.map((note) => (
                <button
                  key={note.id}
                  id={note.id}
                  className="note-card"
                  onClick={() => setSelectedNote(note)}
                >
                  <FileText size={21} />
                  <h3>{note.title[locale]}</h3>
                  <p>{note.body[locale].replace(/[#\n-]/g, " ")}</p>
                  <small><time dateTime={note.updatedAt} title={formatTime(note.updatedAt, locale, null)}>{formatTime(note.updatedAt, locale, now)}</time></small>
                </button>
              ))
            ) : (
              <p className="empty-state">{t.emptyNotes}</p>
            )}
          </div>
          <p className="privacy-caption">
            <LockKeyhole size={13} />
            {t.noteHint}
          </p>
        </section>
        <section className="panel captured-panel">
          <SectionHeading title="Captured Activities" />
          <div className="captured-empty">
            <span className="capture-icon">
              <Radio size={26} />
            </span>
            <h3>{t.capturedTitle}</h3>
            <p>{t.capturedBody}</p>
            <span className="connection-status">
              <span />
              {t.notConnected}
            </span>
            <button className="text-link" onClick={() => setCompose(true)}>
              <PenLine size={14} />
              {t.noteAction}
            </button>
          </div>
        </section>
      </div>
      {compose && (
        <Composer title={t.noteAction} onClose={() => setCompose(false)} />
      )}
      {selectedNote && (
        <Modal
          title={selectedNote.title[locale]}
          onClose={() => setSelectedNote(null)}
        >
          <div className="note-preview">
            <span className="private-label">
              <LockKeyhole size={13} />
              {t.private}
            </span>
            <pre>{selectedNote.body[locale]}</pre>
            <p className="notice">{t.previewOnly}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function TeamFocus() {
  const { t, locale, data } = useWorkspace();
  const [compose, setCompose] = useState<string | null>(null);
  return (
    <div className="page">
      <PageHeading

        action={
          <Button
            className="secondary-button"
            onClick={() => setCompose(t.newGoal)}
          >
            <Plus size={17} />
            {t.newGoal}
          </Button>
        }
      />
      <section className="mission-statement">
        <div className="mission-label">
          <Crosshair size={18} />
          <span>MISSION</span>
          <button
            className="icon-button"
            aria-label={t.edit}
            onClick={() => setCompose(t.mission)}
          >
            <PenLine size={17} />
          </button>
        </div>
        <h2>{t.focusStatement}</h2>
        <p>{t.missionBody}</p>
        <span className="mission-accent" />
      </section>
      <section className="section">
        <SectionHeading title="Current Goals" />
        <div className="goals-list">
          {data.goals.map((goal) => (
            <article className="goal-card" id={goal.id} key={goal.id}>
              <div className="goal-heading">
                <button
                  className="icon-button"
                  aria-label={`${t.edit}: ${goal.title[locale]}`}
                  onClick={() => setCompose(goal.title[locale])}
                >
                  <PenLine size={16} />
                </button>
              </div>
              <h3>{goal.title[locale]}</h3>
              <p>{goal.description[locale]}</p>
              <div className="goal-streams">
                <span className="tiny-label">RELATED WORKSTREAMS</span>
                {data.streams
                  .filter((stream) => stream.goalId === goal.id)
                  .map((stream) => (
                    <Link href={`/workstreams/${stream.id}`} key={stream.id}>
                      <span>
                        <Sparkles size={14} />
                        {stream.title[locale]}
                      </span>
                      <ArrowRight size={16} />
                    </Link>
                  ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      {compose && <Composer title={compose} onClose={() => setCompose(null)} />}
    </div>
  );
}

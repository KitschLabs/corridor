"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  ArrowLeft,
  ArrowUpRight,
  GitBranch,
  PenLine,
  MessageCircle,
} from "lucide-react";
import { people } from "@/lib/demo-data";
import { useWorkspace } from "./provider";
import {
  Avatar,
  Composer,
  PageHeading,
  SectionHeading,
  Status,
} from "./primitives";
import { Changes } from "./sections";

export function Workstreams() {
  const { t, locale, data } = useWorkspace();
  const [goal, setGoal] = useState("");
  const [pic, setPic] = useState("");
  const [member, setMember] = useState("");
  const [status, setStatus] = useState("");
  const [compose, setCompose] = useState(false);
  const filtered = data.streams.filter(
    (item) =>
      (!goal || item.goalId === goal) &&
      (!pic || item.pic === pic) &&
      (!member || item.pic === member || item.members.includes(member)) &&
      (!status || item.status === status),
  );
  return (
    <div className="page">
      <PageHeading
       
        action={
          <Button className="primary-button" onClick={() => setCompose(true)}>
            <Plus size={17} />
            {t.newStream}
          </Button>
        }
      />
      <div className="filter-bar">
        <select
          aria-label={t.goal}
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
        >
          <option value="">{t.allGoals}</option>
          {data.goals.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title[locale]}
            </option>
          ))}
        </select>
        <select
          aria-label={t.pic}
          value={pic}
          onChange={(event) => setPic(event.target.value)}
        >
          <option value="">{t.allPics}</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
        <select
          aria-label={t.members}
          value={member}
          onChange={(event) => setMember(event.target.value)}
        >
          <option value="">{t.allMembers}</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
        <select
          aria-label={t.status}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">{t.allStatuses}</option>
          {(["active", "paused", "completed", "archived"] as const).map(
            (item) => (
              <option key={item} value={item}>
                {t[item]}
              </option>
            ),
          )}
        </select>
        {(goal || pic || member || status) && (
          <button
            className="text-link clear-filter"
            onClick={() => {
              setGoal("");
              setPic("");
              setMember("");
              setStatus("");
            }}
          >
            {t.clear}
          </button>
        )}
      </div>
      <div className="results-heading">
        <span>
          All Workstreams <span className="count-label">{filtered.length}</span>
        </span>
        <span className="muted">{t.shared}</span>
      </div>
      <div className="workstream-grid">
        {filtered.length ? (
          filtered.map((stream) => (
            <Link
              href={`/workstreams/${stream.id}`}
              className="workstream-card"
              key={stream.id}
            >
              <div className="workstream-card-top">
                <span className="stream-symbol">
                  <GitBranch size={19} />
                </span>
                <Status status={stream.status} />
              </div>
              <span className="stream-code">{stream.code}</span>
              <h2>{stream.title[locale]}</h2>
              <p>{stream.state[locale]}</p>
              <div className="card-goal">
                <span>{t.goal}</span>
                {
                  data.goals.find((goal) => goal.id === stream.goalId)?.title[
                    locale
                  ]
                }
              </div>
              <div className="workstream-card-footer">
                <span className="person">
                  <Avatar id={stream.pic} small />
                  <strong>
                    {people.find((person) => person.id === stream.pic)?.name}
                  </strong>
                  <small>PIC</small>
                </span>
                <div className="member-avatars">
                  {stream.members
                    .filter((id) => id !== stream.pic)
                    .map((id) => (
                      <Avatar key={id} id={id} small />
                    ))}
                </div>
                <ArrowUpRight size={17} />
              </div>
            </Link>
          ))
        ) : (
          <div className="panel empty-state">{t.empty}</div>
        )}
      </div>
      {compose && (
        <Composer title={t.newStream} onClose={() => setCompose(false)} />
      )}
    </div>
  );
}

export function WorkstreamDetail({ id }: { id: string }) {
  const { t, locale, data } = useWorkspace();
  const [compose, setCompose] = useState<string | null>(null);
  const stream = data.streams.find((item) => item.id === id);
  if (!stream)
    return (
      <div className="page">
        <h1>{t.notFound}</h1>
        <Link className="text-link" href="/workstreams">
          {t.back}
        </Link>
      </div>
    );
  const goal = data.goals.find((goal) => goal.id === stream.goalId);
  return (
    <div className="page">
      <Link className="back-link" href="/workstreams">
        <ArrowLeft size={16} />
        {t.back}
      </Link>
      <PageHeading
        title={stream.title[locale]}
        subtitle={stream.description[locale]}
        action={
          <Button
            className="secondary-button"
            onClick={() => setCompose(t.edit)}
          >
            <PenLine size={16} />
            {t.edit}
          </Button>
        }
      />
      <section className="context-bar" aria-label={t.context}>
        <div>
          <span className="tiny-label">CONTEXT / {stream.code}</span>
          <Status status={stream.status} />
        </div>
        <div>
          <small>{t.pic}</small>
          <span className="person">
            <Avatar id={stream.pic} small />
            {people.find((person) => person.id === stream.pic)?.name}
          </span>
        </div>
        <div>
          <small>{t.members}</small>
          <div className="member-avatars">
            {stream.members.map((id) => (
              <Avatar id={id} key={id} small />
            ))}
          </div>
        </div>
        <div>
          <small>{t.goal}</small>
          <Link className="text-link" href={`/team-focus#${goal?.id}`}>
            {goal?.title[locale] ?? t.noGoal}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
      <section className="panel current-state">
        <SectionHeading title="Current State" />
        <p>{stream.state[locale]}</p>
        <div className="next-direction">
          <span className="tiny-label">{t.nextDirection}</span>
          <p>{stream.next[locale]}</p>
        </div>
      </section>
      <div className="dashboard-columns">
        <section className="panel">
          <SectionHeading
            title="Timeline"
           
            action={
              <button
                className="text-link"
                onClick={() => setCompose(t.newUpdate)}
              >
                <Plus size={16} />
                {t.newUpdate}
              </button>
            }
          />
          <Changes
            items={data.updates.filter((item) => item.streamId === id)}
          />
        </section>
        <section className="panel discussion-panel" id="discussion">
          <SectionHeading title="Discussion" />
          <div className="discussion-empty">
            <MessageCircle size={25} />
            <p>{t.discussionHint}</p>
          </div>
          <button
            className="comment-composer"
            onClick={() => setCompose(t.comment)}
          >
            <Avatar id="min" small />
            <span>{t.commentPlaceholder}</span>
          </button>
          <div className="editor-capabilities">
            <span>Markdown</span>
            <span>@ {t.members}</span>
            <span># Workstream</span>
          </div>
        </section>
      </div>
      {compose && <Composer title={compose} onClose={() => setCompose(null)} />}
    </div>
  );
}

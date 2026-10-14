"use client";

import { Button } from "@/components/ui/button";

import { useEffect, useRef, type ReactNode } from "react";
import {
  X,
  ArrowUpRight,
  Circle,
  Pause,
  Check,
  Archive,
  LockKeyhole,
} from "lucide-react";
import Link from "next/link";
import { people, type Stream } from "@/lib/demo-data";
import { useWorkspace } from "./provider";

export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const { t } = useWorkspace();
  useEffect(() => {
    const dialog = ref.current!;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-head">
        <h2 id="modal-title">{title}</h2>
        <button className="icon-button" aria-label={t.close} onClick={onClose}>
          <X size={19} />
        </button>
      </div>
      {children}
    </dialog>
  );
}

export function Avatar({ id, small = false }: { id: string; small?: boolean }) {
  const person = people.find((person) => person.id === id)!;
  return (
    <span
      title={person.name}
      aria-label={person.name}
      className={`avatar ${person.color} ${small ? "small" : ""}`}
    >
      {person.initials}
    </span>
  );
}

export function Status({ status }: { status: Stream["status"] }) {
  const { t } = useWorkspace();
  const Icon = {
    active: Circle,
    paused: Pause,
    completed: Check,
    archived: Archive,
  }[status];
  return (
    <span className={`status ${status}`}>
      <Icon size={12} />
      {t[status]}
    </span>
  );
}

export function SectionHeading({
  title,
  href,
  action,
}: {
  title: string;
  href?: string;
  action?: ReactNode;
}) {
  const { t } = useWorkspace();
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
      </div>
      {href ? (
        <Link className="text-link" href={href}>
          {t.viewAll}
          <ArrowUpRight size={15} />
        </Link>
      ) : (
        action
      )}
    </div>
  );
}

export function PageHeading({
  title,
  subtitle,
  personal = false,
  action,
}: {
  title?: string;
  subtitle?: string;
  personal?: boolean;
  action?: ReactNode;
}) {
  const { t } = useWorkspace();
  if (!title) return <div className="page-actions">{action}</div>;
  return (
    <header className="page-heading">
      <div>
        <div className="eyebrow">
          {personal ? (
            <>
              <LockKeyhole size={12} />
              {t.private}
            </>
          ) : (
            t.shared
          )}
        </div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}

export function Composer({
  title,
  initial = "",
  onClose,
}: {
  title: string;
  initial?: string;
  onClose: () => void;
}) {
  const { t } = useWorkspace();
  return (
    <Modal title={title} onClose={onClose}>
      <div className="composer">
        <p className="notice">{t.previewOnly}</p>
        <label>
          {t.title}
          <input placeholder={t.title} />
        </label>
        <label>
          Markdown
          <textarea rows={8} defaultValue={initial} placeholder={t.body} />
        </label>
        <p className="muted">{t.coming}</p>
        <Button className="secondary-button" onClick={onClose}>
          {t.cancel}
        </Button>
      </div>
    </Modal>
  );
}

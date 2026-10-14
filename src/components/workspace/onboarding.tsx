"use client";

import { useEffect, useRef, useState } from "react";
import { useWorkspace } from "./provider";
import { navigationSteps, pageSteps, tourKey, type TourStep } from "./onboarding-steps";
import "./onboarding.css";

const seenInSession = new Set<string>();
function seen(key: string) {
  try { return seenInSession.has(key) || localStorage.getItem(tourKey + key) === "seen"; }
  catch { return seenInSession.has(key); }
}

export function Onboarding({ path, setMenu }: { path: string; setMenu: (open: boolean) => void }) {
  const { locale } = useWorkspace();
  const route = path.startsWith("/workstreams/") ? "/workstreams/detail" : path;
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const step = steps[index];
  const active = Boolean(step);
  const ko = locale === "ko";

  useEffect(() => {
    if (!pageSteps[route] || seen(route)) return;
    const nav = seen("navigation")
      ? navigationSteps.filter((item) => item.target.includes(`"${route === "/workstreams/detail" ? "/workstreams" : route}"`))
      : navigationSteps;
    const timer = window.setTimeout(() => setSteps([...nav, ...pageSteps[route]]), 0);
    return () => clearTimeout(timer);
  }, [route]);

  useEffect(() => {
    if (!active) return;
    const dialog = dialogRef.current!;
    const previousFocus = document.activeElement as HTMLElement | null;
    if (!dialog.open) dialog.showModal();
    return () => { dialog.close(); previousFocus?.focus({ preventScroll: true }); };
  }, [active]);

  useEffect(() => {
    if (!step) return;
    setMenu(Boolean(step.nav && window.innerWidth <= 760));
    const target = document.querySelector<HTMLElement>(step.target);
    const place = () => {
      setMenu(Boolean(step.nav && window.innerWidth <= 760));
      const bubble = bubbleRef.current;
      const ring = ringRef.current;
      if (!bubble || !ring) return;
      const rect = target?.getBoundingClientRect();
      const width = window.innerWidth;
      const height = window.innerHeight;
      const left = Math.max(8, Math.min(rect?.left ?? 16, width - 24));
      const top = Math.max(8, Math.min(rect?.top ?? 16, height - 32));
      const right = Math.min(width - 8, rect?.right ?? width - 16);
      const bottom = Math.min(height - 8, rect?.bottom ?? 80);
      Object.assign(ring.style, { left: `${left - 4}px`, top: `${top - 4}px`, width: `${Math.max(16, right - left + 8)}px`, height: `${Math.max(24, bottom - top + 8)}px` });
      const bw = bubble.offsetWidth;
      const bh = bubble.offsetHeight;
      const beside = step.nav && right + bw + 24 < width;
      const x = beside ? right + 18 : Math.max(12, Math.min(left, width - bw - 12));
      const y = beside ? top : bottom + bh + 24 < height ? bottom + 16 : top - bh - 16;
      Object.assign(bubble.style, { left: `${x}px`, top: `${Math.max(12, Math.min(y, height - bh - 12))}px` });
    };
    const timer = window.setTimeout(() => {
      target?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
      place();
    }, 180);
    const frame = requestAnimationFrame(place);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => { clearTimeout(timer); cancelAnimationFrame(frame); window.removeEventListener("resize", place); window.removeEventListener("scroll", place, true); };
  }, [step, locale, setMenu]);

  function finish() {
    for (const key of ["navigation", route]) {
      seenInSession.add(key);
      try { localStorage.setItem(tourKey + key, "seen"); } catch { /* Keep session-only progress when storage is unavailable. */ }
    }
    setSteps([]);
    setMenu(false);
  }

  if (!step) return null;
  return (
    <dialog ref={dialogRef} className="onboarding" aria-labelledby="tour-title" aria-describedby="tour-body" onCancel={(event) => { event.preventDefault(); finish(); }}>
      <div className="tour-ring" ref={ringRef} aria-hidden="true" />
      <div className="tour-bubble" ref={bubbleRef}>
        <div className="tour-meta"><span>{index + 1} / {steps.length}</span><button onClick={finish}>{ko ? "건너뛰기" : "Skip"}</button></div>
        <div aria-live="polite" aria-atomic="true"><h2 id="tour-title">{step.title}</h2><p id="tour-body">{step.body[locale]}</p></div>
        <div className="tour-actions"><button disabled={index === 0} onClick={() => setIndex(index - 1)}>{ko ? "이전" : "Back"}</button><button autoFocus className="tour-next" onClick={() => index === steps.length - 1 ? finish() : setIndex(index + 1)}>{index === steps.length - 1 ? (ko ? "시작하기" : "Get started") : (ko ? "다음" : "Next")}</button></div>
      </div>
    </dialog>
  );
}

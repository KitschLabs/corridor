"use client";

import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useWorkspace } from "./provider";
import { Changes } from "./sections";

export function LiveFeed() {
  const { data, t } = useWorkspace();
  const sorted = [...data.updates].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  // shortcut: replay existing fixtures until an authenticated update subscription exists.
  const pendingCount = Math.min(5, Math.max(0, sorted.length - 1));
  const [received, setReceived] = useState(0);
  const [playing, setPlaying] = useState(true);
  const complete = received >= pendingCount;
  const items = sorted.slice(pendingCount - received);

  useEffect(() => {
    if (!playing || complete) return;
    const timer = window.setInterval(() => setReceived((count) => Math.min(count + 1, pendingCount)), 4000);
    return () => window.clearInterval(timer);
  }, [playing, complete, pendingCount]);

  return (
    <div className="live-feed">
      <div className="feed-toolbar">
        <span className="feed-status" role="status">
          <span className={`sample-dot ${playing && !complete ? "playing" : ""}`} />
          {complete ? t.feedComplete : playing ? t.feedPlaying : t.feedPaused}
        </span>
        <button className="secondary-button" onClick={() => {
          if (complete) { setReceived(0); setPlaying(true); }
          else setPlaying((value) => !value);
        }}>
          {complete ? <RotateCcw size={14} /> : playing ? <Pause size={14} /> : <Play size={14} />}
          {complete ? t.feedReplay : playing ? t.feedPause : t.feedResume}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">{t.feedReceived}: {received}</p>
      <div className="panel feed-panel">
        <Changes items={items} />
      </div>
    </div>
  );
}

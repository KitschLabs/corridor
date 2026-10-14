"use client";

import Link from "next/link";
import { useWorkspace } from "./provider";

export function DemoPlayback() {
  const { latestDemo, locale, data } = useWorkspace();
  const stream = data.streams.find((item) => item.id === latestDemo?.streamId);
  if (!latestDemo || !stream) return null;
  return (
    <div className="demo-playback">
      <div className="demo-event" aria-live="polite" aria-atomic="true">
          <Link key={latestDemo.id} href={`/workstreams/${stream.id}`} className="demo-arrival">
            <strong>{stream.title[locale]}</strong><span>{latestDemo.title[locale]}</span>
          </Link>
      </div>
    </div>
  );
}

"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { messages, type Locale } from "@/lib/messages";
import { organizationData, organizations } from "@/lib/demo-data";
import { viewerId, type Update } from "@/lib/demo-data";
import { usePathname } from "next/navigation";

function useWorkspaceState() {
  const [locale, setLocale] = useState<Locale>("en");
  const [orgId, setOrgId] = useState("corridor");
  const [now, setNow] = useState<Date | null>(null);
  const pathname = usePathname();
  const scope = `${orgId}:${pathname}`;
  const [playing, setPlaying] = useState(true);
  const [replay, setReplay] = useState<{ scope: string; count: number; updates: Update[] }>({ scope: "", count: 0, updates: [] });
  const demoUpdates = replay.scope === scope ? replay.updates : [];
  useEffect(() => {
    if (!playing || pathname === "/connect") return;
    const base = organizationData(orgId);
    const candidates = base.streams.filter((stream) => {
      if (pathname.startsWith("/workstreams/")) return stream.id === pathname.split("/").at(-1);
      if (pathname === "/my-work") return stream.pic === viewerId || stream.members.includes(viewerId);
      return true;
    });
    if (!candidates.length) return;
    // Demo-only playback; never represents a server subscription or saved activity.
    const timer = window.setInterval(() => {
      if (document.hidden || document.querySelector("dialog[open]")) return;
      const timestamp = new Date();
      setNow(timestamp);
      setReplay((previous) => {
        const count = previous.scope === scope ? previous.count : 0;
        const stream = candidates[count % candidates.length];
        const history = base.updates.filter((item) => item.streamId === stream.id);
        const template = history[Math.floor(count / candidates.length) % history.length];
        if (!template) return previous;
        const update: Update = { ...template, id: `demo-${orgId}-${count + 1}`, createdAt: timestamp.toISOString() };
        return { scope, count: count + 1, updates: [update, ...(previous.scope === scope ? previous.updates : [])].slice(0, 12) };
      });
    }, 8000);
    return () => window.clearInterval(timer);
  }, [orgId, pathname, playing, scope]);
  const base = organizationData(orgId);
  const data = {
    ...base,
    updates: [...demoUpdates, ...base.updates],
    streams: base.streams.map((stream) => {
      const update = demoUpdates.find((item) => item.streamId === stream.id);
      return update ? { ...stream, state: update.title } : stream;
    }),
  };
  useEffect(() => {
    const tick = () => setNow(new Date());
    const initial = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 30_000);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); };
  }, []);
  return {
    now,
    playing,
    setPlaying,
    latestDemo: demoUpdates[0],
    locale,
    setLocale,
    orgId,
    setOrgId,
    t: messages[locale],
    data,
    org: organizations.find((org) => org.id === orgId)!,
  };
}
const WorkspaceContext = createContext<ReturnType<
  typeof useWorkspaceState
> | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  return (
    <WorkspaceContext.Provider value={useWorkspaceState()}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const value = useContext(WorkspaceContext);
  if (!value) throw new Error("WorkspaceProvider is required");
  return value;
}

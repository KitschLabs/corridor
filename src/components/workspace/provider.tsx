"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { messages, type Locale } from "@/lib/messages";
import { organizationData, organizations } from "@/lib/demo-data";

function useWorkspaceState() {
  const [locale, setLocale] = useState<Locale>("ko");
  const [orgId, setOrgId] = useState("corridor");
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const initial = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 30_000);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); };
  }, []);
  return {
    now,
    locale,
    setLocale,
    orgId,
    setOrgId,
    t: messages[locale],
    data: organizationData(orgId),
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

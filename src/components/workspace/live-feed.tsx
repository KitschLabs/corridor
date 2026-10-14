"use client";

import { useWorkspace } from "./provider";
import { Changes } from "./sections";

export function LiveFeed() {
  const { data } = useWorkspace();
  const items = [...data.updates].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  return <div className="live-feed"><div className="panel feed-panel"><Changes items={items} /></div></div>;
}

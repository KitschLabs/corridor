import { WorkstreamDetail } from "@/components/workspace/workstreams";
import { streams } from "@/lib/demo-data";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!streams.some((stream) => stream.id === id)) notFound();
  return <WorkstreamDetail id={id} />;
}

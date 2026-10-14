import type { Locale } from "./messages";

export function formatTime(value: string, locale: Locale, now: Date | null) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const pad = (n: number) => String(n).padStart(2, "0");
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  const full = `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${time}`;
  if (!now || date > now) return full;
  const sameDay = (other: Date) => date.getFullYear() === other.getFullYear()
    && date.getMonth() === other.getMonth() && date.getDate() === other.getDate();
  if (sameDay(now)) {
    const minutes = Math.floor((now.getTime() - date.getTime()) / 60_000);
    if (minutes < 1) return locale === "ko" ? "방금" : "Just now";
    if (minutes < 60) return locale === "ko" ? `${minutes}분 전` : `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return locale === "ko" ? `${hours}시간 전` : `${hours}h ago`;
  }
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  return sameDay(yesterday) ? `${locale === "ko" ? "어제" : "Yesterday"} ${time}` : full;
}

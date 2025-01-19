import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { techMap } from "@/constants/techMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getDeviconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : "devicon-devicon-plain";
};

// get timestamps

export const getTimestamp = (date: Date): string => {
  const now = Date.now();
  const secondsAgo = Math.floor((now - date.getTime()) / 1000);

  if (secondsAgo < 0) {
    return "in the future";
  }

  // Units with their respective durations in seconds
  const units = [
    { name: "year", value: 31536000 },
    { name: "month", value: 2592000 },
    { name: "day", value: 86400 },
    { name: "hour", value: 3600 },
    { name: "minute", value: 60 },
    { name: "second", value: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.value);
    if (interval >= 1) {
      return `${interval} ${unit.name}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

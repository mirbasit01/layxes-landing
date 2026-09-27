"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "layxes-announce-dismissed";

const MESSAGES = [
  "Free delivery on orders above Rs. 5,000",
  "Winter Drop 01 — Limited first run",
  "Heavyweight fleece · Made to last",
  "Designed in Pakistan",
  "7-day easy exchanges",
];

export function AnnouncementBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(typeof window !== "undefined" && localStorage.getItem(KEY) !== "1");
  }, []);
  if (!show) return null;

  // duplicate the track so the marquee loops seamlessly at -50%
  const track = [...MESSAGES, ...MESSAGES];

  return (
    <div className="relative overflow-hidden bg-foreground text-background">
      <div className="marquee-mask flex overflow-hidden py-2">
        <div className="animate-marquee flex shrink-0 items-center whitespace-nowrap">
          {track.map((m, i) => (
            <span key={i} className="flex items-center text-xs font-semibold uppercase tracking-wider">
              {m}
              <span className="mx-6 text-primary">✦</span>
            </span>
          ))}
        </div>
      </div>
      <button
        aria-label="Dismiss announcement"
        onClick={() => {
          localStorage.setItem(KEY, "1");
          setShow(false);
        }}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/10 p-1 hover:bg-background/20"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

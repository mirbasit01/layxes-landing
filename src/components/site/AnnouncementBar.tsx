import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "clothco-announce-dismissed";

export function AnnouncementBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(typeof window !== "undefined" && localStorage.getItem(KEY) !== "1");
  }, []);
  if (!show) return null;
  return (
    <div className="relative bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 text-center text-xs sm:text-sm">
        <span>
          Free delivery on orders above Rs. 2,000 · Use code{" "}
          <span className="font-semibold">SAVE10</span> for 10% off
        </span>
        <button
          aria-label="Dismiss announcement"
          onClick={() => {
            localStorage.setItem(KEY, "1");
            setShow(false);
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-white/10 dark:hover:bg-black/10"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

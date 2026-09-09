import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/* Preloader — cinematic counting curtain that lifts to reveal the page */
/* ------------------------------------------------------------------ */

export function Preloader({ name, onReveal }: { name: string; onReveal: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(100);
      setPhase("leaving");
      return;
    }
    const start = performance.now();
    const duration = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("leaving");
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    onReveal();
    const t = window.setTimeout(() => setPhase("done"), 950);
    return () => window.clearTimeout(t);
  }, [phase, onReveal]);

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div aria-hidden="true" className={`preloader ${phase === "leaving" ? "preloader-leave" : ""}`}>
      <div className="w-64 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
          {name}
        </p>
        <p className="mt-4 font-display text-7xl tabular-nums text-foreground">{progress}</p>
        <div className="mt-6 h-px w-full bg-border">
          <div
            className="h-px origin-left bg-primary"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CustomCursor — lerped ring + dot, page spotlight follows the mouse   */
/* ------------------------------------------------------------------ */

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight * 0.4 };
    const ring = { x: pos.x, y: pos.y };
    let seen = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!seen) {
        seen = true;
        ring.x = pos.x;
        ring.y = pos.y;
      }
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setActive(Boolean(t?.closest("a,button,[data-cursor]")));
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
      }
      document.documentElement.style.setProperty("--mx", `${pos.x}px`);
      document.documentElement.style.setProperty("--my", `${pos.y}px`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="spotlight-overlay" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" data-active={active} aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* GrainOverlay — animated film grain over the whole page              */
/* ------------------------------------------------------------------ */

export function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* ScrollProgress — brass bar along the top edge                       */
/* ------------------------------------------------------------------ */

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="scroll-progress"
      style={{ transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic — element gravitates toward the cursor                     */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  return (
    <div ref={ref} className={`magnetic ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TiltCard — 3D tilt + spotlight that tracks the pointer              */
/* ------------------------------------------------------------------ */

export function TiltCard({
  children,
  className = "",
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--sx", `${px * 100}%`);
    el.style.setProperty("--sy", `${py * 100}%`);
    const rx = (py - 0.5) * -2 * max;
    const ry = (px - 0.5) * 2 * max;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div ref={ref} className={`tilt-card ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="tilt-spot" aria-hidden="true" />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee — seamless infinite horizontal scroll                       */
/* ------------------------------------------------------------------ */

export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SplitText — per-letter rise-and-settle entrance                     */
/* ------------------------------------------------------------------ */

export function SplitText({
  text,
  active,
  delay = 0,
  step = 34,
  className = "",
  letterClassName = "",
}: {
  text: string;
  active?: boolean;
  delay?: number;
  step?: number;
  className?: string;
  letterClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [ioShown, setIoShown] = useState(false);

  useEffect(() => {
    if (active !== undefined) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIoShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  const shown = active ?? ioShown;

  return (
    <span ref={ref} className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          aria-hidden="true"
          className={`split-letter ${letterClassName}`}
          data-shown={shown}
          style={{ transitionDelay: `${delay + i * step}ms` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Typewriter — cycles through phrases with a blinking caret           */
/* ------------------------------------------------------------------ */

export function Typewriter({
  words,
  typeMs = 85,
  deleteMs = 40,
  holdMs = 1900,
  className = "",
}: {
  words: string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length] ?? "";
    if (!deleting && len === word.length) {
      if (word.length === 0) {
        setDeleting(true);
        return;
      }
      const t = window.setTimeout(() => setDeleting(true), holdMs);
      return () => window.clearTimeout(t);
    }
    if (deleting && len === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = window.setTimeout(
      () => setLen((l) => l + (deleting ? -1 : 1)),
      deleting ? deleteMs : typeMs,
    );
    return () => window.clearTimeout(t);
  }, [len, deleting, index, words, typeMs, deleteMs, holdMs]);

  const word = words[index % words.length] ?? "";

  return (
    <span className={className}>
      {word.slice(0, len)}
      <span className="type-caret" aria-hidden="true" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* ScrambleText — decodes from glitch characters on hover/in-view      */
/* ------------------------------------------------------------------ */

const GLYPHS = "!<>-_\\/[]{}=+*^?#·";

export function ScrambleText({
  text,
  className = "",
  trigger = "hover",
}: {
  text: string;
  className?: string;
  trigger?: "hover" | "view";
}) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<number | null>(null);

  const run = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    const start = performance.now();
    const duration = 650;
    timerRef.current = window.setInterval(() => {
      const p = Math.min((performance.now() - start) / duration, 1);
      const revealed = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i] ?? "";
        out += i < revealed ? ch : (GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "·");
      }
      setDisplay(out);
      if (p >= 1) {
        if (timerRef.current !== null) window.clearInterval(timerRef.current);
        timerRef.current = null;
        setDisplay(text);
      }
    }, 30);
  }, [text]);

  useEffect(() => {
    if (trigger !== "view") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger, run]);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    },
    [],
  );

  return (
    <span ref={ref} className={className} onMouseEnter={trigger === "hover" ? run : undefined}>
      {display}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* useParallax — gentle drift as the element crosses the viewport      */
/* ------------------------------------------------------------------ */

export function useParallax<T extends HTMLElement>(strength = 24) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${(-mid / window.innerHeight) * strength}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}

/* ------------------------------------------------------------------ */
/* CommandPalette — ⌘K launcher for sections and external links        */
/* ------------------------------------------------------------------ */

export type CommandItem = {
  id: string;
  label: string;
  group: string;
  href: string;
  hint?: string;
  external?: boolean;
};

export function CommandPalette({
  open,
  onOpenChange,
  items,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = items.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      item.label.toLowerCase().includes(q) ||
      item.group.toLowerCase().includes(q) ||
      (item.hint?.toLowerCase().includes(q) ?? false)
    );
  });

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelected(0);
      return;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${selected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selected, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const runItem = (item: CommandItem | undefined) => {
    if (!item) return;
    onOpenChange(false);
    if (item.external) {
      window.open(item.href, "_blank", "noopener");
    } else if (item.href.startsWith("#")) {
      document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    } else if (item.href.startsWith("mailto:")) {
      window.location.href = item.href;
    }
  };

  const onInputKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runItem(filtered[selected]);
    }
  };

  if (!open) return null;

  let lastGroup = "";

  return (
    <>
      <div className="cmdk-overlay" aria-hidden="true" onClick={() => onOpenChange(false)} />
      <div className="cmdk-panel" role="dialog" aria-modal="true" aria-label="Command menu">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <span className="text-sm text-muted-foreground">⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Jump to a section, open a project…"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>
        <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Nothing matches “{query}”
            </p>
          )}
          {filtered.map((item, i) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <div key={item.id}>
                {showGroup && (
                  <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
                    {item.group}
                  </p>
                )}
                <button
                  data-index={i}
                  data-selected={i === selected}
                  className="cmdk-item flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground"
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => runItem(item)}
                >
                  <span className="truncate">{item.label}</span>
                  {item.hint && (
                    <kbd className="cmdk-kbd rounded border border-border px-1.5 py-0.5 font-mono text-[10px] transition-colors">
                      {item.hint}
                    </kbd>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* LiveClock — ticking local time for the footer status strip          */
/* ------------------------------------------------------------------ */

export function LiveClock({ timeZone = "Asia/Kolkata" }: { timeZone?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, [timeZone]);

  return <span className="tabular-nums">{now ?? "--:--:--"}</span>;
}

/* ------------------------------------------------------------------ */
/* CopyText — click to copy with transient confirmation                */
/* ------------------------------------------------------------------ */

export function CopyText({
  value,
  className = "",
  children,
}: {
  value: string;
  className?: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    const done = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).then(done).catch(done);
    } else {
      done();
    }
  }, [value]);

  return (
    <button
      type="button"
      onClick={copy}
      className={`copy-hit cursor-pointer ${className}`}
      aria-label={`Copy ${value}`}
    >
      {children}
      <span
        className={`ml-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity ${
          copied ? "text-primary opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        copied
      </span>
    </button>
  );
}

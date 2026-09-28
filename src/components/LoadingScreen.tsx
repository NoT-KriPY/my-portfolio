"use client";

import { useEffect, useState, useRef, useTransition, useCallback } from "react";
import { usePathname } from "next/navigation";

const DURATION = 3500;
// Keep final text on screen longer — especially SYSTEM READY / LOADING
const READY_HOLD_MS = 700;

export function LoadingScreen() {
  const [, startTransition] = useTransition();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING SYSTEM...");
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const rafIdRef = useRef<number | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);
  const runIdRef = useRef(0);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const runSequence = useCallback(() => {
    const runId = ++runIdRef.current;
    clearTimers();

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finalStatus =
      (typeof window !== "undefined" ? window.location.pathname : (pathname ?? "/")) === "/"
        ? "SYSTEM READY"
        : "LOADING";

    // Reset visible state in case component had returned null (isReady && !isVisible)
    // or is mid-hidden — force a fresh run
    setIsReady(false);
    setIsVisible(true);
    setProgress(0);
    setStatus("INITIALIZING SYSTEM...");

    if (prefersReducedMotion) {
      setProgress(100);
      setStatus(finalStatus);
      const t1 = setTimeout(() => {
        if (runId !== runIdRef.current) return;
        document.body.style.overflow = "";
        startTransition(() => setIsReady(true));
        const t2 = setTimeout(() => {
          if (runId !== runIdRef.current) return;
          startTransition(() => setIsVisible(false));
          window.dispatchEvent(new CustomEvent("loading-complete"));
        }, 450);
        timersRef.current.push(t2);
      }, 400);
      timersRef.current.push(t1);
      return;
    }

    document.body.style.overflow = "hidden";
    const startTime = performance.now();

    const animate = (now: number) => {
      if (runId !== runIdRef.current) return;
      const elapsed = now - startTime;
      const p = Math.min(elapsed / DURATION, 1);

      if (p < 1) {
        // Keep the first phase readable — don't skip INITIALIZING SYSTEM...
        const minInitialMs = 900;
        const currentStatus =
          elapsed < minInitialMs
            ? "INITIALIZING SYSTEM..."
            : elapsed >= 2600
              ? "LOADING..."
              : elapsed >= 1800
                ? "BOOTING..."
                : elapsed >= 1000
                  ? "SCANNING..."
                  : "INITIALIZING SYSTEM...";
        setProgress(p * 100);
        setStatus(currentStatus);
        rafIdRef.current = requestAnimationFrame(animate);
      } else {
        setStatus(finalStatus);
        setProgress(100);
        const t1 = setTimeout(() => {
          if (runId !== runIdRef.current) return;
          document.body.style.overflow = "";
          startTransition(() => setIsReady(true));
          const t2 = setTimeout(() => {
            if (runId !== runIdRef.current) return;
            startTransition(() => setIsVisible(false));
            window.dispatchEvent(new CustomEvent("loading-complete"));
          }, 450);
          timersRef.current.push(t2);
        }, READY_HOLD_MS);
        timersRef.current.push(t1);
      }
    };

    rafIdRef.current = requestAnimationFrame(animate);
  }, [clearTimers, startTransition, pathname]);

  // Initial mount — always play once
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: preloader must boot on mount and on every internal navigation
    runSequence();
    return () => {
      clearTimers();
      document.body.style.overflow = "";
    };
  }, [runSequence, clearTimers]);

  // Replay on internal route changes only (ignore hash-only changes and first mount, handle external via not triggering)
  useEffect(() => {
    const current = pathname ?? "/";
    const normalized = current.split("#")[0] || "/";
    if (prevPathRef.current === null) {
      prevPathRef.current = normalized;
      return;
    }
    if (prevPathRef.current === normalized) return;
    prevPathRef.current = normalized;
    runSequence();
  }, [pathname, runSequence]);

  // Also intercept same-origin internal link clicks that may not change pathname synchronously
  // (e.g. / -> /#about keeps pathname "/"). We still want to replay for clicks to different sections
  // that go through Next Link? For hash-only we skip — for href !== current pathname we replay.
  // The pathname effect above already covers true route changes. For hash nav we intentionally skip.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      // Skip external, new-tab, hash-only, and protocol links
      if (anchor.target === "_blank") return;
      if (/^(https?:|mailto:|tel:)/i.test(href)) return;
      if (href.startsWith("#")) return;
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        const nextPath = url.pathname.split("#")[0] || "/";
        const curPath = window.location.pathname.split("#")[0] || "/";
        if (nextPath === curPath && url.hash) return; // same-page hash jump — don't replay
        // Different internal path — let Next handle navigation; pathname effect will replay.
        // But also trigger immediately so user sees loader without waiting for route commit
        // when navigation is via hard push. We run sequence here too; deduped by runId.
      } catch {
        return;
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  if (isReady && !isVisible) {
    return null;
  }

  return (
    <div className={`preloader ${isVisible ? "" : "is-hidden"}`}>
      <div className="preloader-content">
        <div className="preloader-status">{status}</div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

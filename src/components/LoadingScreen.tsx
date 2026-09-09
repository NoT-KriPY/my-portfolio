"use client";

import { useEffect, useState, useTransition, useRef } from "react";

const SESSION_KEY = "portfolio-preloader-seen";
const DURATION = 3500;

export function LoadingScreen() {
  const [, startTransition] = useTransition();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING SYSTEM...");
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Check session storage
    const hasSeen = sessionStorage.getItem(SESSION_KEY);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasSeen && !prefersReducedMotion) {
      // Skip animation if already seen
      startTransition(() => {
        setIsReady(true);
        setIsVisible(false);
      });
      // Dispatch event for components that need to know loading is done
      window.dispatchEvent(new CustomEvent("loading-complete"));
      return;
    }

    // Prevent scroll during load
    document.body.style.overflow = "hidden";
    startTransition(() => {
      setIsVisible(true);
    });

    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / DURATION, 1);

      // Use requestAnimationFrame loop instead of setState inside effect
      requestAnimationFrame(animate);

      // Update progress and status through closure state updates
      // This is called in the animation loop, not directly in the effect
      if (p < 1) {
        // During animation
        const currentStatus = elapsed >= 2400 ? "LOADING..." :
          elapsed >= 1600 ? "BOOTING..." :
          elapsed >= 800 ? "SCANNING..." : "INITIALIZING SYSTEM...";
        setProgress(p * 100);
        setStatus(currentStatus);
      } else {
        // Animation complete
        setStatus("SYSTEM READY");
        setProgress(100);

        setTimeout(() => {
          document.body.style.overflow = "";
          startTransition(() => {
            setIsReady(true);
          });

          setTimeout(() => {
            startTransition(() => {
              setIsVisible(false);
            });
            if (!hasSeen) {
              sessionStorage.setItem(SESSION_KEY, "true");
            }
            // Dispatch event when loading is complete
            window.dispatchEvent(new CustomEvent("loading-complete"));
          }, 450);
        }, 180);

        // Stop the animation loop
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }
      }
    }

    if (prefersReducedMotion) {
      // Skip animation for reduced motion - use setTimeout to defer state updates
      setTimeout(() => {
        setProgress(100);
        setStatus("SYSTEM READY");

        setTimeout(() => {
          document.body.style.overflow = "";
          startTransition(() => {
            setIsReady(true);
          });
          setTimeout(() => {
            startTransition(() => {
              setIsVisible(false);
            });
            sessionStorage.setItem(SESSION_KEY, "true");
            window.dispatchEvent(new CustomEvent("loading-complete"));
          }, 450);
        }, 100);
      }, 0);
    } else {
      rafIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  // Don't render anything once ready
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

"use client";

import { ReactNode, useEffect, useRef, useState, useTransition } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: ReactNode }) {
  const rawPath = usePathname();
  const pathname = (rawPath ?? "/").split("#")[0];
  const prevPath = useRef(pathname);
  const [, startTransition] = useTransition();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Start transition for smooth state update
    startTransition(() => {
      setVisible(false);
    });

    const timeoutId = setTimeout(() => {
      startTransition(() => {
        setVisible(true);
      });
    }, 30);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(6px)",
        transition: "opacity 220ms var(--ease-out), transform 220ms var(--ease-out)",
      }}
    >
      {children}
    </div>
  );
}

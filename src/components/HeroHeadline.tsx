"use client";

import { useEffect, useRef } from "react";
import { heroData } from "@/lib/data";

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
const SCRAMBLE_INTERVAL = 14;
const CHAR_LOCK_DURATION = 80;
const START_DELAY = 120;
const HEADLINE_LINES = heroData.headline.split("\n");

interface CharItem {
  element: HTMLElement;
  finalChar: string;
  locked: boolean;
}

function createScrambleText(element: HTMLElement, finalLines: string[]): { stop: () => void } {
  if (!element.isConnected) return { stop: () => {} };

  // Freeze h1 box before touching DOM so innerHTML="" never collapses
  const rect = element.getBoundingClientRect();
  element.style.height = rect.height + "px";
  element.style.minHeight = rect.height + "px";
  element.style.overflow = "hidden";

  element.innerHTML = "";

  const allChars: CharItem[] = [];

  finalLines.forEach((line) => {
    const block = document.createElement("span");
    block.className = "scramble-block";

    const words = line.split(" ");
    words.forEach((word, wordIndex) => {
      word.split("").forEach((char) => {
        const span = document.createElement("span");
        span.className = "scramble-char";
        span.textContent =
          SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        block.appendChild(span);
        allChars.push({ element: span, finalChar: char, locked: false });
      });
      if (wordIndex < words.length - 1) {
        const space = document.createElement("span");
        space.className = "scramble-space";
        space.textContent = " ";
        block.appendChild(space);
      }
    });

    element.appendChild(block);
  });

  let animationFrame: number | null = null;
  let startTime: number | null = null;
  let lastScrambleTime = 0;
  let finished = false;

  function getRandomCharacter(): string {
    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  }

  function animate(timestamp: number): void {
    if (finished) return;

    if (!startTime) {
      startTime = timestamp;
    }

    const elapsed = timestamp - startTime;

    if (elapsed < START_DELAY) {
      animationFrame = requestAnimationFrame(animate);
      return;
    }

    const animationTime = elapsed - START_DELAY;

    // Scramble all unlocked characters
    if (timestamp - lastScrambleTime >= SCRAMBLE_INTERVAL) {
      allChars.forEach((item) => {
        if (!item.locked) {
          item.element.textContent = getRandomCharacter();
        }
      });
      lastScrambleTime = timestamp;
    }

    // Lock characters one by one from left to right
    allChars.forEach((item, index) => {
      if (item.locked) return;

      const charStart = index * CHAR_LOCK_DURATION;

      if (animationTime >= charStart) {
        item.element.textContent = item.finalChar;
        item.locked = true;
      }
    });

    if (allChars.every((c) => c.locked)) {
      finished = true;
      animationFrame = null;
      element.style.height = "";
      element.style.minHeight = "";
      element.style.overflow = "";
      return;
    }

    animationFrame = requestAnimationFrame(animate);
  }

  animationFrame = requestAnimationFrame(animate);

  return {
    stop() {
      finished = true;
      if (animationFrame) cancelAnimationFrame(animationFrame);
      element.style.height = "";
      element.style.minHeight = "";
      element.style.overflow = "";
      allChars.forEach((item) => {
        if (item.element.isConnected) item.element.textContent = item.finalChar;
      });
    },
  };
}

export function HeroHeadline() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const scrambleRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    const runAnimation = () => {
      if (scrambleRef.current) return;
      const container = containerRef.current;
      if (!container) return;
      scrambleRef.current = createScrambleText(container, HEADLINE_LINES);
    };

    window.addEventListener("loading-complete", runAnimation);

    return () => {
      window.removeEventListener("loading-complete", runAnimation);
      if (scrambleRef.current) {
        scrambleRef.current.stop();
      }
    };
  }, []);

  return (
    <h1 className="t-hero hero__headline" ref={containerRef} aria-label={HEADLINE_LINES.join(" ")}>
      {HEADLINE_LINES.map((line, i) => (
        <span key={i} className="scramble-block">
          {line}
        </span>
      ))}
    </h1>
  );
}

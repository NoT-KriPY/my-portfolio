"use client";

import { useEffect, useRef, useCallback } from "react";
import { heroData } from "@/lib/data";

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
const SCRAMBLE_INTERVAL = 20;
const CHAR_LOCK_DURATION = 80;
const START_DELAY = 200;

interface CharItem {
  element: HTMLElement;
  finalChar: string;
  locked: boolean;
}

function createScrambleText(element: HTMLElement, finalLines: string[]): { stop: () => void } {
  // Check if element is still in the DOM before manipulating
  if (!element.isConnected) {
    return { stop: () => {} };
  }

  element.innerHTML = "";

  const allChars: CharItem[] = [];

  finalLines.forEach((line, lineIndex) => {
    const words = line.split(" ");

    words.forEach((word) => {
      word.split("").forEach((char) => {
        const span = document.createElement("span");
        span.className = "scramble-char";
        span.textContent =
          SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        element.appendChild(span);

        allChars.push({
          element: span,
          finalChar: char,
          locked: false,
        });
      });

      const space = document.createElement("span");
      space.className = "scramble-space";
      space.textContent = " ";
      element.appendChild(space);
    });

    if (lineIndex < finalLines.length - 1) {
      const br = document.createElement("br");
      element.appendChild(br);
    }
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

    // Check if all locked
    const allLocked = allChars.every((c) => c.locked);

    if (allLocked) {
      finished = true;
      animationFrame = null;
      return;
    }

    animationFrame = requestAnimationFrame(animate);
  }

  animationFrame = requestAnimationFrame(animate);

  return {
    stop() {
      finished = true;
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      allChars.forEach((item) => {
        // Only update if element is still connected to DOM
        if (item.element.isConnected) {
          item.element.textContent = item.finalChar;
        }
      });
    },
  };
}

export function HeroHeadline() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const scrambleRef = useRef<{ stop: () => void } | null>(null);

  const headlineLines = heroData.headline.split("\n");

  const runAnimation = useCallback(() => {
    if (scrambleRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    scrambleRef.current = createScrambleText(container, headlineLines);
  }, [headlineLines]);

  useEffect(() => {
    const handleLoadingComplete = () => {
      runAnimation();
    };

    window.addEventListener("loading-complete", handleLoadingComplete);

    return () => {
      window.removeEventListener("loading-complete", handleLoadingComplete);
      if (scrambleRef.current) {
        scrambleRef.current.stop();
      }
    };
  }, [runAnimation]);

  return (
    <h1
      className="t-hero hero__headline"
      ref={containerRef}
      dangerouslySetInnerHTML={{
        __html: headlineLines
          .map((line) => `<span class="scramble-block">${line}</span>`)
          .join("")
      }}
    />
  );
}

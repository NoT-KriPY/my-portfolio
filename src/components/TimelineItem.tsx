"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface TimelineItemProps {
  children: ReactNode;
  isLast?: boolean;
}

export function TimelineItem({ children, isLast = false }: TimelineItemProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className={`timeline-item ${isLast ? "timeline-item--last" : ""}`}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="timeline-item__marker" />
      <div className="timeline-item__content">{children}</div>
    </motion.div>
  );
}

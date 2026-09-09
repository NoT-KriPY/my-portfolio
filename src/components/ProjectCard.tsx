"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  name: string;
  desc: string;
  status: string;
  isPlanned?: boolean;
}

export function ProjectCard({ name, desc, status, isPlanned = true }: ProjectCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className={`project-card ${isPlanned ? "project-card--planned" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="project-card__header">
        <span className="project-card__status">{status}</span>
        {isPlanned && (
          <span className="project-card__icon">
            <ArrowUpRight size={18} />
          </span>
        )}
      </div>
      <h3 className="project-card__name">{name}</h3>
      <p className="project-card__desc">{desc}</p>
    </motion.div>
  );
}

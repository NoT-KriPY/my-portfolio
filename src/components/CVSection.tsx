"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cvData } from "@/lib/data";

export function CVSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="cv" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="label">{cvData.label}</span>
          <h2 className="t-title cv-section__title">{cvData.title}</h2>
          <p className="t-body cv-section__subtitle">{cvData.subtitle}</p>

          <div className="cv-section__actions">
            {cvData.actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={`btn ${action.type === "primary" ? "btn--primary" : "btn--secondary"}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={action.label}
              >
                {action.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

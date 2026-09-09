"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { educationData } from "@/lib/data";

export function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="education__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="label">{educationData.label}</span>
          <h2 className="t-title">{educationData.title}</h2>
          <p className="t-body education__subtitle">{educationData.subtitle}</p>

          <div className="education__completed">
            <span className="education__completed-date">
              Completed {educationData.completed}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="education__subjects"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {educationData.subjects.map((subject) => (
            <div key={subject.name} className="education__subject">
              <h3 className="education__subject-name">{subject.name}</h3>
              <p className="education__subject-detail">{subject.detail}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="education__institution"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="education__institution-name">
            {educationData.institution}
          </span>
          <span className="education__institution-location">
            {educationData.location}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

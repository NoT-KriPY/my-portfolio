"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { aboutData } from "@/lib/data";

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="label">{aboutData.label}</span>
          <h2 className="t-title about__title">{aboutData.title}</h2>
        </motion.div>

        <motion.div
          className="about__statements"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="about__statement">{aboutData.statement}</p>
          <p className="about__statement">{aboutData.statement2}</p>
          <p className="about__statement">{aboutData.statement3}</p>
          <p className="about__statement about__statement--accent">{aboutData.accent}</p>
        </motion.div>

        <motion.p
          className="t-body about__paragraph"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {aboutData.paragraph}
        </motion.p>

        <motion.div
          className="about__reality"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <h3 className="t-heading about__reality-title">
              {aboutData.currentReality.title}
            </h3>
            <ul className="about__reality-list">
              {aboutData.currentReality.points.map((point) => (
                <li key={point} className="about__reality-item">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

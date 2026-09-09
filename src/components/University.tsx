"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { universityData } from "@/lib/data";

export function University() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="university" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="university__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="label">{universityData.label}</span>
          <h2 className="t-title">{universityData.title}</h2>
          <p className="t-body university__intro">{universityData.intro}</p>
        </motion.div>
      </div>
    </section>
  );
}

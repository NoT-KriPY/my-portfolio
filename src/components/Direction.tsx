"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { directionData } from "@/lib/data";

export function Direction() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="direction" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="direction__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="label">{directionData.label}</span>
          <h2 className="t-title">{directionData.title}</h2>
          <p className="t-body direction__intro">{directionData.intro}</p>
        </motion.div>

        <div className="direction__path">
          {directionData.path.map((step, index) => (
            <motion.div
              key={step.name}
              className="direction__step"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <span className="direction__step-number">{step.step}</span>
              <h3 className="direction__step-name">{step.name}</h3>
              <p className="direction__step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

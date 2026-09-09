"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { buildingData } from "@/lib/data";

export function Building() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="building" className="section section--sm">
      <div className="container">
        <motion.div
          ref={ref}
          className="building__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="label">{buildingData.label}</span>
          <h2 className="t-title">{buildingData.title}</h2>
        </motion.div>

        <div className="building__items">
          {buildingData.items.map((item, index) => (
            <motion.div
              key={item.label}
              className="building__item"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <h3 className="building__item-label">{item.label}</h3>
              <p className="building__item-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { foundationData } from "@/lib/data";

export function Foundation() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getStatusClass = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "active" || statusLower === "learning") {
      return "foundation__area-status foundation__area-status--learning";
    }
    if (statusLower === "building") {
      return "foundation__area-status foundation__area-status--building";
    }
    return "foundation__area-status";
  };

  return (
    <section id="foundation" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="foundation__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="label">{foundationData.label}</span>
          <h2 className="t-title">{foundationData.title}</h2>
          <p className="t-body foundation__subtitle">{foundationData.subtitle}</p>
        </motion.div>

        <div className="foundation__areas">
          {foundationData.areas.map((area, index) => (
            <motion.div
              key={area.name}
              className="foundation__area"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="foundation__area-header">
                <h3 className="foundation__area-name">{area.name}</h3>
                <span className={getStatusClass(area.status)}>{area.status}</span>
              </div>
              <ul className="foundation__area-items">
                {area.items.map((item) => (
                  <li key={item} className="foundation__area-item">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

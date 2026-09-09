"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { timelineData } from "@/lib/data";

export function Timeline() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="timeline" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="timeline__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="label">{timelineData.label}</span>
          <h2 className="t-title">{timelineData.title}</h2>
        </motion.div>

        <div className="timeline__events">
          {timelineData.events.map((event, index) => (
            <motion.div
              key={`${event.date}-${event.title}`}
              className={`timeline__event ${event.type === "CURRENT" ? "timeline__event--current" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="timeline__event-date">{event.date}</div>
              <div className="timeline__event-content">
                <h3 className="timeline__event-title">{event.title}</h3>
                <p className="timeline__event-desc">{event.desc}</p>
                <span
                  className={`timeline__event-type ${event.type === "CURRENT" ? "timeline__event-type--current" : event.type === "MILESTONE" ? "timeline__event-type--milestone" : ""}`}
                >
                  {event.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

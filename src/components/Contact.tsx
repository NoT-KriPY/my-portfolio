"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { contactData } from "@/lib/data";

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="contact__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="label">{contactData.label}</span>
          <h2 className="t-title contact__closing">{contactData.closingStatement}</h2>
        </motion.div>

        <motion.p
          className="t-body contact__paragraph"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {contactData.paragraph}
        </motion.p>

        <div className="contact__channels">
          {contactData.channels.map((channel, index) => (
            <motion.a
              key={channel.name}
              href={channel.href}
              className="contact__channel"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${channel.name}: ${channel.handle}`}
            >
              <span className="contact__channel-name">{channel.name}</span>
              <span className="contact__channel-handle">{channel.handle}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

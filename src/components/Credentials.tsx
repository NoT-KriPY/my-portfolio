"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { credentialsData } from "@/lib/data";
import { ExternalLink, ArrowRight } from "lucide-react";

export function Credentials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getStatusClass = (status: string) => {
    if (status === "COMPLETED") return "credential__status credential__status--completed";
    if (status === "ACTIVE") return "credential__status credential__status--candidate";
    return "credential__status";
  };

  return (
    <section id="credentials" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="credentials__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="label">{credentialsData.label}</span>
          <h2 className="t-title">{credentialsData.title}</h2>
          <p className="t-body credentials__subtitle">{credentialsData.subtitle}</p>
        </motion.div>

        <div className="credentials__grid">
          {credentialsData.items.slice(0, 6).map((credential) => (
            <motion.div
              key={credential.verificationUrl}
              className="credential"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="credential__header">
                <h3 className="credential__name">
                  {(credential as { displayTitle?: string }).displayTitle || credential.title}
                </h3>
                <span className={getStatusClass(credential.status)}>{credential.status}</span>
              </div>
              <p className="credential__issuer">{credential.provider}</p>
              <p className="credential__type">{credential.type}</p>
              <p className="credential__date">{credential.date}</p>
              <a
                href={credential.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="credential__link"
              >
                Verify <ExternalLink />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="credentials__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/credentials" className="btn btn--secondary">
            Here&apos;s More <ArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

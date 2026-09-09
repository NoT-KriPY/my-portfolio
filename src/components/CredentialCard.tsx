"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";
import { Credential } from "@/lib/data";

interface CredentialCardProps {
  credential: Credential;
}

export function CredentialCard({ credential }: CredentialCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const displayTitle = "displayTitle" in credential ? credential.displayTitle : credential.title;

  return (
    <motion.a
      ref={ref}
      href={credential.verificationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="credential-card"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="credential-card__header">
        <span className={`credential-card__status credential-card__status--${credential.status.toLowerCase()}`}>
          {credential.status}
        </span>
        <ExternalLink size={16} className="credential-card__link-icon" />
      </div>
      <h3 className="credential-card__title">{displayTitle}</h3>
      <div className="credential-card__meta">
        <span className="credential-card__provider">{credential.provider}</span>
        <span className="credential-card__divider">·</span>
        <span className="credential-card__type">{credential.type}</span>
      </div>
      <span className="credential-card__date">{credential.date}</span>
    </motion.a>
  );
}

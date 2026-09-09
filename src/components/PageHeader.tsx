"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
}

export function PageHeader({ label, title, subtitle, showBack = false, backHref = "/" }: PageHeaderProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="page-header"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {showBack && (
        <Link href={backHref} className="page-header__back">
          <ArrowLeft /> Back
        </Link>
      )}
      <span className="label">{label}</span>
      <h1 className="t-title page-header__title">{title}</h1>
      {subtitle && (
        <p className="t-body page-header__subtitle">{subtitle}</p>
      )}
    </motion.div>
  );
}

"use client";

import { PageHeader } from "@/components/PageHeader";
import { aboutData } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="page">
      <div className="page-content">
        <PageHeader
          label={aboutData.label}
          title={aboutData.title}
          subtitle="The beginning of the story"
          showBack={true}
          backHref="/"
        />

        <section className="about-page-section">
          <motion.div
            className="about-page__intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="about-page__statement">{aboutData.statement}</p>
            <p className="about-page__statement">{aboutData.statement2}</p>
            <p className="about-page__statement">{aboutData.statement3}</p>
            <p className="about-page__statement about-page__statement--accent">{aboutData.accent}</p>
          </motion.div>

          <motion.p
            className="about-page__paragraph"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {aboutData.paragraph}
          </motion.p>

          <motion.div
            className="about-page__reality"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="about-page__reality-title">{aboutData.currentReality.title}</h2>
            <ul className="about-page__reality-list">
              {aboutData.currentReality.points.map((point) => (
                <li key={point} className="about-page__reality-item">
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="about-page__links"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href="/education" className="btn btn--primary">
              VIEW EDUCATION
            </Link>
            <Link href="/journey" className="btn btn--secondary">
              EXPLORE JOURNEY
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

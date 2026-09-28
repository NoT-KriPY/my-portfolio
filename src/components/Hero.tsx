"use client";

import { motion } from "framer-motion";
import { heroData } from "@/lib/data";
import { HeroHeadline } from "./HeroHeadline";

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <motion.div
          className="hero__content"
          initial="hidden"
          animate="visible"
        >
          <HeroHeadline />

          <motion.p
            className="t-body hero__subline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            {heroData.subline}
          </motion.p>

          <motion.div
            className="hero__meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            {heroData.metadata.map((item) => (
              <div key={item.label} className="hero__meta-item">
                <span className="hero__meta-label">{item.label}</span>
                <span className="hero__meta-value">{item.value}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="hero__interests"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            {heroData.interests.map((interest) => (
              <span key={interest} className="hero__interest">
                {interest}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
          >
            <a href={heroData.primaryCTA.href} className="btn btn--primary">
              {heroData.primaryCTA.label}
            </a>
            <a href={heroData.secondaryCTA.href} className="btn btn--secondary">
              {heroData.secondaryCTA.label}
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-line" />
      </motion.div>
    </section>
  );
}

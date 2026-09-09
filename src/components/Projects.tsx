"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { projectsData } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getStatusClass = (status: string) => {
    if (status === "PLANNED") return "project-category__status project-category__status--planned";
    return "project-category__status";
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="projects__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="label">{projectsData.label}</span>
          <h2 className="t-title">{projectsData.title}</h2>
          <p className="t-body projects__subtitle">{projectsData.subtitle}</p>
        </motion.div>

        <div className="projects__categories">
          {projectsData.categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              className="project-category"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + catIndex * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="project-category__header">
                <h3 className="project-category__name">{category.name}</h3>
                <span className={getStatusClass(category.status)}>{category.status}</span>
              </div>
              <div className="project-category__items">
                {category.items.map((item) => (
                  <div key={item.name} className="project-category__item">
                    <h4 className="project-category__item-name">{item.name}</h4>
                    <p className="project-category__item-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="projects__empty"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <p className="projects__empty-text">{projectsData.emptyState}</p>
        </motion.div>

        <motion.div
          className="projects__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/projects" className="btn btn--secondary">
            View All Projects <ArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

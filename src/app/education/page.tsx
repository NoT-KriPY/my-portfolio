"use client";

import { PageHeader } from "@/components/PageHeader";
import { PageTimeline } from "@/components/PageTimeline";
import { TimelineItem } from "@/components/TimelineItem";
import { educationData } from "@/lib/data";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function EducationPage() {
  return (
    <div className="page">
      <div className="page-content">
        <PageHeader
          label={educationData.label}
          title={educationData.title}
          subtitle={educationData.subtitle}
          showBack={true}
          backHref="/"
        />

        <section className="education-section">
          <PageTimeline>
            <TimelineItem>
              <div className="education-card">
                <div className="education-card__header">
                  <span className="education-card__completed">COMPLETED {educationData.completed}</span>
                </div>
                <h2 className="education-card__institution">{educationData.institution}</h2>
                <p className="education-card__location">{educationData.location}</p>
              </div>
            </TimelineItem>

            <TimelineItem isLast={false}>
              <EducationSubjects />
            </TimelineItem>
          </PageTimeline>
        </section>
      </div>
    </div>
  );
}

function EducationSubjects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="education-subjects"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <h3 className="education-subjects__title">SUBJECTS</h3>
      <div className="education-subjects__grid">
        {educationData.subjects.map((subject) => (
          <div key={subject.name} className="education-subject-card">
            <h4 className="education-subject-card__name">{subject.name}</h4>
            <p className="education-subject-card__detail">{subject.detail}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

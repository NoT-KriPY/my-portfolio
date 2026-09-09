"use client";

import { PageHeader } from "@/components/PageHeader";
import { PageTimeline } from "@/components/PageTimeline";
import { TimelineItem } from "@/components/TimelineItem";
import { timelineData } from "@/lib/data";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, BookOpen, Code, Rocket, Briefcase } from "lucide-react";

export default function JourneyPage() {
  return (
    <div className="page">
      <div className="page-content">
        <PageHeader
          label={timelineData.label}
          title={timelineData.title}
          subtitle="The path so far"
          showBack={true}
          backHref="/"
        />

        <section className="journey-section">
          <PageTimeline>
            {timelineData.events.map((event, index) => (
              <TimelineItem key={`${event.date}-${event.title}`} isLast={index === timelineData.events.length - 1}>
                <JourneyEventCard event={event} />
              </TimelineItem>
            ))}
          </PageTimeline>
        </section>
      </div>
    </div>
  );
}

interface JourneyEventCardProps {
  event: (typeof timelineData.events)[number];
}

function JourneyEventCard({ event }: JourneyEventCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getIcon = () => {
    switch (event.type) {
      case "MILESTONE":
        return <GraduationCap size={20} />;
      case "CURRENT":
      case "LEARNING":
        return <BookOpen size={20} />;
      case "PLANNED":
        return <Code size={20} />;
      case "ASPIRATION":
        return <Briefcase size={20} />;
      default:
        return <Rocket size={20} />;
    }
  };

  const getTypeClass = () => {
    switch (event.type) {
      case "MILESTONE":
        return "journey-event--milestone";
      case "CURRENT":
        return "journey-event--current";
      case "LEARNING":
        return "journey-event--learning";
      case "PLANNED":
        return "journey-event--planned";
      case "ASPIRATION":
        return "journey-event--aspiration";
      default:
        return "";
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`journey-event ${getTypeClass()}`}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="journey-event__date">{event.date}</div>
      <div className="journey-event__content">
        <div className="journey-event__header">
          <span className="journey-event__icon">{getIcon()}</span>
          <h3 className="journey-event__title">{event.title}</h3>
        </div>
        <p className="journey-event__desc">{event.desc}</p>
      </div>
    </motion.div>
  );
}

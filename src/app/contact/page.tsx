"use client";

import { PageHeader } from "@/components/PageHeader";
import { contactData } from "@/lib/data";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="page">
      <div className="page-content">
        <PageHeader
          label={contactData.label}
          title={contactData.title}
          subtitle="Get in touch"
          showBack={true}
          backHref="/"
        />

        <motion.p
          className="contact-page__paragraph"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {contactData.paragraph}
        </motion.p>

        <section className="contact-page__channels">
          {contactData.channels.map((channel, index) => (
            <motion.a
              key={channel.name}
              href={channel.href}
              className="contact-page__channel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.1,
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-page__channel-name">{channel.name}</span>
              <span className="contact-page__channel-handle">{channel.handle}</span>
            </motion.a>
          ))}
        </section>
      </div>
    </div>
  );
}

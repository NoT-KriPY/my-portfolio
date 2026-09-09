"use client";

import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projectsData } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <div className="page">
      <div className="page-content">
        <PageHeader
          label={projectsData.label}
          title={projectsData.title}
          subtitle={projectsData.subtitle}
          showBack={true}
          backHref="/"
        />

        <section className="projects-section">
          <div className="projects-categories">
            {projectsData.categories.map((category) => (
              <div key={category.name} className="projects-category">
                <div className="projects-category__header">
                  <h2 className="projects-category__name">{category.name}</h2>
                  <span className="projects-category__status">{category.status}</span>
                </div>
                <div className="projects-category__grid">
                  {category.items.map((item) => (
                    <ProjectCard
                      key={item.name}
                      name={item.name}
                      desc={item.desc}
                      status={category.status}
                      isPlanned={true}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {projectsData.emptyState && (
            <div className="projects-empty-state">
              <p>{projectsData.emptyState}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

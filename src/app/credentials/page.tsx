"use client";

import { PageHeader } from "@/components/PageHeader";
import { CredentialCard } from "@/components/CredentialCard";
import { credentialsData } from "@/lib/data";

export default function CredentialsPage() {
  return (
    <div className="page">
      <div className="page-content">
        <PageHeader
          label={credentialsData.label}
          title={credentialsData.title}
          subtitle={credentialsData.subtitle}
          showBack={true}
          backHref="/"
        />

        <section className="credentials-section">
          <div className="credentials-grid">
            {credentialsData.items.map((credential) => (
              <CredentialCard key={credential.verificationUrl} credential={credential} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

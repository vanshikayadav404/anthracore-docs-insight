import { createFileRoute } from "@tanstack/react-router";
import { UploadCloud } from "lucide-react";

import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload & Process — AnthraCore" },
      {
        name: "description",
        content:
          "Ingest geological reports, borehole logs and mine plans into the AnthraCore extraction pipeline.",
      },
      { property: "og:title", content: "Upload & Process — AnthraCore" },
      {
        property: "og:description",
        content: "Ingest geological reports and mine plans into the AnthraCore pipeline.",
      },
    ],
  }),
  component: UploadPage,
});

function UploadPage() {
  return (
    <AppShell
      title="Upload & Process"
      subtitle="Queue scanned reports for OCR, table extraction and cross-validation."
      breadcrumb="Upload & Process"
    >
      <div className="rounded-md border border-dashed border-border bg-card p-12 text-center shadow-[var(--shadow-card)]">
        <UploadCloud className="mx-auto size-8 text-primary" />
        <p className="mt-3 text-sm font-medium text-foreground">Screen coming up next</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The ingestion and simulated extraction pipeline will be built here.
        </p>
      </div>
    </AppShell>
  );
}

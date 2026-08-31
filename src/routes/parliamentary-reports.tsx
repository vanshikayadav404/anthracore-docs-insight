import { createFileRoute } from "@tanstack/react-router";
import { Landmark } from "lucide-react";

import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/parliamentary-reports")({
  head: () => ({
    meta: [
      { title: "Parliamentary Reports — AnthraCore" },
      {
        name: "description",
        content:
          "Draft and verify Lok Sabha and Rajya Sabha replies on coal reserves using grounded corpus evidence.",
      },
      { property: "og:title", content: "Parliamentary Reports — AnthraCore" },
      {
        property: "og:description",
        content: "Draft and verify parliamentary replies with grounded corpus evidence.",
      },
    ],
  }),
  component: ParliamentaryReports,
});

function ParliamentaryReports() {
  return (
    <AppShell
      title="Parliamentary Reports"
      subtitle="Assisted drafting of Lok Sabha / Rajya Sabha replies with source attribution."
      breadcrumb="Parliamentary Reports"
    >
      <div className="rounded-md border border-dashed border-border bg-card p-12 text-center shadow-[var(--shadow-card)]">
        <Landmark className="mx-auto size-8 text-primary" />
        <p className="mt-3 text-sm font-medium text-foreground">Screen coming up next</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The parliamentary question drafting workspace will be built here.
        </p>
      </div>
    </AppShell>
  );
}

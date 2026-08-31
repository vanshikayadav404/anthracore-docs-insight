import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";

import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — AnthraCore Corpus Analytics" },
      {
        name: "description",
        content:
          "Trend analysis across coalfields: reserve movements, exploration density and validation conflicts.",
      },
      { property: "og:title", content: "Insights — AnthraCore" },
      {
        property: "og:description",
        content: "Trend analysis across coalfields and exploration records.",
      },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <AppShell
      title="Insights"
      subtitle="Aggregate trends derived from the indexed geological and statutory record set."
      breadcrumb="Insights"
    >
      <div className="rounded-md border border-dashed border-border bg-card p-12 text-center shadow-[var(--shadow-card)]">
        <BarChart3 className="mx-auto size-8 text-primary" />
        <p className="mt-3 text-sm font-medium text-foreground">Screen coming up next</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Coalfield-level analytics and comparison views will be built here.
        </p>
      </div>
    </AppShell>
  );
}

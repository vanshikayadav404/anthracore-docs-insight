import { createFileRoute } from "@tanstack/react-router";
import { MessagesSquare } from "lucide-react";

import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/ask")({
  head: () => ({
    meta: [
      { title: "Ask AnthraCore — Grounded Q&A on Coal Reports" },
      {
        name: "description",
        content:
          "Ask natural-language questions about CMPDI geological reports and receive citation-grounded answers.",
      },
      { property: "og:title", content: "Ask AnthraCore" },
      {
        property: "og:description",
        content: "Citation-grounded answers across the CMPDI document corpus.",
      },
    ],
  }),
  component: AskPage,
});

function AskPage() {
  return (
    <AppShell
      title="Ask AnthraCore"
      subtitle="Natural-language retrieval over the indexed corpus, with page-level citations."
      breadcrumb="Ask AnthraCore"
    >
      <div className="rounded-md border border-dashed border-border bg-card p-12 text-center shadow-[var(--shadow-card)]">
        <MessagesSquare className="mx-auto size-8 text-primary" />
        <p className="mt-3 text-sm font-medium text-foreground">Screen coming up next</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The grounded question-answer interface will be built here.
        </p>
      </div>
    </AppShell>
  );
}

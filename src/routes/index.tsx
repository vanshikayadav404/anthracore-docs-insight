import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Database,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AnthraCore Document Intelligence" },
      {
        name: "description",
        content:
          "AnthraCore dashboard: corpus health, extraction throughput and validation flags across CMPDI geological and mining reports.",
      },
      { property: "og:title", content: "AnthraCore — Dashboard" },
      {
        property: "og:description",
        content:
          "Corpus health, extraction throughput and validation flags across CMPDI geological and mining reports.",
      },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  {
    label: "Documents Indexed",
    value: "12,480",
    delta: "+318 this week",
    icon: FileText,
    tone: "neutral" as const,
  },
  {
    label: "Pages Extracted",
    value: "1.94 M",
    delta: "+42,110 this week",
    icon: Database,
    tone: "neutral" as const,
  },
  {
    label: "Queries Answered",
    value: "3,706",
    delta: "94.2% grounded with citation",
    icon: Sparkles,
    tone: "good" as const,
  },
  {
    label: "Validation Flags",
    value: "27",
    delta: "9 awaiting geologist review",
    icon: AlertTriangle,
    tone: "warn" as const,
  },
];

const throughput = [
  { month: "Mar", pages: 118 },
  { month: "Apr", pages: 146 },
  { month: "May", pages: 132 },
  { month: "Jun", pages: 175 },
  { month: "Jul", pages: 208 },
  { month: "Aug", pages: 241 },
];

const byCategory = [
  { name: "Exploration / Borehole", count: 4820 },
  { name: "Geological Reports (GR)", count: 3140 },
  { name: "Mine Plans & DPRs", count: 2065 },
  { name: "Parliamentary Q&A", count: 1420 },
  { name: "Environmental Clearance", count: 1035 },
];

const queue = [
  {
    doc: "GR_Korba_Dipka_Block-IV_2024.pdf",
    unit: "SECL · Korba Coalfield",
    pages: 412,
    status: "Processed",
    conf: "98.1%",
  },
  {
    doc: "Borehole_Log_Jharia_BH-2291.pdf",
    unit: "BCCL · Jharia Coalfield",
    pages: 86,
    status: "Processed",
    conf: "96.4%",
  },
  {
    doc: "DPR_Talcher_Expansion_PhaseII.pdf",
    unit: "MCL · Talcher Coalfield",
    pages: 730,
    status: "Extracting",
    conf: "—",
  },
  {
    doc: "EC_Compliance_NCL_Amlohri_H1.pdf",
    unit: "NCL · Singrauli Coalfield",
    pages: 158,
    status: "Flagged",
    conf: "81.7%",
  },
  {
    doc: "LS_Unstarred_Q3418_CoalReserves.pdf",
    unit: "Ministry of Coal · Lok Sabha",
    pages: 12,
    status: "Processed",
    conf: "99.0%",
  },
];

const flags = [
  {
    title: "Reserve figure mismatch",
    detail:
      "Gross geological reserve for Amlohri OCP stated as 412.6 MT, historical CMPDI record shows 398.2 MT (2019 GR).",
    unit: "NCL · Amlohri",
  },
  {
    title: "Seam nomenclature conflict",
    detail:
      "Seam labelled 'Purewa Bottom' in mine plan, indexed as 'Purewa Lower' across 14 prior reports.",
    unit: "NCL · Singrauli",
  },
  {
    title: "Missing borehole coordinates",
    detail: "7 of 63 borehole entries lack UTM easting/northing; grid interpolation deferred.",
    unit: "SECL · Korba",
  },
];

const statusStyles: Record<string, string> = {
  Processed: "bg-success/10 text-success",
  Extracting: "bg-accent text-accent-foreground",
  Flagged: "bg-destructive/10 text-destructive",
};

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-md border border-border bg-card shadow-[var(--shadow-card)] ${className}`}
    >
      {children}
    </section>
  );
}

function CardHead({
  title,
  meta,
  action,
}: {
  title: string;
  meta?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
      <div>
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {meta ? <p className="mt-0.5 text-xs text-muted-foreground">{meta}</p> : null}
      </div>
      {action}
    </div>
  );
}

function Dashboard() {
  return (
    <AppShell
      title="Corpus Dashboard"
      subtitle="Consolidated view of ingested geological, exploration and statutory records."
      breadcrumb="Dashboard"
      actions={
        <div className="flex gap-2">
          <Link
            to="/ask"
            className="inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Sparkles className="size-4 text-primary" />
            Ask AnthraCore
          </Link>
          <Link
            to="/upload"
            className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <UploadCloud className="size-4" />
            Upload Document
          </Link>
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="p-5">
            <div className="flex items-start justify-between">
              <p className="label-caps text-muted-foreground">{k.label}</p>
              <k.icon
                className={
                  k.tone === "warn"
                    ? "size-4 text-warning"
                    : k.tone === "good"
                      ? "size-4 text-success"
                      : "size-4 text-muted-foreground"
                }
              />
            </div>
            <p className="mt-3 font-mono text-3xl font-semibold text-foreground">{k.value}</p>
            <p className="mt-1.5 text-xs text-muted-foreground">{k.delta}</p>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHead
            title="Extraction Throughput"
            meta="Thousand pages processed per month · Mar–Aug 2026"
          />
          <div className="h-64 px-3 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={throughput} margin={{ top: 8, right: 16, bottom: 0, left: -12 }}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 6,
                    fontSize: 12,
                  }}
                  formatter={(v: number) => [`${v}k pages`, "Extracted"]}
                />
                <Line
                  type="monotone"
                  dataKey="pages"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "var(--color-primary)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHead title="Corpus Composition" meta="Documents by record class" />
          <div className="h-64 px-3 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={byCategory}
                layout="vertical"
                margin={{ top: 4, right: 16, bottom: 0, left: 4 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  stroke="var(--color-muted-foreground)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 6,
                    fontSize: 12,
                  }}
                  formatter={(v: number) => [`${v.toLocaleString()} docs`, "Indexed"]}
                />
                <Bar dataKey="count" radius={[0, 3, 3, 0]} barSize={14}>
                  {byCategory.map((_, i) => (
                    <Cell
                      key={i}
                      fill={i === 0 ? "var(--color-primary)" : "var(--color-chart-2)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHead
            title="Processing Queue"
            meta="Most recent ingestions across subsidiaries"
            action={
              <Link
                to="/upload"
                className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary"
              >
                View all <ArrowUpRight className="size-3.5" />
              </Link>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="label-caps px-5 py-2.5 text-muted-foreground">Document</th>
                  <th className="label-caps px-3 py-2.5 text-muted-foreground">Pages</th>
                  <th className="label-caps px-3 py-2.5 text-muted-foreground">Status</th>
                  <th className="label-caps px-5 py-2.5 text-right text-muted-foreground">
                    OCR Conf.
                  </th>
                </tr>
              </thead>
              <tbody>
                {queue.map((r) => (
                  <tr key={r.doc} className="border-b border-border last:border-0">
                    <td className="px-5 py-3">
                      <p className="font-mono text-xs text-foreground">{r.doc}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{r.unit}</p>
                    </td>
                    <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{r.pages}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[0.6875rem] font-medium ${statusStyles[r.status]}`}
                      >
                        {r.status === "Processed" ? (
                          <CheckCircle2 className="size-3" />
                        ) : r.status === "Extracting" ? (
                          <Clock className="size-3" />
                        ) : (
                          <AlertTriangle className="size-3" />
                        )}
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-xs text-foreground">
                      {r.conf}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHead title="Cross-Validation Flags" meta="Conflicts against historical records" />
          <ul>
            {flags.map((f) => (
              <li key={f.title} className="border-b border-border px-5 py-4 last:border-0">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-warning" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{f.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.detail}</p>
                    <p className="mt-1.5 font-mono text-[0.6875rem] text-muted-foreground">
                      {f.unit}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}

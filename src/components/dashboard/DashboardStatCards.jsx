import {
  ArrowUpRight,
  Boxes,
  CircleAlert,
  DollarSign,
  Sparkles,
} from "lucide-react";

const statConfig = {
  good: {
    icon: ArrowUpRight,
    tone: "text-emerald-700 bg-emerald-50",
    trend: "text-emerald-700",
  },
  warning: {
    icon: ArrowUpRight,
    tone: "text-amber-700 bg-amber-50",
    trend: "text-amber-700",
  },
  critical: {
    icon: ArrowUpRight,
    tone: "text-red-700 bg-red-50",
    trend: "text-red-700",
  },
  saved: {
    icon: ArrowUpRight,
    tone: "text-emerald-700 bg-emerald-50",
    trend: "text-emerald-700",
  },
};

const stats = [
  {
    label: "Total inventory value",
    value: "$48,290",
    change: "+8.4%",
    note: "vs last period",
    icon: DollarSign,
    tone: "good",
  },
  {
    label: "Items expiring in 3 days",
    value: "12",
    change: "+3",
    note: "needs attention",
    icon: CircleAlert,
    tone: "warning",
  },
  {
    label: "Predicted stockouts",
    value: "7",
    change: "+2",
    note: "this week",
    icon: Boxes,
    tone: "critical",
  },
  {
    label: "Waste saved this month",
    value: "$6,840",
    change: "+14.2%",
    note: "vs last month",
    icon: Sparkles,
    tone: "saved",
  },
];

const DashboardStatCards = () => (
  <section
    className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    aria-label="Inventory summary"
  >
    {stats.map(({ label, value, change, note, icon: Icon, tone }) => {
      const config = statConfig[tone];
      return (
        <article
          key={label}
          className="h-28 group rounded-2xl border border-border/40 bg-card p-5 shadow-[0_8px_28px_rgba(82,70,70,0.06)] transition hover:-translate-y-0.5 hover:border-primary/40"
        >
          <div className="flex items-start justify-between">
            <p className="max-w-48 text-sm font-semibold text-foreground/60">
              {label}
            </p>
            <span className={`rounded-xl p-2 ${config.tone}`}>
              <Icon size={17} />
            </span>
          </div>
          <p className=" text-md font-bold tracking-tight text-foreground">
            {value}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
            <ArrowUpRight size={14} className={config.trend} />
            <span className={config.trend}>{change}</span>
            <span className="text-foreground/40">{note}</span>
          </div>
        </article>
      );
    })}
  </section>
);

export default DashboardStatCards;

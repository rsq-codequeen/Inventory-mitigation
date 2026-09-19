import {
  ArrowUpRight,
  Bell,
  ChevronRight,
  CircleUserRound,
  LayoutDashboard,
} from "lucide-react";
import { Link } from "react-router-dom";

import DashboardStatCards from "../components/dashboard/DashboardStatCards";
import DemandForecastChart from "../components/dashboard/DemandForecastChart";
import ExpiryTimeline from "../components/dashboard/ExpiryTimeline";
import LowStockPanel from "../components/dashboard/LowStockPanel";

const Dashboard = () => (
  <main className="min-h-screen bg-background text-foreground">
    <div className="mx-auto max-w-375 px-4 py-2 sm:px-6 lg:px-8">
      <header className="relative isolate overflow-hidden rounded-3xl bg-black px-5 py-6 text-sidebar-foreground shadow-[0_18px_50px_rgba(82,70,70,0.18)] sm:px-8 sm:py-7">
        
        <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-sidebar-foreground/60">
              <LayoutDashboard size={15} /> Operations dashboard
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Good morning, team.
            </h1>
            <p className="mt-2 max-w-lg text-sm text-sidebar-foreground/65">
              A live view of stock health, expiry risk, and demand across your
              inventory.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Notifications"
              className="rounded-xl border border-white/15 bg-white/10 p-2.5 text-white transition hover:bg-white/20"
            >
              <Bell size={18} />
            </button>
            <button
              type="button"
              aria-label="User profile"
              className="rounded-xl border border-white/15 bg-white/10 p-2.5 text-white transition hover:bg-white/20"
            >
              <CircleUserRound size={18} />
            </button>
            <Link
              to="/enter-stock"
              className="ml-1 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-85"
            >
              Manage stock <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </header>
      <div className="mt-3">
        <DashboardStatCards />
      </div>
      <div className="mt-3 grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(19rem,0.85fr)]">
        <DemandForecastChart />
        <LowStockPanel />
      </div>
      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-stretch">
        <div className="min-w-0 flex-2">
          <ExpiryTimeline />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-between rounded-2xl border border-border/40 bg-card px-5 py-4">
          <div>
            <p className="text-sm font-bold text-foreground">
              Need to make a correction?
            </p>
            <p className="mt-1 text-xs text-foreground/50">
              Review product quantities and adjust stock manually.
            </p>
          </div>
          <Link
            to="/enter-stock"
            className="inline-flex items-center gap-1 text-sm font-bold text-primary"
          >
            Open inventory <ChevronRight size={16} />
          </Link>
        </div>
      </div>
      
    </div>
  </main>
);

export default Dashboard;

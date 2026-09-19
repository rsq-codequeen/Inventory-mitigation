import { ArrowRight, PackageOpen } from 'lucide-react'

const lowStockItems = [
  { name: 'Baby Spinach', stock: '18 bags', days: '2 days', tone: 'bg-red-500' },
  { name: 'Greek Yogurt', stock: '9 cups', days: '3 days', tone: 'bg-amber-500' },
  { name: 'Sourdough Bread', stock: '26 loaves', days: '4 days', tone: 'bg-amber-400' },
  { name: 'Whole Milk', stock: '42 cartons', days: '6 days', tone: 'bg-yellow-400' },
]

const LowStockPanel = () => (
  <section className="flex min-h-100 flex-col rounded-2xl border border-border/40 bg-card p-5 shadow-[0_8px_28px_rgba(82,70,70,0.06)]">
    <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Action queue</p><h2 className="mt-2 text-lg font-bold text-foreground">Low-stock alerts</h2></div><PackageOpen size={19} className="text-foreground/35" /></div>
    <div className="mt-5 flex-1 space-y-2 overflow-y-auto pr-1">
      {lowStockItems.map((item) => (
        <div key={item.name} className="flex items-center gap-3 rounded-xl border border-border/25 p-3 transition hover:border-primary/35 hover:bg-background">
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.tone}`} />
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-foreground">{item.name}</p><p className="mt-1 text-xs text-foreground/50">{item.stock} · stockout in {item.days}</p></div>
          <button type="button" className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-primary px-2.5 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-85">Reorder <ArrowRight size={13} /></button>
        </div>
      ))}
    </div>
    <button type="button" className="mt-4 flex items-center gap-1 text-xs font-bold text-primary">View all alerts <ArrowRight size={14} /></button>
  </section>
)

export default LowStockPanel

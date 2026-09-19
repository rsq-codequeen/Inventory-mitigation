import { CalendarClock } from 'lucide-react'

const expiryGroups = [
  { label: 'Today', count: 2, items: 'Spinach, Sourdough', tone: 'bg-red-500', line: 'border-red-200' },
  { label: 'In 2 days', count: 4, items: 'Yogurt, Berries, Cream', tone: 'bg-amber-500', line: 'border-amber-200' },
  { label: 'In 5 days', count: 6, items: 'Apples, Milk, Herbs', tone: 'bg-yellow-400', line: 'border-yellow-200' },
]

const ExpiryTimeline = () => (
  <section className="rounded-2xl border border-border/40 bg-card p-5 shadow-[0_8px_28px_rgba(82,70,70,0.06)]">
    <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Shelf life</p><h2 className="mt-2 text-lg font-bold text-foreground">Expiry timeline</h2></div><CalendarClock size={19} className="text-foreground/35" /></div>
    <div className="mt-7 grid gap-3 sm:grid-cols-3">
      {expiryGroups.map((group) => (
        <div key={group.label} className={`relative rounded-xl border ${group.line} bg-background p-4`}>
          <div className="flex items-center justify-between"><span className={`h-3 w-3 rounded-full ${group.tone}`} /><span className="text-2xl font-bold text-foreground">{group.count}</span></div>
          <p className="mt-4 text-sm font-bold text-foreground">{group.label}</p><p className="mt-1 text-xs leading-5 text-foreground/50">{group.items}</p>
        </div>
      ))}
    </div>
    <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-muted/30"><span className="w-1/5 bg-red-500" /><span className="w-2/5 bg-amber-500" /><span className="w-2/5 bg-yellow-400" /></div>
  </section>
)

export default ExpiryTimeline

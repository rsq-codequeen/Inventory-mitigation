import { useState } from 'react';
import { Tag, Sparkles, AlertTriangle, ArrowUpDown, CheckCircle2, Sliders } from 'lucide-react';

const initialDiscountItems = [
  {
    id: 1,
    name: 'Baby Spinach',
    sku: 'FRU-014',
    category: 'Fresh produce',
    currentStock: '18 bags',
    stockValue: 63.0, // $3.50 * 18
    daysToExpiry: 3,
    aiDiscount: 35, // AI recommended %
    projectedRevenue: 40.95,
  },
  {
    id: 2,
    name: 'Organic Apples',
    sku: 'FRU-001',
    category: 'Fresh produce',
    currentStock: '84 kg',
    stockValue: 235.2,
    daysToExpiry: 7,
    aiDiscount: 20,
    projectedRevenue: 188.16,
  },
  {
    id: 3,
    name: 'Greek Yogurt',
    sku: 'DAR-008',
    category: 'Dairy',
    currentStock: '24 cups',
    stockValue: 48.0,
    daysToExpiry: 2,
    aiDiscount: 45,
    projectedRevenue: 26.40,
  },
  {
    id: 4,
    name: 'Sourdough Bread',
    sku: 'BAK-003',
    category: 'Bakery',
    currentStock: '12 loaves',
    stockValue: 42.0,
    daysToExpiry: 1,
    aiDiscount: 50,
    projectedRevenue: 21.00,
  },
];

export default function Discounts() {
  const [items] = useState(initialDiscountItems);
  const [sortBy, setSortBy] = useState('urgency'); // 'urgency' or 'loss'
  // Track slider overrides per item: { [id]: sliderValue }
  const [customDiscounts, setCustomDiscounts] = useState({});
  const [appliedSuccess, setAppliedSuccess] = useState({});

  // Handle slider changes
  const handleSliderChange = (id, val) => {
    setCustomDiscounts((prev) => ({ ...prev, [id]: Number(val) }));
  };

  // Apply discount action
  const handleApply = (item) => {
    const discountToApply = customDiscounts[item.id] !== undefined 
      ? customDiscounts[item.id] 
      : item.aiDiscount;
    
    setAppliedSuccess((prev) => ({ ...prev, [item.id]: discountToApply }));
    // Optional: clear success message after 3 seconds
    setTimeout(() => {
      setAppliedSuccess((prev) => {
        const copy = { ...prev };
        delete copy[item.id];
        return copy;
      });
    }, 3000);
  };

  // Sorting logic
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'urgency') {
      return a.daysToExpiry - b.daysToExpiry; // fewer days first
    } else {
      return b.stockValue - a.stockValue; // highest value at risk first
    }
  });

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      
      {/* Top Banner Header matching Dashboard style */}
      <div className="rounded-2xl bg-black p-6 text-white shadow-md sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-1">
            <Tag size={14} />
            Dynamic Pricing Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">AI Markdown Recommendations</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Prevent inventory waste by deploying smart, real-time discounts on items nearing expiry.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl border border-white/10">
          <Sparkles className="text-primary" size={20} />
          <div>
            <div className="text-xs text-neutral-400">Total Value at Risk</div>
            <div className="text-lg font-bold text-white">
              ${items.reduce((acc, curr) => acc + curr.stockValue, 0).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar: Filters & Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card border border-border p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <Sliders size={16} className="text-primary" />
          <span>Showing <strong className="text-foreground">{items.length} items</strong> nearing expiry window</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Sort by:</span>
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-48 appearance-none rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="urgency">Urgency (Days to expiry)</option>
              <option value="loss">Potential Loss ($ Value)</option>
            </select>
            <ArrowUpDown size={14} className="absolute right-3 top-3 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Discount Cards Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {sortedItems.map((item) => {
          const currentDiscount = customDiscounts[item.id] !== undefined 
            ? customDiscounts[item.id] 
            : item.aiDiscount;
            
          const estimatedRevenue = (item.stockValue * (1 - currentDiscount / 100)).toFixed(2);
          const isSuccess = appliedSuccess[item.id] !== undefined;

          return (
            <div 
              key={item.id}
              className="bg-card border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all hover:shadow-md relative overflow-hidden"
            >
              {/* Top Row: Name, SKU, & Urgency Badge */}
              <div>
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                    <span className="text-xs font-medium text-muted-foreground">{item.sku} • {item.category}</span>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    item.daysToExpiry <= 2 
                      ? 'bg-destructive/10 text-destructive border border-destructive/20' 
                      : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                  }`}>
                    <AlertTriangle size={12} />
                    {item.daysToExpiry} {item.daysToExpiry === 1 ? 'day' : 'days'} left
                  </span>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 gap-4 py-3 my-3 border-y border-border/60 bg-muted/20 px-4 rounded-xl">
                  <div>
                    <span className="text-xs text-muted-foreground block">Current Stock</span>
                    <span className="text-sm font-semibold text-foreground">{item.currentStock}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Value at Risk</span>
                    <span className="text-sm font-semibold text-foreground">${item.stockValue.toFixed(2)}</span>
                  </div>
                </div>

                {/* AI Recommendation Highlight Box */}
                <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground block">AI Recommended</span>
                      <span className="text-xs font-bold text-foreground">Optimal clearance rate</span>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-primary tracking-tight">
                    {item.aiDiscount}% <span className="text-xs font-normal text-muted-foreground">off</span>
                  </div>
                </div>

                {/* Interactive Override Slider */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span className="text-muted-foreground">Adjust Markdown % (Assistive)</span>
                    <span className="text-foreground font-bold">{currentDiscount}% Selected</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    step="5"
                    value={currentDiscount}
                    onChange={(e) => handleSliderChange(item.id, e.target.value)}
                    className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>5% (Light)</span>
                    <span>Projected Recovery: <strong className="text-foreground">${estimatedRevenue}</strong></span>
                    <span>80% (Clearance)</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div>
                {isSuccess ? (
                  <div className="w-full py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold">
                    <CheckCircle2 size={16} />
                    Discount Applied ({appliedSuccess[item.id]}% OFF)
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleApply(item)}
                    className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    Apply {currentDiscount}% Discount
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
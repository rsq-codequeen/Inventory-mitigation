import { useState } from 'react';
import { 
  BarChart3, 
  TrendingDown, 
  DollarSign, 
  PackageCheck, 
  Leaf, 
  Calendar, 
  ArrowUpRight, 
  Download 
} from 'lucide-react';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30days');

  // Dynamic sample data based on selected range
  const metricsData = {
    '7days': {
      saved: '$1,840',
      savedPercent: '+12.4%',
      diverted: '312 units',
      divertedPercent: '+8.1%',
      co2: '142 kg',
      wasteBefore: 420,
      wasteAfter: 110,
    },
    '30days': {
      saved: '$6,840',
      savedPercent: '+14.2%',
      diverted: '1,420 units',
      divertedPercent: '+18.5%',
      co2: '610 kg',
      wasteBefore: 1850,
      wasteAfter: 420,
    },
    '90days': {
      saved: '$21,500',
      savedPercent: '+22.8%',
      diverted: '4,890 units',
      divertedPercent: '+31.0%',
      co2: '2,150 kg',
      wasteBefore: 6200,
      wasteAfter: 1150,
    }
  };

  const currentMetrics = metricsData[timeRange];

  // Category waste data (pre-tool vs post-tool impact)
  const categoryWaste = [
    { name: 'Fresh Produce', pre: 850, post: 180, color: 'bg-primary' },
    { name: 'Dairy & Eggs', pre: 520, post: 95, color: 'bg-amber-500' },
    { name: 'Bakery', pre: 340, post: 70, color: 'bg-sidebar' },
    { name: 'Pantry & Grains', pre: 140, post: 30, color: 'bg-secondary' },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      
      {/* Top Banner Header */}
      <div className="rounded-2xl bg-black p-6 text-white shadow-md sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-1">
            <BarChart3 size={14} />
            Impact & Reporting Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Analytics & Business Case</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Monitor waste reduction, financial savings, and diversion rates driven by real-time markdown optimizations.
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/10">
          <Calendar size={16} className="text-primary ml-2" />
          <button 
            onClick={() => setTimeRange('7days')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${timeRange === '7days' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-neutral-300 hover:text-white'}`}
          >
            Last 7 Days
          </button>
          <button 
            onClick={() => setTimeRange('30days')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${timeRange === '30days' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-neutral-300 hover:text-white'}`}
          >
            Last 30 Days
          </button>
          <button 
            onClick={() => setTimeRange('90days')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${timeRange === '90days' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-neutral-300 hover:text-white'}`}
          >
            Last 90 Days
          </button>
        </div>
      </div>

      {/* Savings Summary Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1: Total Saved */}
        <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total $ Saved</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">{currentMetrics.saved}</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
            <ArrowUpRight size={14} />
            <span>{currentMetrics.savedPercent} vs previous period</span>
          </div>
        </div>

        {/* Card 2: Units Diverted */}
        <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Units Diverted</span>
            <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <PackageCheck size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">{currentMetrics.diverted}</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
            <ArrowUpRight size={14} />
            <span>{currentMetrics.divertedPercent} clearance efficiency</span>
          </div>
        </div>

        {/* Card 3: Waste Prevented */}
        <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Waste Prevented</span>
            <div className="h-8 w-8 rounded-lg bg-sidebar/10 text-sidebar flex items-center justify-center">
              <TrendingDown size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">
            -${(currentMetrics.wasteBefore - currentMetrics.wasteAfter)}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium mt-1">
            <span>Down from ${currentMetrics.wasteBefore} baseline</span>
          </div>
        </div>

        {/* Card 4: Environmental Impact */}
        <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">CO2 Offset</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Leaf size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">{currentMetrics.co2}</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
            <span>Equivalent to 30 trees planted</span>
          </div>
        </div>

      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
        
        {/* Waste Reduction Comparison Chart */}
        <div className="lg:col-span-2 bg-card border border-border p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Waste Financial Trend ($)</h3>
                <p className="text-xs text-muted-foreground">Before AI Dynamic Pricing vs. After Tool Adoption</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-sidebar/40"></div>
                  <span className="text-muted-foreground">Baseline Waste</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <span className="text-foreground font-semibold">With Devarcher AI</span>
                </div>
              </div>
            </div>

            {/* Visual Bar Comparison Simulation */}
            <div className="space-y-4 my-6 py-2">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-muted-foreground">Estimated Waste Baseline</span>
                  <span className="text-foreground font-bold">${currentMetrics.wasteBefore}</span>
                </div>
                <div className="h-4 w-full bg-muted/50 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-sidebar/50 rounded-full transition-all duration-500" 
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-muted-foreground">Actual Waste with Dynamic Pricing</span>
                  <span className="text-primary font-bold">${currentMetrics.wasteAfter}</span>
                </div>
                <div className="h-4 w-full bg-muted/50 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500 shadow-sm" 
                    style={{ width: `${(currentMetrics.wasteAfter / currentMetrics.wasteBefore) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between text-xs">
            <span className="text-foreground font-medium">💡 Insight: Fresh produce category experienced a <strong>78% drop</strong> in expired product loss.</span>
            <span className="text-primary font-bold shrink-0">High ROI</span>
          </div>
        </div>

        {/* Category Breakdown Horizontal Bars */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground mb-1">Waste by Category</h3>
            <p className="text-xs text-muted-foreground mb-6">Total volume of risk distributed across store sections.</p>

            <div className="space-y-5">
              {categoryWaste.map((cat) => {
                const percentage = Math.round((cat.post / cat.pre) * 100);
                return (
                  <div key={cat.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-foreground font-semibold">{cat.name}</span>
                      <span className="text-muted-foreground">${cat.post} loss <span className="text-[10px] text-emerald-600 font-bold">({percentage}% of baseline)</span></span>
                    </div>
                    <div className="h-2.5 w-full bg-muted/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${cat.color} rounded-full`} 
                        style={{ width: `${percentage * 1.2}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button 
            type="button"
            onClick={() => alert('Exporting analytics report as CSV...')}
            className="w-full mt-6 py-2.5 bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-border"
          >
            <Download size={14} />
            Export Full Analytics Report
          </button>
        </div>

      </div>

    </div>
  );
}
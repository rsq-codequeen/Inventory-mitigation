import { useState } from 'react'
import { Activity } from 'lucide-react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const forecastData = {
  'Baby Spinach': [{ day: 'Mon', actual: 8, predicted: 9 }, { day: 'Tue', actual: 12, predicted: 11 }, { day: 'Wed', actual: 11, predicted: 13 }, { day: 'Thu', actual: 15, predicted: 14 }, { day: 'Fri', actual: 14, predicted: 16 }, { day: 'Sat', actual: null, predicted: 15 }, { day: 'Sun', actual: null, predicted: 18 }],
  'Organic Apples': [{ day: 'Mon', actual: 18, predicted: 17 }, { day: 'Tue', actual: 22, predicted: 20 }, { day: 'Wed', actual: 16, predicted: 19 }, { day: 'Thu', actual: 20, predicted: 21 }, { day: 'Fri', actual: 24, predicted: 23 }, { day: 'Sat', actual: null, predicted: 26 }, { day: 'Sun', actual: null, predicted: 25 }],
  'Whole Milk': [{ day: 'Mon', actual: 12, predicted: 13 }, { day: 'Tue', actual: 10, predicted: 11 }, { day: 'Wed', actual: 14, predicted: 13 }, { day: 'Thu', actual: 11, predicted: 12 }, { day: 'Fri', actual: 13, predicted: 14 }, { day: 'Sat', actual: null, predicted: 15 }, { day: 'Sun', actual: null, predicted: 15 }],
}

const DemandForecastChart = () => {
  const [selectedProduct, setSelectedProduct] = useState('Baby Spinach')
  const data = forecastData[selectedProduct]

  return (
    <section className="min-h-100 rounded-2xl border border-border/40 bg-card p-5 shadow-[0_8px_28px_rgba(82,70,70,0.06)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Forward view</p><h2 className="mt-2 text-lg font-bold text-foreground">Demand forecast</h2><p className="mt-1 text-xs text-foreground/50">Actual performance vs predicted demand</p></div><div className="flex items-center gap-2"><Activity size={17} className="text-primary" /><label htmlFor="forecast-product" className="sr-only">Select product</label><select id="forecast-product" value={selectedProduct} onChange={(event) => setSelectedProduct(event.target.value)} className="rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">{Object.keys(forecastData).map((product) => <option key={product}>{product}</option>)}</select></div></div>
      <div className="mt-6 h-64 w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}><CartesianGrid stroke="#A8A492" strokeOpacity={0.2} vertical={false} /><XAxis dataKey="day" tick={{ fill: '#524646', fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: '#524646', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} /><Tooltip contentStyle={{ border: '1px solid #A8A492', borderRadius: '12px', background: '#FFFFFF', color: '#000000' }} /><Legend verticalAlign="top" height={30} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#524646' }} /><Line type="monotone" dataKey="actual" name="Actual" stroke="#524646" strokeWidth={2.5} dot={{ r: 3, fill: '#524646' }} connectNulls={false} /><Line type="monotone" dataKey="predicted" name="Predicted" stroke="#EC5B38" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 3, fill: '#EC5B38' }} /></LineChart></ResponsiveContainer></div>
    </section>
  )
}

export default DemandForecastChart

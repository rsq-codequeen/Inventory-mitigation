const stockStyles = {
  healthy: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  low: 'bg-amber-50 text-amber-700 ring-amber-200',
  critical: 'bg-red-50 text-red-700 ring-red-200',
}

const StockBadge = ({ stock, demand }) => {
  const ratio = stock / Math.max(demand, 1)
  const status = ratio < 0.5 ? 'critical' : ratio < 1 ? 'low' : 'healthy'
  const label = status[0].toUpperCase() + status.slice(1)

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${stockStyles[status]}`}>
      {label}
    </span>
  )
}

export default StockBadge

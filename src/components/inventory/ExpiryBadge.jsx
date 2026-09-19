const ExpiryBadge = ({ days }) => {
  const tone = days <= 3
    ? 'bg-red-50 text-red-700 ring-red-200'
    : days <= 7
      ? 'bg-amber-50 text-amber-700 ring-amber-200'
      : 'bg-emerald-50 text-emerald-700 ring-emerald-200'

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tone}`}>
      {days <= 0 ? 'Expired' : `${days} days left`}
    </span>
  )
}

export default ExpiryBadge

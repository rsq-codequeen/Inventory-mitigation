import { ChevronDown, History, PackagePlus } from 'lucide-react'
import StockBadge from './StockBadge'
import ExpiryBadge from './ExpiryBadge'

const ProductCard = ({ product, onOpen, onAdjust }) => (
  <article className="rounded-2xl border border-border/40 bg-card p-4 shadow-[0_8px_24px_rgba(82,70,70,0.06)] transition hover:-translate-y-0.5 hover:border-primary/50">
    <button type="button" onClick={() => onOpen(product)} className="w-full text-left">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-bold text-card-foreground">{product.name}</p>
          <p className="mt-1 text-xs text-card-foreground/50">{product.sku} · {product.unit}</p>
        </div>
        <StockBadge stock={product.stock} demand={product.demand} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div><p className="text-xs text-card-foreground/45">Current stock</p><p className="mt-1 font-semibold text-card-foreground">{product.stock} {product.unit}</p></div>
        <div><p className="text-xs text-card-foreground/45">Unit price</p><p className="mt-1 font-semibold text-card-foreground">${product.price.toFixed(2)}</p></div>
        <div><p className="text-xs text-card-foreground/45">Predicted demand</p><p className="mt-1 font-semibold text-card-foreground">{product.demand} / 7 days</p></div>
        <div><p className="text-xs text-card-foreground/45">Expiry date</p><p className="mt-1 font-semibold text-card-foreground">{product.expiry}</p></div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border/25 pt-3">
        <ExpiryBadge days={product.daysToExpiry} />
        <span className="flex items-center gap-1 text-xs font-semibold text-primary">View details <ChevronDown size={14} /></span>
      </div>
    </button>
    <div className="mt-3 flex gap-2">
      <button type="button" onClick={() => onAdjust(product)} className="flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-2 text-xs font-semibold text-card-foreground transition hover:border-primary hover:text-primary"><PackagePlus size={14} /> Adjust stock</button>
      <button type="button" onClick={() => onOpen(product)} className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground transition hover:bg-border"><History size={14} /> Sales history</button>
    </div>
  </article>
)

export default ProductCard

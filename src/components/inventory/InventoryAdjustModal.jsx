import { X } from 'lucide-react'

const InventoryAdjustModal = ({ product, onClose, onSave }) => {
  if (!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4" role="dialog" aria-modal="true" aria-labelledby="adjust-stock-title">
      <form onSubmit={(event) => { event.preventDefault(); onSave(Number(event.currentTarget.quantity.value)) }} className="w-full max-w-md rounded-2xl bg-card p-6 text-card-foreground shadow-2xl">
        <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Inventory correction</p><h2 id="adjust-stock-title" className="mt-2 text-xl font-bold text-card-foreground">Adjust {product.name}</h2></div><button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1 text-card-foreground/50 hover:bg-foreground/5 hover:text-card-foreground"><X size={20} /></button></div>
        <p className="mt-3 text-sm text-card-foreground/55">Current stock: <strong className="text-card-foreground">{product.stock} {product.unit}</strong></p>
        <label className="mt-6 block text-sm font-semibold text-card-foreground" htmlFor="quantity">New stock quantity</label>
        <input id="quantity" name="quantity" type="number" min="0" defaultValue={product.stock} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-card-foreground/60 hover:bg-foreground/5">Cancel</button><button type="submit" className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-85">Save adjustment</button></div>
      </form>
    </div>
  )
}

export default InventoryAdjustModal

import { ChevronDown, ChevronRight, Layers3, X } from 'lucide-react'
import { useState } from 'react'

const CategorySidebar = ({ categories, activeCategory, onSelect, isMobileOpen, onClose }) => {
  const [expandedCategories, setExpandedCategories] = useState(() => new Set())

  const handleCategoryClick = (category) => {
    onSelect(category.name)
    if (category.name === 'All products') {
      setExpandedCategories((current) => current.size === categories.length
        ? new Set()
        : new Set(categories.map((item) => item.name)))
      return
    }
    setExpandedCategories((current) => {
      const next = new Set(current)
      if (next.has(category.name)) {
        next.delete(category.name)
      } else {
        next.add(category.name)
      }
      return next
    })
  }

  return (
  <>
    {isMobileOpen && <button type="button" aria-label="Close categories" onClick={onClose} className="fixed inset-0 z-40 bg-black/40 lg:hidden" />}
    <aside className={`${isMobileOpen ? 'fixed inset-y-0 left-0 z-50 block w-72 animate-[sidebar-enter_250ms_ease-out]' : 'hidden'} max-h-screen shrink-0 overflow-y-auto border-r border-sidebar-border/40 bg-sidebar p-4 text-sidebar-foreground lg:sticky lg:top-0 lg:block lg:h-screen lg:max-h-none lg:w-64 lg:p-6`}>
    <div className="mb-4 flex items-center justify-between px-2">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-sidebar-foreground/60"><Layers3 size={15} />Categories</div>
      <button type="button" onClick={onClose} aria-label="Close categories" className="rounded-lg p-1 text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground lg:hidden"><X size={18} /></button>
    </div>
    <nav className="space-y-1" aria-label="Inventory categories">
      {categories.map((category) => {
        const active = category.name === activeCategory
        return (
          <div key={category.name}>
            <button
              type="button"
              onClick={() => handleCategoryClick(category)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition ${active ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm' : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground'}`}
            >
              <span>
                <span className="block text-sm font-semibold">{category.name}</span>
                <span className={`text-xs ${active ? 'text-sidebar-primary-foreground/75' : 'text-sidebar-foreground/45'}`}>{category.count} products</span>
              </span>
              {category.products?.length > 0
                ? <ChevronDown className={`transition-transform duration-300 ${expandedCategories.has(category.name) ? 'rotate-0' : '-rotate-90'}`} size={16} />
                : <ChevronRight size={16} />}
            </button>
            {category.products?.length > 0 && (
              <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${expandedCategories.has(category.name) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="min-h-0 overflow-hidden">
                  <div className="ml-3 border-l border-sidebar-border/40 pl-3">
                    {category.products.map((product) => (
                      <div key={product.sku} className="border-b border-sidebar-border/30 py-2.5 last:border-b-0">
                        <p className="text-sm text-sidebar-foreground/90">{product.name}</p>
                        <p className="mt-0.5 text-xs text-sidebar-foreground/45">{product.stock} {product.unit} in stock</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </nav>
    </aside>
  </>
  )
}

export default CategorySidebar

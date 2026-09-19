
import { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, Menu, Plus, Search, SlidersHorizontal } from 'lucide-react'
import CategorySidebar from '../components/inventory/CategorySidebar'
import InventoryAdjustModal from '../components/inventory/InventoryAdjustModal'
import ProductCard from '../components/inventory/ProductCard'
import ProductDetailPanel from '../components/inventory/ProductDetailPanel'

const initialProducts = [
  { name: 'Organic Apples', category: 'Fresh produce', sku: 'FRU-001', stock: 84, unit: 'kg', price: 2.8, expiry: 'Sep 26, 2026', daysToExpiry: 7, demand: 60, sales: [18, 22, 16, 20, 24, 19, 21] },
  { name: 'Baby Spinach', category: 'Fresh produce', sku: 'FRU-014', stock: 18, unit: 'bags', price: 3.5, expiry: 'Sep 22, 2026', daysToExpiry: 3, demand: 32, sales: [8, 12, 11, 15, 14, 13, 16] },
  { name: 'Whole Milk', category: 'Dairy', sku: 'DAI-003', stock: 42, unit: 'cartons', price: 1.9, expiry: 'Sep 29, 2026', daysToExpiry: 10, demand: 36, sales: [12, 10, 14, 11, 13, 12, 15] },
  { name: 'Greek Yogurt', category: 'Dairy', sku: 'DAI-011', stock: 9, unit: 'cups', price: 1.4, expiry: 'Sep 23, 2026', daysToExpiry: 4, demand: 20, sales: [5, 7, 6, 8, 7, 9, 8] },
  { name: 'Sourdough Bread', category: 'Bakery', sku: 'BAK-008', stock: 26, unit: 'loaves', price: 4.2, expiry: 'Sep 21, 2026', daysToExpiry: 2, demand: 18, sales: [7, 6, 8, 5, 9, 7, 8] },
  { name: 'Brown Rice', category: 'Pantry', sku: 'PAN-021', stock: 60, unit: 'bags', price: 5.9, expiry: 'Mar 12, 2027', daysToExpiry: 174, demand: 22, sales: [3, 4, 2, 5, 3, 4, 3] },
]

const EnterStock = () => {
  const [products, setProducts] = useState(initialProducts)
  const [activeCategory, setActiveCategory] = useState('All products')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [openGroups, setOpenGroups] = useState({ 'Fresh produce': true, Dairy: true, Bakery: true, Pantry: true })
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [adjustingProduct, setAdjustingProduct] = useState(null)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const categories = useMemo(() => {
    const grouped = initialProducts.reduce((result, product) => ({ ...result, [product.category]: [...(result[product.category] || []), product] }), {})
    return [{ name: 'All products', count: initialProducts.length, products: initialProducts }, ...Object.entries(grouped).map(([name, categoryProducts]) => ({ name, count: categoryProducts.length, products: categoryProducts }))]
  }, [])

  const groupedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = activeCategory === 'All products' || product.category === activeCategory
      const matchesQuery = `${product.name} ${product.sku}`.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    }).sort((a, b) => sortBy === 'stock' ? a.stock - b.stock : sortBy === 'expiry' ? a.daysToExpiry - b.daysToExpiry : a.name.localeCompare(b.name))
    return filtered.reduce((groups, product) => ({ ...groups, [product.category]: [...(groups[product.category] || []), product] }), {})
  }, [activeCategory, products, query, sortBy])

  const saveAdjustment = (quantity) => {
    setProducts((current) => current.map((product) => product.sku === adjustingProduct.sku ? { ...product, stock: quantity } : product))
    setAdjustingProduct(null)
  }

  const handleCategorySelect = (category) => {
    setActiveCategory(category)
    setIsMobileSidebarOpen(false)
    setOpenGroups((current) => category === 'All products'
      ? Object.keys(current).reduce((groups, name) => ({ ...groups, [name]: true }), current)
      : { ...current, [category]: true })
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <CategorySidebar categories={categories} activeCategory={activeCategory} onSelect={handleCategorySelect} isMobileOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
        <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <button type="button" onClick={() => setIsMobileSidebarOpen(true)} className="mb-5 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm lg:hidden"><Menu size={17} /> Categories</button>
        <header className="flex flex-col gap-4 border-b border-border/30 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Inventory control</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Enter stock</h1><p className="mt-2 max-w-xl text-sm text-foreground/55">Monitor stock health, expiry windows, and predicted demand across your inventory.</p></div>
          <button type="button" onClick={() => setAdjustingProduct(products[0])} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-85 sm:w-auto"><Plus size={17} /> Add stock</button>
        </header>
        <div className="mt-7">
          <section className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 sm:max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products or SKU" className="w-full rounded-xl border border-border/60 bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" /></div>
              <div className="flex w-full items-center gap-2 md:w-auto"><SlidersHorizontal size={16} className="text-foreground/45" /><label htmlFor="sort" className="sr-only">Sort inventory</label><select id="sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="w-full rounded-xl border border-border/60 bg-background px-3 py-3 text-sm font-semibold text-foreground outline-none focus:border-primary md:w-48"><option value="name">Sort: Name</option><option value="stock">Sort: Stock level</option><option value="expiry">Sort: Expiry</option></select></div>
            </div>
            <div className="mt-7 space-y-4">
              {Object.entries(groupedProducts).map(([category, categoryProducts]) => {
                const isOpen = openGroups[category]
                return <section key={category} className="rounded-2xl border border-border/30 bg-card/60 p-3 sm:p-4"><button type="button" onClick={() => setOpenGroups((current) => ({ ...current, [category]: !current[category] }))} className="flex w-full items-center justify-between px-1 pb-3 text-left"><span><span className="text-lg font-bold text-foreground">{category}</span><span className="ml-2 text-xs text-foreground/45">{categoryProducts.length} products</span></span>{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>{isOpen && <div className="grid gap-3 xl:grid-cols-2">{categoryProducts.map((product) => <ProductCard key={product.sku} product={product} onOpen={setSelectedProduct} onAdjust={setAdjustingProduct} />)}</div>}</section>
              })}
              {!Object.keys(groupedProducts).length && <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-foreground/55">No products match your search.</div>}
            </div>
          </section>
        </div>
      </div>
      </div>
      </div>
      <ProductDetailPanel product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <InventoryAdjustModal product={adjustingProduct} onClose={() => setAdjustingProduct(null)} onSave={saveAdjustment} />
    </main>
  )
}

export default EnterStock
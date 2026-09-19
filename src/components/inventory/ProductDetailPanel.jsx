import { ArrowRight, X } from "lucide-react";
import StockBadge from "./StockBadge";
import { useState } from "react";
const ProductDetailPanel = ({ product, onClose }) => {
  const [closingProduct, setClosingProduct] = useState(null);
  const displayedProduct = product || closingProduct;
  const isOpen = Boolean(product);

  const handleClose = () => {
    if (product) {
      setClosingProduct(product);
    }
    onClose();
  };

  if (!displayedProduct) return null;

  return (
    <div className="fixed inset-0 z-2000 bg-black/25" onClick={handleClose}>
      <aside
        onTransitionEnd={() => {
          if (!isOpen) setClosingProduct(null);
        }}
        className={`animate-[product-panel-enter_300ms_ease-out] absolute right-0 top-0 h-full w-full max-w-md transform overflow-y-auto bg-card p-6 text-card-foreground shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Product details
            </p>
            <h2 className="mt-2 text-2xl font-bold text-card-foreground">
              {displayedProduct.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="rounded-lg p-1 text-card-foreground/50 hover:bg-foreground/5 hover:text-card-foreground"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-6 flex items-center justify-between rounded-xl bg-background p-4">
          <span className="text-sm text-card-foreground/60">
            Current status
          </span>
          <StockBadge
            stock={displayedProduct.stock}
            demand={displayedProduct.demand}
          />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            ["SKU", displayedProduct.sku],
            ["Category", displayedProduct.category],
            [
              "Current stock",
              `${displayedProduct.stock} ${displayedProduct.unit}`,
            ],
            ["Unit price", `$${displayedProduct.price.toFixed(2)}`],
            ["Expiry date", displayedProduct.expiry],
            [
              "7-day demand",
              `${displayedProduct.demand} ${displayedProduct.unit}`,
            ],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-border/35 p-3">
              <p className="text-xs text-card-foreground/45">{label}</p>
              <p className="mt-1 text-sm font-semibold text-card-foreground">
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-card-foreground">Demand outlook</h3>
            <span className="text-xs text-card-foreground/45">Next 7 days</span>
          </div>
          <div className="mt-4 flex h-36 items-end gap-2 rounded-xl bg-background p-4">
            {displayedProduct.sales.map((value, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-t-md bg-primary"
                  style={{ height: `${Math.max(value * 2.5, 12)}px` }}
                />
                <span className="text-[10px] text-card-foreground/45">
                  D{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="mt-8 flex items-center gap-2 text-sm font-bold text-[#EC5B38]"
        >
          Open full sales history <ArrowRight size={16} />
        </button>
      </aside>
    </div>
  );
};

export default ProductDetailPanel;

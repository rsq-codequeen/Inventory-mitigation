import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AppNavbar = ({ theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Enter Stock", href: "/enter-stock" },
    { label: "Discount", href: "/discount" },
    { label: "Analytics", href: "/analytics" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background px-4 py-3.5 text-foreground shadow-sm sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold tracking-tight ">
            Devarcher 
            <span className="ml-2 rounded bg-primary px-1.5 py-0.5 text-[10px] uppercase font-semibold text-primary-foreground shadow-sm">
              Inventory
            </span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-primary text-black shadow-sm shadow-primary/20'
                    : 'text-foreground hover:bg-sidebar/10 '
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="rounded-lg p-2 text-foreground transition hover:bg-sidebar/10"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-bold text-sidebar-accent-foreground">
            D
          </div>
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-foreground transition hover:bg-sidebar/10 md:hidden"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        </div>
        <nav className={`overflow-hidden transition-[max-height,opacity] duration-300 md:hidden ${isMenuOpen ? 'mt-3 max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-1 border-t border-border/40 pt-3">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-primary text-black shadow-sm' : 'text-foreground hover:bg-sidebar/10'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AppNavbar;
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils';
import { ROUTES } from '../../constants';

const navItems = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Agents', path: ROUTES.AGENTS },
  { label: 'Lifecycle', path: ROUTES.LIFECYCLE },
  { label: 'Examples', path: ROUTES.EXAMPLES },
  { label: 'Interactive', path: ROUTES.INTERACTIVE },
  { label: 'Resources', path: ROUTES.RESOURCES },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === ROUTES.HOME) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to={ROUTES.HOME} className="flex items-center space-x-2">
            <h1 className="text-xl font-pixel text-gradient-cyan-magenta">Virtual Team</h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-areas',
                    isActive(item.path) ? 'text-areas' : 'text-gray-300'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <ul className="md:hidden mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'block py-2 text-sm font-medium transition-colors',
                    isActive(item.path) ? 'text-areas' : 'text-gray-300'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

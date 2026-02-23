import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-void text-gray-100">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

/**
 * Custom render function that wraps components with BrowserRouter
 */
export function renderWithRouter(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: BrowserRouter, ...options });
}

/**
 * Custom render function that wraps components with MemoryRouter
 * Useful for testing routing with specific initial entries
 */
export function renderWithMemoryRouter(
  ui: ReactElement,
  { initialEntries = ['/'], ...options }: MemoryRouterProps & RenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;
  }
  return render(ui, { wrapper: Wrapper, ...options });
}

/**
 * Mock ResizeObserver for tests
 */
export class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Set up global mocks
global.ResizeObserver = MockResizeObserver as any;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

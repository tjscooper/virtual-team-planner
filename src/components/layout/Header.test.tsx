import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

function renderHeader(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Header />
    </MemoryRouter>
  );
}

describe('Header component', () => {
  describe('rendering', () => {
    it('should render the site logo', () => {
      renderHeader();
      expect(screen.getByText('Virtual Team')).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
      renderHeader();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Agents')).toBeInTheDocument();
      expect(screen.getByText('Lifecycle')).toBeInTheDocument();
      expect(screen.getByText('Examples')).toBeInTheDocument();
      expect(screen.getByText('Interactive')).toBeInTheDocument();
      expect(screen.getByText('Resources')).toBeInTheDocument();
    });

    it('should have sticky positioning', () => {
      const { container } = renderHeader();
      const header = container.querySelector('header');
      expect(header).toHaveClass('sticky', 'top-0', 'z-50');
    });

    it('should render mobile menu button', () => {
      renderHeader();
      expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
    });
  });

  describe('navigation links', () => {
    it('should highlight active Home link', () => {
      renderHeader('/');
      const homeLinks = screen.getAllByText('Home');
      // Desktop nav link should be highlighted
      expect(homeLinks[0]).toHaveClass('text-areas');
    });

    it('should highlight active Agents link', () => {
      renderHeader('/agents');
      const agentsLinks = screen.getAllByText('Agents');
      expect(agentsLinks[0]).toHaveClass('text-areas');
    });

    it('should highlight parent route for nested paths', () => {
      renderHeader('/agents/product-owner');
      const agentsLinks = screen.getAllByText('Agents');
      expect(agentsLinks[0]).toHaveClass('text-areas');
    });

    it('should not highlight inactive links', () => {
      renderHeader('/');
      const agentsLinks = screen.getAllByText('Agents');
      expect(agentsLinks[0]).toHaveClass('text-gray-300');
    });
  });

  describe('mobile menu', () => {
    it('should not show mobile navigation by default', () => {
      const { container } = renderHeader();
      const mobileNav = container.querySelector('.md\\:hidden.mt-4');
      expect(mobileNav).not.toBeInTheDocument();
    });

    it('should open mobile menu when button is clicked', async () => {
      const user = userEvent.setup();
      renderHeader();

      await user.click(screen.getByLabelText('Toggle menu'));

      // Mobile nav should now be visible
      const mobileLinks = screen.getAllByText('Agents');
      expect(mobileLinks.length).toBeGreaterThan(1); // Desktop + mobile
    });

    it('should close mobile menu when clicking toggle again', async () => {
      const user = userEvent.setup();
      const { container } = renderHeader();

      const toggleButton = screen.getByLabelText('Toggle menu');
      await user.click(toggleButton);
      await user.click(toggleButton);

      const mobileNav = container.querySelector('.md\\:hidden.mt-4');
      expect(mobileNav).not.toBeInTheDocument();
    });

    it('should close mobile menu when clicking a link', async () => {
      const user = userEvent.setup();
      const { container } = renderHeader();

      await user.click(screen.getByLabelText('Toggle menu'));

      const agentsLinks = screen.getAllByText('Agents');
      const mobileAgentsLink = agentsLinks[agentsLinks.length - 1]; // Last one is mobile
      await user.click(mobileAgentsLink);

      // Wait a tick for state update
      await new Promise(resolve => setTimeout(resolve, 0));

      const mobileNav = container.querySelector('.md\\:hidden.mt-4');
      expect(mobileNav).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have navigation landmark', () => {
      const { container } = renderHeader();
      expect(container.querySelector('nav')).toBeInTheDocument();
    });

    it('should have accessible mobile menu button', () => {
      renderHeader();
      const button = screen.getByLabelText('Toggle menu');
      expect(button).toHaveAttribute('aria-label', 'Toggle menu');
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      renderHeader();

      // Tab to first link
      await user.tab();
      const logo = screen.getByText('Virtual Team');
      expect(logo.closest('a')).toHaveFocus();
    });
  });
});

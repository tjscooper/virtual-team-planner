import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from '../HomePage';

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
}

describe('HomePage', () => {
  describe('hero section', () => {
    it('should render main headline', () => {
      renderHomePage();
      expect(screen.getByText(/Think Like a Team/i)).toBeInTheDocument();
      expect(screen.getByText(/Not a Tool/i)).toBeInTheDocument();
    });

    it('should render value proposition', () => {
      renderHomePage();
      expect(
        screen.getByText(/The only AI development platform that orchestrates/i)
      ).toBeInTheDocument();
    });

    it('should render CTA buttons', () => {
      renderHomePage();
      expect(screen.getByText('Explore Agents')).toBeInTheDocument();
      expect(screen.getByText('View Examples')).toBeInTheDocument();
    });

    it('should have links to agents and examples pages', () => {
      renderHomePage();
      const exploreLink = screen.getByText('Explore Agents').closest('a');
      const examplesLink = screen.getByText('View Examples').closest('a');

      expect(exploreLink).toHaveAttribute('href', '/agents');
      expect(examplesLink).toHaveAttribute('href', '/examples');
    });
  });

  describe('quick stats section', () => {
    it('should display number of agents', () => {
      renderHomePage();
      expect(screen.getByText('12')).toBeInTheDocument();
      expect(screen.getByText('Specialized AI Agents')).toBeInTheDocument();
    });

    it('should display number of phases', () => {
      renderHomePage();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('Lifecycle Phases')).toBeInTheDocument();
    });

    it('should display QMS compliance', () => {
      renderHomePage();
      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('QMS Compliant')).toBeInTheDocument();
    });

    it('should render stat icons', () => {
      const { container } = renderHomePage();
      // Check for SVG icons (lucide-react icons render as SVG)
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  describe('how it works section', () => {
    it('should render section title', () => {
      renderHomePage();
      expect(screen.getByText('How It Works')).toBeInTheDocument();
    });

    it('should render all 4 phases', () => {
      renderHomePage();
      expect(screen.getByText('1. Discovery')).toBeInTheDocument();
      expect(screen.getByText('2. Design')).toBeInTheDocument();
      expect(screen.getByText('3. Implement')).toBeInTheDocument();
      expect(screen.getByText('4. Test & Ship')).toBeInTheDocument();
    });

    it('should have descriptions for each phase', () => {
      renderHomePage();
      expect(screen.getByText(/Product Owner, UX Researcher/i)).toBeInTheDocument();
      expect(screen.getByText(/Tech Lead architects/i)).toBeInTheDocument();
      expect(screen.getByText(/Developer writes code/i)).toBeInTheDocument();
      expect(screen.getByText(/QA Tester and Security Lead/i)).toBeInTheDocument();
    });
  });

  describe('featured workflow section', () => {
    it('should render section title', () => {
      renderHomePage();
      expect(screen.getByText('Featured Example')).toBeInTheDocument();
    });

    it('should render workflow card with details', () => {
      renderHomePage();
      expect(screen.getByText('E-commerce Checkout Enhancement')).toBeInTheDocument();
      expect(screen.getByText(/medium complexity/i)).toBeInTheDocument();
      expect(screen.getByText(/View Workflow/i)).toBeInTheDocument();
    });

    it('should have link to workflow detail page', () => {
      renderHomePage();
      const workflowLink = screen.getByText('E-commerce Checkout Enhancement').closest('a');
      expect(workflowLink).toHaveAttribute('href', '/examples/ecommerce-checkout');
    });

    it('should display step count', () => {
      renderHomePage();
      expect(screen.getByText(/\d+ steps/)).toBeInTheDocument();
    });
  });

  describe('layout and styling', () => {
    it('should use glassmorphic panels', () => {
      const { container } = renderHomePage();
      const glassPanels = container.querySelectorAll('.glass-panel, .glass-panel-hover');
      expect(glassPanels.length).toBeGreaterThan(0);
    });

    it('should have responsive spacing', () => {
      const { container } = renderHomePage();
      const mainDiv = container.querySelector('.space-y-20');
      expect(mainDiv).toBeInTheDocument();
    });
  });
});

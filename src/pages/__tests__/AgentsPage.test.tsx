import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AgentsPage } from '../AgentsPage';
import { agents } from '../../data';

function renderAgentsPage() {
  return render(
    <MemoryRouter>
      <AgentsPage />
    </MemoryRouter>
  );
}

describe('AgentsPage', () => {
  describe('page header', () => {
    it('should render page title', () => {
      renderAgentsPage();
      expect(screen.getByText('Agent Directory')).toBeInTheDocument();
    });

    it('should render page description', () => {
      renderAgentsPage();
      expect(
        screen.getByText(/Meet the 11 specialized AI agents/i)
      ).toBeInTheDocument();
    });
  });

  describe('agent cards', () => {
    it('should render all 12 agents', () => {
      renderAgentsPage();
      agents.forEach((agent) => {
        expect(screen.getByText(agent.name)).toBeInTheDocument();
      });
    });

    it('should display agent descriptions', () => {
      renderAgentsPage();
      agents.forEach((agent) => {
        // Check that description text is in the document (may be truncated)
        const description = screen.getByText(new RegExp(agent.description.substring(0, 30)));
        expect(description).toBeInTheDocument();
      });
    });

    it('should display category badges for all agents', () => {
      const { container } = renderAgentsPage();
      const badges = container.querySelectorAll('span[class*="text-xs"]');
      // Should have at least 12 category badges (one per agent)
      expect(badges.length).toBeGreaterThanOrEqual(12);
    });

    it('should have links to agent detail pages', () => {
      renderAgentsPage();
      agents.forEach((agent) => {
        const agentLink = screen.getByText(agent.name).closest('a');
        expect(agentLink).toHaveAttribute('href', `/agents/${agent.id}`);
      });
    });

    it('should render icons for all agents', () => {
      const { container } = renderAgentsPage();
      // Each agent card should have an icon (SVG)
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThanOrEqual(12);
    });

    it('should have "View Details" links', () => {
      renderAgentsPage();
      const viewDetailsLinks = screen.getAllByText(/View Details/);
      expect(viewDetailsLinks.length).toBe(12);
    });
  });

  describe('layout', () => {
    it('should use responsive grid layout', () => {
      const { container } = renderAgentsPage();
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
    });

    it('should have proper spacing', () => {
      const { container } = renderAgentsPage();
      const mainDiv = container.querySelector('.space-y-8');
      expect(mainDiv).toBeInTheDocument();
    });

    it('should use glassmorphic cards with hover effects', () => {
      const { container } = renderAgentsPage();
      const cards = container.querySelectorAll('.glass-panel-hover');
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe('category organization', () => {
    it('should show discovery agents', () => {
      renderAgentsPage();
      expect(screen.getByText('Product Owner')).toBeInTheDocument();
      expect(screen.getByText('UX Researcher')).toBeInTheDocument();
      expect(screen.getByText('Stakeholder')).toBeInTheDocument();
    });

    it('should show design agents', () => {
      renderAgentsPage();
      expect(screen.getByText('Tech Lead')).toBeInTheDocument();
      expect(screen.getByText('QA Lead')).toBeInTheDocument();
    });

    it('should show implementation agents', () => {
      renderAgentsPage();
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
      expect(screen.getByText('SDET (Automation Engineer)')).toBeInTheDocument();
    });

    it('should show QA agents', () => {
      renderAgentsPage();
      expect(screen.getByText('QA Tester')).toBeInTheDocument();
      expect(screen.getByText('Security Lead')).toBeInTheDocument();
    });

    it('should show compliance agents', () => {
      renderAgentsPage();
      expect(screen.getByText('QMS Lead')).toBeInTheDocument();
      expect(screen.getByText('Compliance Lead')).toBeInTheDocument();
    });

    it('should show orchestrator agent', () => {
      renderAgentsPage();
      expect(screen.getByText('Product Manager (Orchestrator)')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should have category-specific border colors', () => {
      const { container } = renderAgentsPage();
      const cards = container.querySelectorAll('[class*="border-l-4"]');
      expect(cards.length).toBe(12);
    });
  });
});

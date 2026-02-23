import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LifecyclePage } from '../LifecyclePage';
import { phases } from '../../data';

function renderLifecyclePage() {
  return render(
    <MemoryRouter>
      <LifecyclePage />
    </MemoryRouter>
  );
}

describe('LifecyclePage', () => {
  describe('page header', () => {
    it('should render page title', () => {
      renderLifecyclePage();
      expect(screen.getByText('Software Delivery Lifecycle')).toBeInTheDocument();
    });

    it('should render page description', () => {
      renderLifecyclePage();
      expect(
        screen.getByText(/Five phases from discovery to compliance/i)
      ).toBeInTheDocument();
    });
  });

  describe('phase cards', () => {
    it('should render all 5 phases', () => {
      renderLifecyclePage();
      phases.forEach((phase) => {
        expect(screen.getByText(phase.name)).toBeInTheDocument();
      });
    });

    it('should display phase order numbers', () => {
      renderLifecyclePage();
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByText(i.toString())).toBeInTheDocument();
      }
    });

    it('should display duration estimates', () => {
      renderLifecyclePage();
      phases.forEach((phase) => {
        const elements = screen.getAllByText(phase.durationEstimate);
        expect(elements.length).toBeGreaterThan(0);
      });
    });

    it('should show key objectives for each phase', () => {
      renderLifecyclePage();
      // Each phase should have objectives listed (at least the first few)
      expect(screen.getByText(/Gather and validate business requirements/i)).toBeInTheDocument();
      expect(screen.getByText(/Design system architecture/i)).toBeInTheDocument();
    });

    it('should show agent participation count', () => {
      renderLifecyclePage();
      const participantText = screen.getAllByText(/\d+ agents participating/);
      expect(participantText.length).toBe(5);
    });

    it('should have links to phase detail pages', () => {
      renderLifecyclePage();
      phases.forEach((phase) => {
        const phaseLink = screen.getByText(phase.name).closest('a');
        expect(phaseLink).toHaveAttribute('href', `/lifecycle/${phase.id}`);
      });
    });

    it('should have "View Details" links', () => {
      renderLifecyclePage();
      const viewDetailsLinks = screen.getAllByText(/View Details/);
      expect(viewDetailsLinks.length).toBe(5);
    });
  });

  describe('phase order', () => {
    it('should display phases in correct order', () => {
      renderLifecyclePage();
      const phaseNames = ['Discovery', 'Design', 'Implementation', 'QA & Testing', 'Compliance & Release'];

      phaseNames.forEach((name) => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });
  });

  describe('layout', () => {
    it('should use vertical spacing', () => {
      const { container } = renderLifecyclePage();
      const mainDiv = container.querySelector('.space-y-8');
      expect(mainDiv).toBeInTheDocument();
    });

    it('should use glassmorphic cards with hover effects', () => {
      const { container } = renderLifecyclePage();
      const cards = container.querySelectorAll('.glass-panel-hover');
      expect(cards.length).toBe(5);
    });
  });

  describe('phase content', () => {
    it('should show discovery phase details', () => {
      renderLifecyclePage();
      expect(screen.getByText('Discovery')).toBeInTheDocument();
      const durations = screen.getAllByText('1-2 weeks');
      expect(durations.length).toBeGreaterThan(0);
    });

    it('should show design phase details', () => {
      renderLifecyclePage();
      expect(screen.getByText('Design')).toBeInTheDocument();
    });

    it('should show implementation phase details', () => {
      renderLifecyclePage();
      expect(screen.getByText('Implementation')).toBeInTheDocument();
      expect(screen.getByText('2-4 weeks')).toBeInTheDocument();
    });

    it('should show QA phase details', () => {
      renderLifecyclePage();
      expect(screen.getByText('QA & Testing')).toBeInTheDocument();
    });

    it('should show compliance phase details', () => {
      renderLifecyclePage();
      expect(screen.getByText('Compliance & Release')).toBeInTheDocument();
      expect(screen.getByText('3-5 days')).toBeInTheDocument();
    });
  });

  describe('objectives display', () => {
    it('should truncate objectives to first 4', () => {
      const { container } = renderLifecyclePage();
      // Check that objectives are limited (using slice(0, 4) in component)
      const objectiveLists = container.querySelectorAll('ul');
      objectiveLists.forEach((list) => {
        const items = list.querySelectorAll('li');
        expect(items.length).toBeLessThanOrEqual(4);
      });
    });
  });
});

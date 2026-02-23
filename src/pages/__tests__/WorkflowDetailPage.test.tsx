import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { WorkflowDetailPage } from '../WorkflowDetailPage';

function renderWorkflowDetailPage(workflowId: string) {
  return render(
    <MemoryRouter initialEntries={[`/examples/${workflowId}`]}>
      <Routes>
        <Route path="/examples/:workflowId" element={<WorkflowDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('WorkflowDetailPage', () => {
  describe('valid workflow', () => {
    it('should render workflow name', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      expect(screen.getByText('E-commerce Checkout Enhancement')).toBeInTheDocument();
    });

    it('should render workflow industry', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      expect(screen.getByText('E-commerce / Retail')).toBeInTheDocument();
    });

    it('should render workflow description', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      expect(
        screen.getByText(/Add saved payment methods to checkout flow/i)
      ).toBeInTheDocument();
    });

    it('should render complexity badge', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      expect(screen.getByText('medium')).toBeInTheDocument();
    });

    it('should render back to examples link', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      const backLink = screen.getByText('Back to Examples');
      expect(backLink).toBeInTheDocument();
      expect(backLink.closest('a')).toHaveAttribute('href', '/examples');
    });
  });

  describe('workflow steps', () => {
    it('should render workflow steps heading', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      expect(screen.getByText('Workflow Steps')).toBeInTheDocument();
    });

    it('should render all workflow steps', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      // The ecommerce-checkout workflow has 6 steps
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
      expect(screen.getByText('Step 4')).toBeInTheDocument();
      expect(screen.getByText('Step 5')).toBeInTheDocument();
      expect(screen.getByText('Step 6')).toBeInTheDocument();
    });

    it('should display phase badges for each step', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      expect(screen.getByText('Discovery')).toBeInTheDocument();
      expect(screen.getByText('Design')).toBeInTheDocument();
      const implBadges = screen.getAllByText('Implementation');
      expect(implBadges.length).toBeGreaterThan(0);
    });

    it('should show active agents for each step', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      expect(screen.getAllByText(/Product Owner/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Tech Lead/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Senior Developer/).length).toBeGreaterThan(0);
    });

    it('should display agent reasoning', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      expect(screen.getAllByText('Agent Reasoning').length).toBeGreaterThan(0);
      expect(
        screen.getByText(/Product Owner translates business goal/i)
      ).toBeInTheDocument();
    });

    it('should display quality check results', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      expect(screen.getAllByText('Quality Check').length).toBeGreaterThan(0);
    });
  });

  describe('quality gates', () => {
    it('should show passed quality checks with green icon', () => {
      const { container } = renderWorkflowDetailPage('ecommerce-checkout');
      // CheckCircle2 icons for passed checks
      const passedIcons = container.querySelectorAll('.text-compliance');
      expect(passedIcons.length).toBeGreaterThan(0);
    });

    it('should show failed quality checks with red icon', () => {
      const { container } = renderWorkflowDetailPage('ecommerce-checkout');
      // XCircle icons for failed checks
      const failedIcons = container.querySelectorAll('.text-red-400');
      expect(failedIcons.length).toBeGreaterThan(0);
    });

    it('should display PASSED status for passed checks', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      const passedStatuses = screen.getAllByText(/PASSED:/);
      expect(passedStatuses.length).toBeGreaterThan(0);
    });

    it('should display FAILED status for failed checks', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      const failedStatuses = screen.getAllByText(/FAILED:/);
      expect(failedStatuses.length).toBeGreaterThan(0);
    });

    it('should show quality check feedback', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      expect(screen.getByText(/Ready to proceed to design phase/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Security scan found SQL injection vulnerability/i)
      ).toBeInTheDocument();
    });
  });

  describe('rework loop demonstration', () => {
    it('should show multiple steps in same phase (rework)', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      // Steps 3 and 4 are both in implementation phase (showing rework)
      const implementationBadges = screen.getAllByText('Implementation');
      expect(implementationBadges.length).toBeGreaterThanOrEqual(2);
    });

    it('should show failed quality check followed by fix', () => {
      renderWorkflowDetailPage('ecommerce-checkout');
      expect(
        screen.getByText(/Security scan found SQL injection/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Security issue resolved/i)).toBeInTheDocument();
    });
  });

  describe('invalid workflow', () => {
    it('should render 404 message for non-existent workflow', () => {
      renderWorkflowDetailPage('non-existent-workflow');
      expect(screen.getByText('Workflow Not Found')).toBeInTheDocument();
    });

    it('should provide link back to examples', () => {
      renderWorkflowDetailPage('invalid-workflow-id');
      const backButton = screen.getByText('Back to Examples');
      expect(backButton).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should use glassmorphic panels for steps', () => {
      const { container } = renderWorkflowDetailPage('ecommerce-checkout');
      const glassPanels = container.querySelectorAll('.glass-panel');
      expect(glassPanels.length).toBeGreaterThan(0);
    });
  });
});

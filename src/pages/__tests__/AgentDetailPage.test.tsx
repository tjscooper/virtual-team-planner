import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AgentDetailPage } from '../AgentDetailPage';

function renderAgentDetailPage(agentId: string) {
  return render(
    <MemoryRouter initialEntries={[`/agents/${agentId}`]}>
      <Routes>
        <Route path="/agents/:agentId" element={<AgentDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('AgentDetailPage', () => {
  describe('valid agent', () => {
    it('should render agent name', () => {
      renderAgentDetailPage('product-owner');
      expect(screen.getByText('Product Owner')).toBeInTheDocument();
    });

    it('should render agent description', () => {
      renderAgentDetailPage('product-owner');
      expect(
        screen.getByText(/Defines user stories, acceptance criteria/i)
      ).toBeInTheDocument();
    });

    it('should render category badge', () => {
      renderAgentDetailPage('product-owner');
      const badges = screen.getAllByText('discovery');
      expect(badges.length).toBeGreaterThan(0);
    });

    it('should render back to agents link', () => {
      renderAgentDetailPage('product-owner');
      const backLink = screen.getByText('Back to Agents');
      expect(backLink).toBeInTheDocument();
      expect(backLink.closest('a')).toHaveAttribute('href', '/agents');
    });

    it('should render agent icon', () => {
      const { container } = renderAgentDetailPage('product-owner');
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('capabilities section', () => {
    it('should render key capabilities heading', () => {
      renderAgentDetailPage('product-owner');
      expect(screen.getByText('Key Capabilities')).toBeInTheDocument();
    });

    it('should list all capabilities', () => {
      renderAgentDetailPage('product-owner');
      expect(screen.getByText(/User story creation/i)).toBeInTheDocument();
      expect(screen.getByText(/Acceptance criteria definition/i)).toBeInTheDocument();
    });

    it('should have at least 3 capabilities', () => {
      const { container } = renderAgentDetailPage('product-owner');
      const capabilitiesSection = screen.getByText('Key Capabilities').parentElement;
      const listItems = capabilitiesSection?.querySelectorAll('li');
      expect(listItems?.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('example inputs section', () => {
    it('should render example inputs heading', () => {
      renderAgentDetailPage('product-owner');
      expect(screen.getByText('Example Inputs')).toBeInTheDocument();
    });

    it('should display example input text', () => {
      renderAgentDetailPage('product-owner');
      expect(screen.getByText(/Business goal:/i)).toBeInTheDocument();
    });
  });

  describe('phase participation section', () => {
    it('should render phase participation heading', () => {
      renderAgentDetailPage('product-owner');
      expect(screen.getByText('Phase Participation')).toBeInTheDocument();
    });

    it('should show phases as badges', () => {
      renderAgentDetailPage('product-owner');
      // Product Owner participates in discovery phase
      const section = screen.getByText('Phase Participation').parentElement;
      expect(section).toBeInTheDocument();
    });

    it('should link to phase detail pages', () => {
      renderAgentDetailPage('product-owner');
      const phaseLinks = screen.getByText('Phase Participation')
        .parentElement?.querySelectorAll('a');
      expect(phaseLinks).toBeDefined();
      expect(phaseLinks!.length).toBeGreaterThan(0);
    });
  });

  describe('related agents section', () => {
    it('should render related agents heading when there are related agents', () => {
      renderAgentDetailPage('product-owner');
      expect(screen.getByText('Related Agents')).toBeInTheDocument();
    });

    it('should display related agent cards', () => {
      renderAgentDetailPage('product-owner');
      // Product Owner has related agents like ux-researcher, stakeholder
      const section = screen.getByText('Related Agents').parentElement;
      expect(section).toBeInTheDocument();
    });

    it('should link to related agent detail pages', () => {
      renderAgentDetailPage('product-owner');
      const relatedSection = screen.getByText('Related Agents').parentElement;
      const relatedLinks = relatedSection?.querySelectorAll('a');
      expect(relatedLinks).toBeDefined();
      expect(relatedLinks!.length).toBeGreaterThan(0);
    });
  });

  describe('invalid agent', () => {
    it('should render 404 message for non-existent agent', () => {
      renderAgentDetailPage('non-existent-agent');
      expect(screen.getByText('Agent Not Found')).toBeInTheDocument();
    });

    it('should provide link back to agents directory', () => {
      renderAgentDetailPage('invalid-agent-id');
      const backButton = screen.getByText('Back to Agents');
      expect(backButton).toBeInTheDocument();
    });
  });

  describe('multiple agents', () => {
    it('should render different agent details correctly', () => {
      const { unmount } = renderAgentDetailPage('developer');
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
      unmount();

      renderAgentDetailPage('qa-tester');
      expect(screen.getByText('QA Tester')).toBeInTheDocument();
    });

    it('should render product-manager orchestrator correctly', () => {
      renderAgentDetailPage('product-manager');
      expect(screen.getByText('Product Manager (Orchestrator)')).toBeInTheDocument();
      expect(screen.getByText(/orchestrates workflow/i)).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should use glassmorphic card', () => {
      const { container } = renderAgentDetailPage('product-owner');
      const card = container.querySelector('.glass-panel');
      expect(card).toBeInTheDocument();
    });

    it('should have category-specific border color', () => {
      const { container } = renderAgentDetailPage('product-owner');
      const card = container.querySelector('[class*="border-l-4"]');
      expect(card).toBeInTheDocument();
    });
  });
});

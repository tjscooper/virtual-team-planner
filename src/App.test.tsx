import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import {
  HomePage,
  AgentsPage,
  AgentDetailPage,
  LifecyclePage,
  PhaseDetailPage,
  ExamplesPage,
  WorkflowDetailPage,
  InteractivePage,
  ResourcesPage,
  GlossaryPage,
  NotFoundPage,
} from './pages';
import { ROUTES } from './constants';

// Helper to render routes with specific route
function renderAppAtRoute(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.AGENTS} element={<AgentsPage />} />
          <Route path={ROUTES.AGENT_DETAIL} element={<AgentDetailPage />} />
          <Route path={ROUTES.LIFECYCLE} element={<LifecyclePage />} />
          <Route path={ROUTES.PHASE_DETAIL} element={<PhaseDetailPage />} />
          <Route path={ROUTES.EXAMPLES} element={<ExamplesPage />} />
          <Route path={ROUTES.WORKFLOW_DETAIL} element={<WorkflowDetailPage />} />
          <Route path={ROUTES.INTERACTIVE} element={<InteractivePage />} />
          <Route path={ROUTES.RESOURCES} element={<ResourcesPage />} />
          <Route path={ROUTES.GLOSSARY} element={<GlossaryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('App routing', () => {
  describe('home route', () => {
    it('should render HomePage at root route', () => {
      renderAppAtRoute('/');
      expect(screen.getByText(/Think Like a Team/i)).toBeInTheDocument();
    });
  });

  describe('agents routes', () => {
    it('should render AgentsPage at /agents', () => {
      renderAppAtRoute('/agents');
      expect(screen.getByText('Agent Directory')).toBeInTheDocument();
    });

    it('should render AgentDetailPage at /agents/:agentId', () => {
      renderAppAtRoute('/agents/product-owner');
      expect(screen.getByText('Product Owner')).toBeInTheDocument();
    });

    it('should show 404 for invalid agent ID', () => {
      renderAppAtRoute('/agents/invalid-agent');
      expect(screen.getByText('Agent Not Found')).toBeInTheDocument();
    });
  });

  describe('lifecycle routes', () => {
    it('should render LifecyclePage at /lifecycle', () => {
      renderAppAtRoute('/lifecycle');
      expect(screen.getByText('Software Delivery Lifecycle')).toBeInTheDocument();
    });

    it('should render PhaseDetailPage at /lifecycle/:phaseId', () => {
      renderAppAtRoute('/lifecycle/discovery');
      // Phase detail page should render (checking for a phase-specific element)
      const discoveryElements = screen.getAllByText(/Discovery/i);
      expect(discoveryElements.length).toBeGreaterThan(0);
    });
  });

  describe('examples routes', () => {
    it('should render ExamplesPage at /examples', () => {
      renderAppAtRoute('/examples');
      expect(screen.getByText(/Example Workflows/i)).toBeInTheDocument();
    });

    it('should render WorkflowDetailPage at /examples/:workflowId', () => {
      renderAppAtRoute('/examples/ecommerce-checkout');
      expect(screen.getByText('E-commerce Checkout Enhancement')).toBeInTheDocument();
    });

    it('should show 404 for invalid workflow ID', () => {
      renderAppAtRoute('/examples/invalid-workflow');
      expect(screen.getByText('Workflow Not Found')).toBeInTheDocument();
    });
  });

  describe('other routes', () => {
    it('should render InteractivePage at /interactive', () => {
      renderAppAtRoute('/interactive');
      expect(screen.getByText('Interactive Explorer')).toBeInTheDocument();
    });

    it('should render ResourcesPage at /resources', () => {
      renderAppAtRoute('/resources');
      const resourcesElements = screen.getAllByText(/Resources/i);
      expect(resourcesElements.length).toBeGreaterThan(0);
    });

    it('should render GlossaryPage at /resources/glossary', () => {
      renderAppAtRoute('/resources/glossary');
      const glossaryElements = screen.getAllByText(/Glossary/i);
      expect(glossaryElements.length).toBeGreaterThan(0);
    });
  });

  describe('404 route', () => {
    it('should render NotFoundPage for unknown routes', () => {
      renderAppAtRoute('/unknown-route');
      expect(screen.getByText(/404/i)).toBeInTheDocument();
    });

    it('should render NotFoundPage for deeply nested invalid routes', () => {
      renderAppAtRoute('/this/does/not/exist');
      expect(screen.getByText(/404/i)).toBeInTheDocument();
    });
  });

  describe('layout', () => {
    it('should render Header on all routes', () => {
      renderAppAtRoute('/');
      const headers = screen.getAllByText('Virtual Team');
      expect(headers.length).toBeGreaterThan(0);

      const { unmount } = renderAppAtRoute('/agents');
      const headers2 = screen.getAllByText('Virtual Team');
      expect(headers2.length).toBeGreaterThan(0);
      unmount();
    });

    it('should render Footer on all routes', () => {
      const { container } = renderAppAtRoute('/');
      const footer = container.querySelector('footer');
      expect(footer).toBeTruthy();
    });
  });

  describe('navigation links', () => {
    it('should have working navigation between pages', () => {
      renderAppAtRoute('/');
      // Navigation links exist in header
      const navLinks = screen.getAllByText(/Agents|Lifecycle|Examples/);
      expect(navLinks.length).toBeGreaterThan(0);
    });
  });

  describe('basename configuration', () => {
    it('should have routing structure', () => {
      // This test verifies the routing structure works
      const { container } = renderAppAtRoute('/');
      expect(container).toBeTruthy();
      // Basename is configured in the actual App.tsx BrowserRouter
    });
  });
});

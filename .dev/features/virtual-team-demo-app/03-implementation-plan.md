# Implementation Plan: Virtual Team Demo App

**Date**: 2026-02-23
**Spec Reference**: 01-spec.md

## Architecture Overview

### Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite with GitHub Pages base path configuration
- **Styling**: TailwindCSS with custom dark mode theme
- **Animation**: Framer Motion (declarative, respects prefers-reduced-motion)
- **Diagrams**: React Flow (agent orchestration, workflow visualization)
- **State Management**: Zustand (lightweight, minimal boilerplate)
- **Routing**: React Router v6 with BrowserRouter
- **Syntax Highlighting**: Prism.js or Shiki
- **Icons**: Lucide React or Heroicons

### Project Structure
```
src/
├── types/           # 6 files: agent, phase, artifact, workflow, common, index
├── data/            # 7 files: agents, phases, workflows, artifacts, glossary, faq, index
├── store/           # 5 files: filterStore, workflowStore, interactiveStore, uiStore, index
├── hooks/           # 6 files: useBreakpoint, useReducedMotion, useLocalStorage, useKeyboardNav, useScrollToTop, usePageTracking
├── utils/           # 6 files: cn, formatDate, categoryColors, urlHelpers, dataValidation, analytics
├── constants/       # 4 files: routes, breakpoints, categories, colors
├── components/
│   ├── layout/      # 5 files: Layout, Header, Footer, MobileMenu, Breadcrumbs
│   ├── shared/      # 10 files: Button, Card, Badge, LoadingSkeleton, Tooltip, Modal, SearchInput, FilterButton, ProgressBar, GlassMorphPanel
│   ├── agents/      # 7 files: AgentCard, AgentGrid, AgentDetail, AgentAvatar, AgentCapabilityList, RelatedAgents, AgentFilterBar
│   ├── phases/      # 6 files: PhaseTimeline, PhaseNode, QualityGate, PhaseDetail, PhaseObjectives, PhaseNavigation
│   ├── workflows/   # 8 files: WorkflowCard, WorkflowGrid, WorkflowStepView, WorkflowNavigation, WorkflowProgress, AgentCollaboration, QualityCheckPanel, WorkflowFilterBar
│   ├── artifacts/   # 5 files: ArtifactViewer, ArtifactMetadata, ArtifactToolbar, SyntaxHighlighter, ArtifactCarousel
│   ├── interactive/ # 5 files: CapabilityExplorer, OutputSimulator, ComparisonView, ComparisonPanel, SimulationControls
│   ├── visualizations/ # 4 files: AgentFlowDiagram, FlowNode, FlowEdge, FlowControls
│   ├── home/        # 5 files: Hero, QuickStats, HowItWorks, FeaturedWorkflow, ProceduralBackground
│   └── resources/   # 5 files: GlossaryList, GlossaryTerm, FAQList, FAQItem, ArchitectureDiagram
├── pages/           # 11 files: HomePage, AgentsPage, AgentDetailPage, LifecyclePage, PhaseDetailPage, ExamplesPage, WorkflowWalkthroughPage, InteractivePage, ResourcesPage, GlossaryPage, NotFoundPage
├── main.tsx
├── App.tsx
└── index.css
```

### Design System

**Color Palette**:
```css
--bg-void: #0a0a0f;
--bg-primary: #1a1a24;
--areas: #00f5ff (cyan);
--projects: #ff00ff (magenta);
--resources: #a855f7 (purple);
--success: #10b981;
--warning: #fbbf24;
--error: #ef4444;
```

**Typography**:
- Headings: Pixel font (Press Start 2P)
- Body: Sans-serif (Inter or system font)
- Code: Terminal/monospace (Fira Code)

**Effects**:
- Glassmorphism: `backdrop-filter: blur(12px)`, semi-transparent backgrounds
- Neon glow: `box-shadow: 0 0 20px rgba(0, 245, 255, 0.5)`
- Chunky drop shadows on interactive elements

### Data Model

All content stored as TypeScript constants (single source of truth):

```typescript
// Core types
interface Agent {
  id: string;
  name: string;
  category: 'discovery' | 'design' | 'implementation' | 'qa' | 'compliance';
  description: string;
  capabilities: string[];
  exampleInputs: string[];
  exampleOutputs: Artifact[];
  phaseParticipation: Phase[];
  relatedAgents: string[];
}

interface Phase {
  id: string;
  name: string;
  order: number;
  durationEstimate: string;
  objectives: string[];
  participatingAgents: string[];
  deliverables: string[];
  qualityGateCriteria: string[];
  exampleArtifacts: Artifact[];
}

interface Workflow {
  id: string;
  name: string;
  industry: string;
  complexity: 'simple' | 'medium' | 'complex';
  description: string;
  steps: WorkflowStep[];
}

interface WorkflowStep {
  id: string;
  phase: string;
  activeAgents: string[];
  inputArtifacts: Artifact[];
  agentReasoning: string;
  outputArtifacts: Artifact[];
  qualityCheck: {
    passed: boolean;
    criteria: string[];
    feedback: string;
  };
}
```

## Technology Decisions

### State Management: Zustand
**Rationale**: Lightweight, minimal boilerplate, no provider wrapper needed. Four stores:
1. **filterStore**: Agent/workflow filtering state
2. **workflowStore**: Current workflow step navigation
3. **interactiveStore**: Explorer/comparison state
4. **uiStore**: Mobile menu, modals, loading states

### Routing: React Router v6 with BrowserRouter
**Rationale**: Client-side routing with deep linking support. Base path configured for GitHub Pages.

**Routes**:
- `/` - Home
- `/agents` - Agent Directory
- `/agents/:agentId` - Agent Detail
- `/lifecycle` - Phase Timeline
- `/lifecycle/:phaseId` - Phase Detail
- `/examples` - Workflow Gallery
- `/examples/:workflowId` - Workflow Walkthrough
- `/examples/:workflowId/step/:stepNumber` - Workflow Step
- `/interactive` - Interactive Explorer
- `/resources` - Resources Hub
- `/resources/glossary` - Glossary
- `*` - 404 Not Found

### Animation: Framer Motion
**Rationale**: Declarative animations, built-in gesture support, respects prefers-reduced-motion.

**Animation Patterns**:
- Page transitions: fade + slight slide
- Agent cards: scale + glow on hover
- Phase timeline: sequential reveal animation
- Quality gates: pulse animation on pass/fail

### Diagrams: React Flow
**Rationale**: Flexible, performant, supports custom nodes/edges.

**Use Cases**:
- Agent collaboration flow diagrams
- Phase progression visualization
- Workflow step dependencies (Could Have)

## Test Strategy

### Testing Framework
- **Unit/Component**: Vitest + React Testing Library
- **E2E**: Playwright (Chromium, Firefox, WebKit)
- **Accessibility**: axe-core + manual testing
- **Performance**: Lighthouse CI
- **Visual Regression**: Percy.io (optional)

### Test Organization
```
src/
├── components/
│   ├── shared/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx  # Colocated tests
├── test/
│   ├── fixtures/            # Mock data for tests
│   ├── utils/               # Test helpers
│   └── setup.ts             # Vitest config
tests/
├── e2e/
│   ├── agents.spec.ts
│   ├── lifecycle.spec.ts
│   ├── workflows.spec.ts
│   ├── interactive.spec.ts
│   └── accessibility.spec.ts
└── visual/
    └── snapshots/
```

### Coverage Targets
- **Unit/Component**: ≥80% coverage
- **E2E**: Critical user paths (agent view, workflow walkthrough, interactive explorer)
- **Accessibility**: 100% of interactive components tested with axe-core

### Quality Gates (per phase)
All gates must pass before advancing to next phase:

1. **TypeScript**: 0 errors, strict mode enabled
2. **ESLint**: 0 errors, 0 warnings
3. **Tests**: 100% pass rate, ≥80% coverage
4. **Accessibility**: Lighthouse ≥90, 0 critical axe violations
5. **Performance**: Lighthouse ≥90, LCP <3s, FID <100ms, CLS <0.1
6. **Bundle Size**: <512KB gzipped

## Implementation Phases

### Phase 1: Project Foundation
**Duration**: 1 day
**Dependencies**: None

**Deliverables**:
- Vite project initialized with TypeScript, React, TailwindCSS
- GitHub repository with main branch
- `package.json` with all dependencies
- `tsconfig.json` with strict mode
- `tailwind.config.js` with dark mode theme
- `vite.config.ts` with GitHub Pages base path
- ESLint + Prettier configuration
- `.gitignore` with standard exclusions
- Entry points: `index.html`, `main.tsx`, `App.tsx`, `index.css`

**Quality Gate**:
- Project builds without errors
- Dev server runs successfully
- TypeScript strict mode enabled

---

### Phase 2: Type System & Data Layer
**Duration**: 2 days
**Dependencies**: Phase 1

**Deliverables**:
- Type definitions for all entities (6 files in `src/types/`)
- Static data files with content for:
  - All 11 agents with full metadata
  - All 5 phases with objectives and criteria
  - 3-5 example workflows with step-by-step details
  - 20+ artifact examples (code, markdown, tests)
  - Glossary terms (15-20 entries)
  - FAQ items (10-15 questions)
- Data validation utilities
- Index files for clean imports

**Quality Gate**:
- All types compile without errors
- Data conforms to type definitions (validated by tests)
- No `any` types except where necessary
- Data completeness tests pass (all references valid)

---

### Phase 3: Utilities & Hooks
**Duration**: 1 day
**Dependencies**: Phase 2

**Deliverables**:
- **Utils** (6 files):
  - `cn`: Tailwind class merging
  - `formatDate`: Date formatting helpers
  - `categoryColors`: Category-to-color mapping
  - `urlHelpers`: URL construction for routing
  - `dataValidation`: Runtime data validation
  - `analytics`: Event tracking helpers
- **Hooks** (6 files):
  - `useBreakpoint`: Responsive breakpoint detection
  - `useReducedMotion`: prefers-reduced-motion detection
  - `useLocalStorage`: Persistent state storage
  - `useKeyboardNav`: Keyboard navigation helpers
  - `useScrollToTop`: Scroll restoration on route change
  - `usePageTracking`: Analytics page view tracking
- **Constants** (4 files):
  - `routes`: Route path constants
  - `breakpoints`: Responsive breakpoints
  - `categories`: Agent categories
  - `colors`: Theme color constants

**Quality Gate**:
- All utility functions have unit tests (≥80% coverage)
- All hooks tested with React Testing Library
- TypeScript types for all functions

---

### Phase 4: State Management
**Duration**: 1 day
**Dependencies**: Phase 3

**Deliverables**:
- Zustand stores (5 files):
  1. `filterStore`: Agent/workflow filtering
  2. `workflowStore`: Current workflow navigation
  3. `interactiveStore`: Explorer/comparison state
  4. `uiStore`: Mobile menu, modals, loading
  5. `index`: Barrel export
- State persistence (localStorage integration)
- Selectors for derived state

**Quality Gate**:
- All store actions tested
- State updates correctly trigger re-renders
- TypeScript types for all stores
- No global state pollution

---

### Phase 5: Shared Components
**Duration**: 2 days
**Dependencies**: Phase 4

**Deliverables**:
- 10 shared components:
  1. `Button`: Primary/secondary/ghost variants
  2. `Card`: Glassmorphic card with hover effects
  3. `Badge`: Category badges with neon colors
  4. `LoadingSkeleton`: Content placeholder
  5. `Tooltip`: Contextual tooltips
  6. `Modal`: Accessible modal dialog
  7. `SearchInput`: Debounced search input
  8. `FilterButton`: Toggle filter button
  9. `ProgressBar`: Linear progress indicator
  10. `GlassMorphPanel`: Reusable glass panel
- Component tests (≥80% coverage)
- Storybook stories (optional)

**Quality Gate**:
- All components render without errors
- Accessibility tests pass (axe-core)
- Keyboard navigation works
- Responsive at all breakpoints
- Dark mode styles applied

---

### Phase 6: Layout Components
**Duration**: 1 day
**Dependencies**: Phase 5

**Deliverables**:
- 5 layout components:
  1. `Layout`: Main app layout wrapper
  2. `Header`: Sticky navigation bar
  3. `Footer`: Site footer with links
  4. `MobileMenu`: Slide-out hamburger menu
  5. `Breadcrumbs`: Breadcrumb navigation
- Routing integration (active nav item highlighting)
- Mobile menu state management

**Quality Gate**:
- Navigation works across all routes
- Mobile menu opens/closes correctly
- Skip to main content link present
- Sticky header behavior correct
- Footer always at bottom

---

### Phase 7: Agent Components
**Duration**: 2 days
**Dependencies**: Phase 6

**Deliverables**:
- 7 agent components:
  1. `AgentCard`: Grid card with hover effects
  2. `AgentGrid`: Responsive grid layout
  3. `AgentDetail`: Full agent detail view
  4. `AgentAvatar`: Agent icon/avatar
  5. `AgentCapabilityList`: Capability list
  6. `RelatedAgents`: Related agents section
  7. `AgentFilterBar`: Filter/search bar
- Integration with filterStore
- Component tests

**Quality Gate**:
- All 11 agents render correctly
- Filtering and search work
- Cards link to detail pages
- Related agents show correct links
- Responsive at all breakpoints

---

### Phase 8: Phase Components
**Duration**: 2 days
**Dependencies**: Phase 6

**Deliverables**:
- 6 phase components:
  1. `PhaseTimeline`: Horizontal/vertical timeline
  2. `PhaseNode`: Individual phase node
  3. `QualityGate`: Gate visualization
  4. `PhaseDetail`: Full phase detail view
  5. `PhaseObjectives`: Objectives list
  6. `PhaseNavigation`: Previous/next navigation
- Animated timeline progression (Framer Motion)
- Component tests

**Quality Gate**:
- All 5 phases render correctly
- Timeline animates on load (respects prefers-reduced-motion)
- Quality gates display correctly
- Phase detail pages complete
- Responsive timeline (horizontal → vertical)

---

### Phase 9: Artifact Components
**Duration**: 2 days
**Dependencies**: Phase 5

**Deliverables**:
- 5 artifact components:
  1. `ArtifactViewer`: Main viewer with syntax highlighting
  2. `ArtifactMetadata`: Metadata sidebar
  3. `ArtifactToolbar`: Copy/download toolbar
  4. `SyntaxHighlighter`: Code highlighting wrapper
  5. `ArtifactCarousel`: Related artifacts carousel
- Syntax highlighting configuration (Prism.js/Shiki)
- Copy-to-clipboard functionality
- Component tests

**Quality Gate**:
- Syntax highlighting works for all languages
- Metadata displays correctly
- Copy button works
- Carousel navigation works
- Accessible (keyboard, screen reader)

---

### Phase 10: Workflow Components
**Duration**: 3 days
**Dependencies**: Phase 7, 8, 9

**Deliverables**:
- 8 workflow components:
  1. `WorkflowCard`: Workflow preview card
  2. `WorkflowGrid`: Workflow gallery grid
  3. `WorkflowStepView`: Individual step view
  4. `WorkflowNavigation`: Step navigation (prev/next/jump)
  5. `WorkflowProgress`: Progress indicator
  6. `AgentCollaboration`: Agent interaction view
  7. `QualityCheckPanel`: Quality gate decision panel
  8. `WorkflowFilterBar`: Workflow filtering
- Integration with workflowStore
- Component tests

**Quality Gate**:
- All workflows render correctly
- Step-by-step navigation works
- Quality gate decisions display correctly
- Agent collaboration visualized
- Progress indicator accurate
- Filtering works

---

### Phase 11: Interactive Components
**Duration**: 2 days
**Dependencies**: Phase 7, 9

**Deliverables**:
- 5 interactive components:
  1. `CapabilityExplorer`: Agent/scenario selector
  2. `OutputSimulator`: Simulated agent output
  3. `ComparisonView`: Side-by-side comparison
  4. `ComparisonPanel`: Individual comparison panel
  5. `SimulationControls`: Run/reset controls
- Integration with interactiveStore
- Simulated output generation (1-2s delay)
- Component tests

**Quality Gate**:
- Agent selection works
- Simulation runs with loading state
- Output displays correctly
- Comparison works (2-3 agents)
- Mobile: stacked comparison

---

### Phase 12: Visualization Components
**Duration**: 2 days
**Dependencies**: Phase 7, 8

**Deliverables**:
- 4 visualization components (React Flow):
  1. `AgentFlowDiagram`: Main flow diagram
  2. `FlowNode`: Custom agent node
  3. `FlowEdge`: Custom edge with labels
  4. `FlowControls`: Zoom/pan controls
- Agent collaboration graph data
- Phase-to-phase flow visualization
- Component tests

**Quality Gate**:
- Flow diagram renders without errors
- Nodes clickable (navigate to agent detail)
- Edges show artifact types
- Controls work (zoom, pan, reset)
- Mobile: touch gestures work

---

### Phase 13: Home Page Components
**Duration**: 2 days
**Dependencies**: Phase 5

**Deliverables**:
- 5 home components:
  1. `Hero`: Hero section with CTA
  2. `QuickStats`: Stats cards (11 agents, 5 phases)
  3. `HowItWorks`: Explainer section
  4. `FeaturedWorkflow`: Featured workflow preview
  5. `ProceduralBackground`: Static background visual
- Animated hero (Framer Motion)
- Component tests

**Quality Gate**:
- Hero animates on load (respects prefers-reduced-motion)
- CTAs link correctly
- Stats accurate
- Background static (no heavy animation)
- Responsive at all breakpoints

---

### Phase 14: Resources Components
**Duration**: 1 day
**Dependencies**: Phase 5

**Deliverables**:
- 5 resource components:
  1. `GlossaryList`: Glossary term list
  2. `GlossaryTerm`: Individual term card
  3. `FAQList`: FAQ accordion list
  4. `FAQItem`: Individual FAQ item
  5. `ArchitectureDiagram`: System architecture diagram
- Search within glossary
- Accordion interactions
- Component tests

**Quality Gate**:
- Glossary renders all terms
- Search works
- FAQ accordion opens/closes
- Architecture diagram clear
- Deep links to terms work

---

### Phase 15: Page Components
**Duration**: 2 days
**Dependencies**: Phase 7, 8, 10, 11, 13, 14

**Deliverables**:
- 11 page components:
  1. `HomePage`: Wire up home components
  2. `AgentsPage`: Agent directory page
  3. `AgentDetailPage`: Agent detail page
  4. `LifecyclePage`: Phase timeline page
  5. `PhaseDetailPage`: Phase detail page
  6. `ExamplesPage`: Workflow gallery page
  7. `WorkflowWalkthroughPage`: Workflow walkthrough page
  8. `InteractivePage`: Interactive explorer page
  9. `ResourcesPage`: Resources hub page
  10. `GlossaryPage`: Glossary page
  11. `NotFoundPage`: 404 page
- SEO meta tags (react-helmet or similar)
- Social sharing meta tags
- Component tests

**Quality Gate**:
- All pages render correctly
- Data flows correctly to components
- SEO meta tags present
- 404 page styled correctly
- Breadcrumbs accurate on all pages

---

### Phase 16: Routing Integration
**Duration**: 1 day
**Dependencies**: Phase 15

**Deliverables**:
- React Router configuration
- Route definitions with params
- 404 redirect handling
- Scroll restoration
- Analytics integration (page tracking)
- Deep link support (query params for filters)

**Quality Gate**:
- All routes work
- Deep links work (shareable URLs)
- 404 redirects correctly
- Scroll restores on navigation
- Analytics fires on page view
- Browser back/forward works

---

### Phase 17: Public Assets
**Duration**: 0.5 days
**Dependencies**: None

**Deliverables**:
- `public/favicon.ico`
- `public/404.html` (GitHub Pages SPA redirect)
- `public/robots.txt`
- `public/manifest.json` (PWA manifest, optional)
- Social sharing images (og:image)

**Quality Gate**:
- Favicon displays correctly
- 404.html redirects to index.html (SPA routing)
- Robots.txt allows indexing
- Social meta tags render correct images

---

### Phase 18: Deployment Configuration
**Duration**: 1 day
**Dependencies**: Phase 17

**Deliverables**:
- `.github/workflows/deploy.yml` (GitHub Actions)
- `vite.config.ts` with correct base path
- `README.md` with live demo link
- `CONTRIBUTING.md` (optional)
- Deployment documentation

**GitHub Actions Workflow**:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Quality Gate**:
- GitHub Actions workflow runs successfully
- Build completes without errors
- Tests pass in CI
- Deployment to gh-pages branch succeeds
- Live site accessible at GitHub Pages URL

---

### Phase 19: Testing & Refinement
**Duration**: 3 days
**Dependencies**: Phase 18

**Deliverables**:
- **E2E Tests** (Playwright):
  - Agent directory and detail navigation
  - Phase timeline interaction
  - Workflow step-through
  - Interactive explorer simulation
  - Accessibility audit (axe-core)
- **Performance Audit**:
  - Lighthouse CI integration
  - Core Web Vitals monitoring
  - Bundle size analysis
- **Accessibility Audit**:
  - Manual keyboard navigation testing
  - Screen reader testing (NVDA, VoiceOver)
  - High contrast mode testing
- **Cross-browser Testing**:
  - Chrome, Firefox, Safari, Edge
  - Mobile Safari, Chrome Android
- **Bug Fixes**:
  - Fix failing tests
  - Resolve accessibility issues
  - Optimize performance bottlenecks

**Quality Gate**:
- All E2E tests pass (100%)
- Unit test coverage ≥80%
- Lighthouse scores: Accessibility ≥90, Performance ≥90
- No critical axe-core violations
- LCP <3s, FID <100ms, CLS <0.1
- Bundle size <512KB gzipped
- 0 TypeScript errors
- 0 ESLint errors

---

### Phase 20: Deploy & Monitor
**Duration**: 1 day
**Dependencies**: Phase 19

**Deliverables**:
- Production deployment to GitHub Pages
- Analytics setup (Google Analytics or Plausible)
- Error tracking setup (Sentry, optional)
- Performance monitoring (Web Vitals)
- Documentation updates
- Launch announcement (README, social media)

**Quality Gate**:
- Live site accessible
- Analytics tracking page views
- Error tracking operational
- Performance monitoring active
- README includes prominent live demo link

---

## Deployment Plan

### GitHub Pages Configuration

1. **Vite Configuration**:
   ```typescript
   // vite.config.ts
   export default defineConfig({
     base: '/virtual-team-planner/',
     // ... other config
   });
   ```

2. **Repository Settings**:
   - Enable GitHub Pages
   - Source: gh-pages branch
   - Custom domain (optional)

3. **SPA Routing Support**:
   - Create `public/404.html` that redirects to `index.html`
   - Store redirect path in sessionStorage for client-side handling

4. **Deployment Process**:
   - Push to main branch triggers GitHub Actions
   - Actions workflow: install → build → test → deploy
   - Deployment fails if tests fail or build errors

### CI/CD Pipeline

**GitHub Actions Workflow Steps**:
1. Checkout code
2. Setup pnpm
3. Setup Node.js 18
4. Install dependencies
5. Run TypeScript type check
6. Run ESLint
7. Run unit tests
8. Run build
9. Run Lighthouse CI
10. Deploy to gh-pages branch

**Branch Protection**:
- Require PR reviews (optional)
- Require status checks to pass
- Block merge if Lighthouse scores below thresholds

### Monitoring & Alerts

- **GitHub Actions Notifications**: Email on workflow failure
- **Uptime Monitoring**: UptimeRobot or similar (optional)
- **Analytics Dashboard**: Weekly review of metrics
- **Error Tracking**: Sentry alerts for client-side errors (optional)

---

## Risk Mitigations

### Risk 1: Performance Degradation
**Mitigation**:
- Lighthouse CI in GitHub Actions (block if score <90)
- Lazy load heavy components (React Flow, Framer Motion)
- Code-split routes with React.lazy()
- Static background (no animated WebGL)
- Respect prefers-reduced-motion
- Bundle size monitoring (<512KB gzipped)
- Image optimization (WebP, responsive sizes)

### Risk 2: Content Maintenance Burden
**Mitigation**:
- Single source of truth: all data in `src/data/`
- TypeScript enforces data model consistency
- Data validation tests (no broken references)
- Documentation for content updates
- Consider CMS integration post-MVP

### Risk 3: Accessibility Compliance Gap
**Mitigation**:
- Automated axe-core tests in CI
- Manual keyboard navigation testing each phase
- Screen reader testing before launch
- High contrast mode support
- Respect prefers-reduced-motion
- External accessibility audit (pre-launch)
- ARIA live regions for dynamic content

### Risk 4: Limited Mobile Experience
**Mitigation**:
- Mobile-first responsive design
- Touch-optimized interactions (44x44px targets)
- Simplified mobile layouts (vertical timeline)
- Touch gestures for diagrams (pan, zoom)
- User testing on real devices
- Progressive disclosure on mobile

### Risk 5: GitHub Pages Deployment Complexity
**Mitigation**:
- Test deployment in separate branch first
- BrowserRouter with correct base path
- 404.html redirect for SPA routing
- Monitor GitHub Actions with notifications
- Deployment documentation in README
- Fallback to Vercel/Netlify if issues persist

### Risk 6: User Confusion About "Virtual Team"
**Mitigation**:
- Clear messaging: "AI-powered virtual team"
- FAQ: "Are these real people?" question
- Visual cues: robot icons, "AI Agent" badges
- Prominent explanation on home page
- "How It Works" section clarifies AI nature

---

## Testing Strategy Integration

### Unit Testing (Vitest + React Testing Library)

**Component Tests** (colocated):
- Render without errors
- Props passed correctly
- User interactions (click, hover, keyboard)
- Conditional rendering
- Accessibility (ARIA, semantic HTML)

**Example**:
```typescript
// src/components/shared/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**Coverage Target**: ≥80% for all components, utilities, hooks

---

### E2E Testing (Playwright)

**Critical User Paths**:
1. **Agent Exploration**:
   - View agent directory
   - Filter by category
   - Search by capability
   - Navigate to agent detail
   - View related agents

2. **Lifecycle Navigation**:
   - View phase timeline
   - Click phase to view detail
   - Navigate between phases
   - View quality gate criteria

3. **Workflow Walkthrough**:
   - Select workflow from gallery
   - Navigate step-by-step
   - View agent collaboration
   - View quality gate decisions
   - Jump to specific step

4. **Interactive Explorer**:
   - Select agent and scenario
   - Run simulation
   - View output
   - Compare multiple agents

**Example**:
```typescript
// tests/e2e/agents.spec.ts
import { test, expect } from '@playwright/test';

test('should filter agents by category', async ({ page }) => {
  await page.goto('/agents');
  await page.click('text=Discovery');
  await expect(page.locator('[data-testid="agent-card"]')).toHaveCount(3);
});
```

---

### Accessibility Testing (axe-core + manual)

**Automated Tests**:
- Run axe-core on all pages
- Check for critical/serious violations
- Verify ARIA labels
- Check color contrast ratios

**Manual Tests**:
- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Screen reader testing (NVDA, JAWS, VoiceOver)
- High contrast mode
- Zoom to 200% (no loss of functionality)

**Example**:
```typescript
// tests/e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility violations', async ({ page }) => {
  await page.goto('/');
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

---

### Performance Testing (Lighthouse CI)

**Metrics**:
- **Lighthouse Scores**: Accessibility ≥90, Performance ≥90
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): <3s
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1
- **Bundle Size**: <512KB gzipped

**Lighthouse CI Configuration**:
```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["http://localhost:4173/"]
    },
    "assert": {
      "assertions": {
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:performance": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

---

## Success Criteria

### Phase Completion
Each phase is complete when:
1. All deliverables created
2. All quality gates pass
3. Tests written and passing (≥80% coverage)
4. TypeScript compiles without errors
5. ESLint passes with 0 errors
6. Accessibility tests pass (axe-core)
7. Responsive at all breakpoints
8. Performance benchmarks met

### Project Completion
Project is complete when:
1. All 20 phases complete
2. Deployed to GitHub Pages
3. All E2E tests pass
4. Lighthouse scores: Accessibility ≥90, Performance ≥90
5. Bundle size <512KB gzipped
6. No critical bugs
7. Analytics operational
8. README includes live demo link

---

**END OF IMPLEMENTATION PLAN**

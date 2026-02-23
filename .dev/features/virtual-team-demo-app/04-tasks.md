# Task Breakdown: Virtual Team Demo App

**Date**: 2026-02-23
**Plan Reference**: 03-implementation-plan.md

## Phase 1: Project Foundation

- [x] Initialize Vite project with React + TypeScript template
  - Files: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`
  - Dependencies: None

- [x] Install core dependencies
  - Run: `pnpm add react react-dom react-router-dom zustand framer-motion @xyflow/react lucide-react`
  - Run: `pnpm add -D typescript @types/react @types/react-dom @vitejs/plugin-react`
  - Dependencies: Phase 1.1

- [x] Install TailwindCSS and configure
  - Run: `pnpm add -D tailwindcss postcss autoprefixer`
  - Files: `tailwind.config.js`, `postcss.config.js`
  - Dependencies: Phase 1.1

- [x] Configure Vite for GitHub Pages
  - Files: `vite.config.ts` (set `base: '/virtual-team-planner/'`)
  - Dependencies: Phase 1.1

- [x] Setup TypeScript with strict mode
  - Files: `tsconfig.json` (enable strict, noUncheckedIndexedAccess, etc.)
  - Dependencies: Phase 1.1

- [x] Install and configure ESLint + Prettier
  - Run: `pnpm add -D eslint prettier eslint-config-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser`
  - Files: `.eslintrc.json`, `.prettierrc.json`, `.eslintignore`, `.prettierignore`
  - Dependencies: Phase 1.1

- [x] Create entry point files
  - Files: `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`
  - Dependencies: Phase 1.3

- [x] Setup TailwindCSS custom theme (dark mode)
  - Files: `tailwind.config.js` (colors, fonts), `src/index.css` (custom CSS variables)
  - Dependencies: Phase 1.4

- [x] Create `.gitignore` file
  - Files: `.gitignore` (node_modules, dist, .env, etc.)
  - Dependencies: Phase 1.1

- [x] Initialize Git repository
  - Run: `git init && git add . && git commit -m "Initial commit"`
  - Dependencies: Phase 1.8

- [x] Verify project builds and runs
  - Run: `pnpm dev` (dev server), `pnpm build` (production build)
  - Dependencies: Phase 1.7

---

## Phase 2: Type System & Data Layer

- [x] Create type definitions for Agent
  - Files: `src/types/agent.ts`
  - Dependencies: Phase 1

- [x] Create type definitions for Phase
  - Files: `src/types/phase.ts`
  - Dependencies: Phase 1

- [x] Create type definitions for Artifact
  - Files: `src/types/artifact.ts`
  - Dependencies: Phase 1

- [x] Create type definitions for Workflow
  - Files: `src/types/workflow.ts`
  - Dependencies: Phase 1

- [x] Create common type definitions
  - Files: `src/types/common.ts` (Category, Complexity, etc.)
  - Dependencies: Phase 1

- [x] Create types index file
  - Files: `src/types/index.ts` (barrel exports)
  - Dependencies: Phase 2.1-2.5

- [x] Create static data for 11 agents
  - Files: `src/data/agents.ts` (all agent metadata, capabilities, etc.)
  - Dependencies: Phase 2.6

- [x] Create static data for 5 phases
  - Files: `src/data/phases.ts` (objectives, criteria, participating agents)
  - Dependencies: Phase 2.6

- [x] Create static data for 3-5 workflows
  - Files: `src/data/workflows.ts` (workflow steps, agent collaboration, quality checks)
  - Dependencies: Phase 2.6

- [x] Create static data for 20+ artifacts
  - Files: `src/data/artifacts.ts` (code examples, markdown, test files)
  - Dependencies: Phase 2.6

- [x] Create static data for glossary
  - Files: `src/data/glossary.ts` (15-20 terms with definitions)
  - Dependencies: Phase 2.6

- [x] Create static data for FAQ
  - Files: `src/data/faq.ts` (10-15 Q&A pairs)
  - Dependencies: Phase 2.6

- [x] Create data index file
  - Files: `src/data/index.ts` (barrel exports)
  - Dependencies: Phase 2.7-2.12

- [ ] Write data validation utility
  - Files: `src/utils/dataValidation.ts` (validate references, completeness)
  - Dependencies: Phase 2.13

- [ ] Write tests for data completeness
  - Files: `src/data/index.test.ts` (test all agent IDs referenced, no broken links)
  - Dependencies: Phase 2.14

---

## Phase 3: Utilities & Hooks

- [x] Create `cn` utility (Tailwind class merging)
  - Files: `src/utils/cn.ts`
  - Run: `pnpm add clsx tailwind-merge`
  - Dependencies: Phase 2

- [ ] Create `formatDate` utility
  - Files: `src/utils/formatDate.ts`, `src/utils/formatDate.test.ts`
  - Dependencies: Phase 2

- [x] Create `categoryColors` utility
  - Files: `src/utils/categoryColors.ts`, `src/utils/categoryColors.test.ts`
  - Dependencies: Phase 2

- [ ] Create `urlHelpers` utility
  - Files: `src/utils/urlHelpers.ts`, `src/utils/urlHelpers.test.ts`
  - Dependencies: Phase 2

- [ ] Create `analytics` utility
  - Files: `src/utils/analytics.ts` (event tracking stubs)
  - Dependencies: Phase 2

- [x] Create utils index file
  - Files: `src/utils/index.ts`
  - Dependencies: Phase 3.1-3.5

- [ ] Create `useBreakpoint` hook
  - Files: `src/hooks/useBreakpoint.ts`, `src/hooks/useBreakpoint.test.tsx`
  - Dependencies: Phase 2

- [ ] Create `useReducedMotion` hook
  - Files: `src/hooks/useReducedMotion.ts`, `src/hooks/useReducedMotion.test.tsx`
  - Dependencies: Phase 2

- [ ] Create `useLocalStorage` hook
  - Files: `src/hooks/useLocalStorage.ts`, `src/hooks/useLocalStorage.test.tsx`
  - Dependencies: Phase 2

- [ ] Create `useKeyboardNav` hook
  - Files: `src/hooks/useKeyboardNav.ts`, `src/hooks/useKeyboardNav.test.tsx`
  - Dependencies: Phase 2

- [ ] Create `useScrollToTop` hook
  - Files: `src/hooks/useScrollToTop.ts`
  - Dependencies: Phase 2

- [ ] Create `usePageTracking` hook
  - Files: `src/hooks/usePageTracking.ts`
  - Dependencies: Phase 3.5

- [ ] Create hooks index file
  - Files: `src/hooks/index.ts`
  - Dependencies: Phase 3.7-3.12

- [ ] Create route constants
  - Files: `src/constants/routes.ts`
  - Dependencies: Phase 2

- [ ] Create breakpoint constants
  - Files: `src/constants/breakpoints.ts`
  - Dependencies: Phase 2

- [ ] Create category constants
  - Files: `src/constants/categories.ts`
  - Dependencies: Phase 2

- [ ] Create color constants
  - Files: `src/constants/colors.ts`
  - Dependencies: Phase 2

- [ ] Create constants index file
  - Files: `src/constants/index.ts`
  - Dependencies: Phase 3.14-3.17

---

## Phase 4: State Management

- [ ] Create filterStore (Zustand)
  - Files: `src/store/filterStore.ts` (agent/workflow filtering state)
  - Dependencies: Phase 3

- [ ] Create workflowStore (Zustand)
  - Files: `src/store/workflowStore.ts` (current workflow step navigation)
  - Dependencies: Phase 3

- [ ] Create interactiveStore (Zustand)
  - Files: `src/store/interactiveStore.ts` (explorer/comparison state)
  - Dependencies: Phase 3

- [ ] Create uiStore (Zustand)
  - Files: `src/store/uiStore.ts` (mobile menu, modals, loading)
  - Dependencies: Phase 3

- [ ] Create store index file
  - Files: `src/store/index.ts`
  - Dependencies: Phase 4.1-4.4

- [ ] Write tests for filterStore
  - Files: `src/store/filterStore.test.ts`
  - Dependencies: Phase 4.1

- [ ] Write tests for workflowStore
  - Files: `src/store/workflowStore.test.ts`
  - Dependencies: Phase 4.2

- [ ] Write tests for interactiveStore
  - Files: `src/store/interactiveStore.test.ts`
  - Dependencies: Phase 4.3

- [ ] Write tests for uiStore
  - Files: `src/store/uiStore.test.ts`
  - Dependencies: Phase 4.4

---

## Phase 5: Shared Components

- [ ] Create Button component
  - Files: `src/components/shared/Button.tsx`, `src/components/shared/Button.test.tsx`
  - Dependencies: Phase 4

- [ ] Create Card component
  - Files: `src/components/shared/Card.tsx`, `src/components/shared/Card.test.tsx`
  - Dependencies: Phase 4

- [ ] Create Badge component
  - Files: `src/components/shared/Badge.tsx`, `src/components/shared/Badge.test.tsx`
  - Dependencies: Phase 4

- [ ] Create LoadingSkeleton component
  - Files: `src/components/shared/LoadingSkeleton.tsx`, `src/components/shared/LoadingSkeleton.test.tsx`
  - Dependencies: Phase 4

- [ ] Create Tooltip component
  - Files: `src/components/shared/Tooltip.tsx`, `src/components/shared/Tooltip.test.tsx`
  - Dependencies: Phase 4

- [ ] Create Modal component
  - Files: `src/components/shared/Modal.tsx`, `src/components/shared/Modal.test.tsx`
  - Dependencies: Phase 4

- [ ] Create SearchInput component
  - Files: `src/components/shared/SearchInput.tsx`, `src/components/shared/SearchInput.test.tsx`
  - Dependencies: Phase 4

- [ ] Create FilterButton component
  - Files: `src/components/shared/FilterButton.tsx`, `src/components/shared/FilterButton.test.tsx`
  - Dependencies: Phase 4

- [ ] Create ProgressBar component
  - Files: `src/components/shared/ProgressBar.tsx`, `src/components/shared/ProgressBar.test.tsx`
  - Dependencies: Phase 4

- [ ] Create GlassMorphPanel component
  - Files: `src/components/shared/GlassMorphPanel.tsx`, `src/components/shared/GlassMorphPanel.test.tsx`
  - Dependencies: Phase 4

- [ ] Create shared components index file
  - Files: `src/components/shared/index.ts`
  - Dependencies: Phase 5.1-5.10

- [ ] Run accessibility tests on shared components
  - Files: `src/components/shared/*.test.tsx` (add axe-core tests)
  - Run: `pnpm add -D @axe-core/react`
  - Dependencies: Phase 5.1-5.10

---

## Phase 6: Layout Components

- [ ] Create Layout component
  - Files: `src/components/layout/Layout.tsx`, `src/components/layout/Layout.test.tsx`
  - Dependencies: Phase 5

- [ ] Create Header component
  - Files: `src/components/layout/Header.tsx`, `src/components/layout/Header.test.tsx`
  - Dependencies: Phase 5

- [ ] Create Footer component
  - Files: `src/components/layout/Footer.tsx`, `src/components/layout/Footer.test.tsx`
  - Dependencies: Phase 5

- [ ] Create MobileMenu component
  - Files: `src/components/layout/MobileMenu.tsx`, `src/components/layout/MobileMenu.test.tsx`
  - Dependencies: Phase 5

- [ ] Create Breadcrumbs component
  - Files: `src/components/layout/Breadcrumbs.tsx`, `src/components/layout/Breadcrumbs.test.tsx`
  - Dependencies: Phase 5

- [ ] Create layout components index file
  - Files: `src/components/layout/index.ts`
  - Dependencies: Phase 6.1-6.5

- [ ] Integrate Layout with uiStore (mobile menu state)
  - Files: `src/components/layout/Layout.tsx` (connect to uiStore)
  - Dependencies: Phase 6.1, Phase 4.4

---

## Phase 7: Agent Components

- [ ] Create AgentCard component
  - Files: `src/components/agents/AgentCard.tsx`, `src/components/agents/AgentCard.test.tsx`
  - Dependencies: Phase 6

- [ ] Create AgentGrid component
  - Files: `src/components/agents/AgentGrid.tsx`, `src/components/agents/AgentGrid.test.tsx`
  - Dependencies: Phase 7.1

- [ ] Create AgentDetail component
  - Files: `src/components/agents/AgentDetail.tsx`, `src/components/agents/AgentDetail.test.tsx`
  - Dependencies: Phase 7.1

- [ ] Create AgentAvatar component
  - Files: `src/components/agents/AgentAvatar.tsx`, `src/components/agents/AgentAvatar.test.tsx`
  - Dependencies: Phase 6

- [ ] Create AgentCapabilityList component
  - Files: `src/components/agents/AgentCapabilityList.tsx`, `src/components/agents/AgentCapabilityList.test.tsx`
  - Dependencies: Phase 6

- [ ] Create RelatedAgents component
  - Files: `src/components/agents/RelatedAgents.tsx`, `src/components/agents/RelatedAgents.test.tsx`
  - Dependencies: Phase 7.1

- [ ] Create AgentFilterBar component
  - Files: `src/components/agents/AgentFilterBar.tsx`, `src/components/agents/AgentFilterBar.test.tsx`
  - Dependencies: Phase 6

- [ ] Create agent components index file
  - Files: `src/components/agents/index.ts`
  - Dependencies: Phase 7.1-7.7

- [ ] Integrate AgentFilterBar with filterStore
  - Files: `src/components/agents/AgentFilterBar.tsx` (connect to filterStore)
  - Dependencies: Phase 7.7, Phase 4.1

- [ ] Integrate AgentGrid with filterStore
  - Files: `src/components/agents/AgentGrid.tsx` (filter agents based on store)
  - Dependencies: Phase 7.2, Phase 4.1

---

## Phase 8: Phase Components

- [ ] Create PhaseTimeline component
  - Files: `src/components/phases/PhaseTimeline.tsx`, `src/components/phases/PhaseTimeline.test.tsx`
  - Run: `pnpm add framer-motion` (if not already installed)
  - Dependencies: Phase 6

- [ ] Create PhaseNode component
  - Files: `src/components/phases/PhaseNode.tsx`, `src/components/phases/PhaseNode.test.tsx`
  - Dependencies: Phase 8.1

- [ ] Create QualityGate component
  - Files: `src/components/phases/QualityGate.tsx`, `src/components/phases/QualityGate.test.tsx`
  - Dependencies: Phase 6

- [ ] Create PhaseDetail component
  - Files: `src/components/phases/PhaseDetail.tsx`, `src/components/phases/PhaseDetail.test.tsx`
  - Dependencies: Phase 6

- [ ] Create PhaseObjectives component
  - Files: `src/components/phases/PhaseObjectives.tsx`, `src/components/phases/PhaseObjectives.test.tsx`
  - Dependencies: Phase 6

- [ ] Create PhaseNavigation component
  - Files: `src/components/phases/PhaseNavigation.tsx`, `src/components/phases/PhaseNavigation.test.tsx`
  - Dependencies: Phase 6

- [ ] Create phase components index file
  - Files: `src/components/phases/index.ts`
  - Dependencies: Phase 8.1-8.6

- [ ] Add Framer Motion animations to PhaseTimeline
  - Files: `src/components/phases/PhaseTimeline.tsx` (animate phase progression)
  - Dependencies: Phase 8.1

- [ ] Add responsive behavior (horizontal → vertical on mobile)
  - Files: `src/components/phases/PhaseTimeline.tsx` (use useBreakpoint hook)
  - Dependencies: Phase 8.1, Phase 3.7

---

## Phase 9: Artifact Components

- [ ] Install syntax highlighting library
  - Run: `pnpm add prismjs @types/prismjs` or `pnpm add shiki`
  - Dependencies: Phase 5

- [ ] Create SyntaxHighlighter component
  - Files: `src/components/artifacts/SyntaxHighlighter.tsx`, `src/components/artifacts/SyntaxHighlighter.test.tsx`
  - Dependencies: Phase 9.1

- [ ] Create ArtifactViewer component
  - Files: `src/components/artifacts/ArtifactViewer.tsx`, `src/components/artifacts/ArtifactViewer.test.tsx`
  - Dependencies: Phase 9.2

- [ ] Create ArtifactMetadata component
  - Files: `src/components/artifacts/ArtifactMetadata.tsx`, `src/components/artifacts/ArtifactMetadata.test.tsx`
  - Dependencies: Phase 6

- [ ] Create ArtifactToolbar component (copy, download)
  - Files: `src/components/artifacts/ArtifactToolbar.tsx`, `src/components/artifacts/ArtifactToolbar.test.tsx`
  - Dependencies: Phase 6

- [ ] Create ArtifactCarousel component
  - Files: `src/components/artifacts/ArtifactCarousel.tsx`, `src/components/artifacts/ArtifactCarousel.test.tsx`
  - Dependencies: Phase 6

- [ ] Create artifact components index file
  - Files: `src/components/artifacts/index.ts`
  - Dependencies: Phase 9.2-9.6

- [ ] Implement copy-to-clipboard functionality
  - Files: `src/components/artifacts/ArtifactToolbar.tsx`
  - Run: `pnpm add copy-to-clipboard @types/copy-to-clipboard`
  - Dependencies: Phase 9.5

---

## Phase 10: Workflow Components

- [ ] Create WorkflowCard component
  - Files: `src/components/workflows/WorkflowCard.tsx`, `src/components/workflows/WorkflowCard.test.tsx`
  - Dependencies: Phase 9

- [ ] Create WorkflowGrid component
  - Files: `src/components/workflows/WorkflowGrid.tsx`, `src/components/workflows/WorkflowGrid.test.tsx`
  - Dependencies: Phase 10.1

- [ ] Create WorkflowStepView component
  - Files: `src/components/workflows/WorkflowStepView.tsx`, `src/components/workflows/WorkflowStepView.test.tsx`
  - Dependencies: Phase 9

- [ ] Create WorkflowNavigation component (prev/next/jump)
  - Files: `src/components/workflows/WorkflowNavigation.tsx`, `src/components/workflows/WorkflowNavigation.test.tsx`
  - Dependencies: Phase 6

- [ ] Create WorkflowProgress component
  - Files: `src/components/workflows/WorkflowProgress.tsx`, `src/components/workflows/WorkflowProgress.test.tsx`
  - Dependencies: Phase 6

- [ ] Create AgentCollaboration component
  - Files: `src/components/workflows/AgentCollaboration.tsx`, `src/components/workflows/AgentCollaboration.test.tsx`
  - Dependencies: Phase 7

- [ ] Create QualityCheckPanel component
  - Files: `src/components/workflows/QualityCheckPanel.tsx`, `src/components/workflows/QualityCheckPanel.test.tsx`
  - Dependencies: Phase 8.3

- [ ] Create WorkflowFilterBar component
  - Files: `src/components/workflows/WorkflowFilterBar.tsx`, `src/components/workflows/WorkflowFilterBar.test.tsx`
  - Dependencies: Phase 6

- [ ] Create workflow components index file
  - Files: `src/components/workflows/index.ts`
  - Dependencies: Phase 10.1-10.8

- [ ] Integrate WorkflowStepView with workflowStore
  - Files: `src/components/workflows/WorkflowStepView.tsx` (connect to workflowStore)
  - Dependencies: Phase 10.3, Phase 4.2

- [ ] Integrate WorkflowNavigation with workflowStore
  - Files: `src/components/workflows/WorkflowNavigation.tsx` (update current step)
  - Dependencies: Phase 10.4, Phase 4.2

- [ ] Integrate WorkflowFilterBar with filterStore
  - Files: `src/components/workflows/WorkflowFilterBar.tsx` (filter workflows)
  - Dependencies: Phase 10.8, Phase 4.1

---

## Phase 11: Interactive Components

- [ ] Create CapabilityExplorer component (agent/scenario selector)
  - Files: `src/components/interactive/CapabilityExplorer.tsx`, `src/components/interactive/CapabilityExplorer.test.tsx`
  - Dependencies: Phase 9

- [ ] Create OutputSimulator component
  - Files: `src/components/interactive/OutputSimulator.tsx`, `src/components/interactive/OutputSimulator.test.tsx`
  - Dependencies: Phase 9

- [ ] Create ComparisonView component
  - Files: `src/components/interactive/ComparisonView.tsx`, `src/components/interactive/ComparisonView.test.tsx`
  - Dependencies: Phase 9

- [ ] Create ComparisonPanel component
  - Files: `src/components/interactive/ComparisonPanel.tsx`, `src/components/interactive/ComparisonPanel.test.tsx`
  - Dependencies: Phase 9

- [ ] Create SimulationControls component (run/reset)
  - Files: `src/components/interactive/SimulationControls.tsx`, `src/components/interactive/SimulationControls.test.tsx`
  - Dependencies: Phase 6

- [ ] Create interactive components index file
  - Files: `src/components/interactive/index.ts`
  - Dependencies: Phase 11.1-11.5

- [ ] Integrate CapabilityExplorer with interactiveStore
  - Files: `src/components/interactive/CapabilityExplorer.tsx` (connect to interactiveStore)
  - Dependencies: Phase 11.1, Phase 4.3

- [ ] Integrate OutputSimulator with interactiveStore
  - Files: `src/components/interactive/OutputSimulator.tsx` (run simulation, show loading)
  - Dependencies: Phase 11.2, Phase 4.3

- [ ] Add 1-2s delay to simulation for realism
  - Files: `src/components/interactive/OutputSimulator.tsx` (setTimeout before output)
  - Dependencies: Phase 11.2

---

## Phase 12: Visualization Components

- [ ] Install React Flow
  - Run: `pnpm add @xyflow/react` (if not already installed)
  - Dependencies: Phase 6

- [ ] Create FlowNode component (custom agent node)
  - Files: `src/components/visualizations/FlowNode.tsx`, `src/components/visualizations/FlowNode.test.tsx`
  - Dependencies: Phase 12.1

- [ ] Create FlowEdge component (custom edge with labels)
  - Files: `src/components/visualizations/FlowEdge.tsx`, `src/components/visualizations/FlowEdge.test.tsx`
  - Dependencies: Phase 12.1

- [ ] Create FlowControls component (zoom/pan/reset)
  - Files: `src/components/visualizations/FlowControls.tsx`, `src/components/visualizations/FlowControls.test.tsx`
  - Dependencies: Phase 12.1

- [ ] Create AgentFlowDiagram component
  - Files: `src/components/visualizations/AgentFlowDiagram.tsx`, `src/components/visualizations/AgentFlowDiagram.test.tsx`
  - Dependencies: Phase 12.2-12.4

- [ ] Create visualization components index file
  - Files: `src/components/visualizations/index.ts`
  - Dependencies: Phase 12.2-12.5

- [ ] Generate agent collaboration graph data
  - Files: `src/data/flowData.ts` (nodes/edges for agent interactions)
  - Dependencies: Phase 2.7, Phase 12.5

- [ ] Add click handlers to FlowNode (navigate to agent detail)
  - Files: `src/components/visualizations/FlowNode.tsx` (onClick navigate)
  - Dependencies: Phase 12.2

- [ ] Add touch gestures for mobile (pan, zoom)
  - Files: `src/components/visualizations/AgentFlowDiagram.tsx` (React Flow config)
  - Dependencies: Phase 12.5

---

## Phase 13: Home Page Components

- [ ] Create Hero component
  - Files: `src/components/home/Hero.tsx`, `src/components/home/Hero.test.tsx`
  - Dependencies: Phase 6

- [ ] Create QuickStats component
  - Files: `src/components/home/QuickStats.tsx`, `src/components/home/QuickStats.test.tsx`
  - Dependencies: Phase 6

- [ ] Create HowItWorks component
  - Files: `src/components/home/HowItWorks.tsx`, `src/components/home/HowItWorks.test.tsx`
  - Dependencies: Phase 6

- [ ] Create FeaturedWorkflow component
  - Files: `src/components/home/FeaturedWorkflow.tsx`, `src/components/home/FeaturedWorkflow.test.tsx`
  - Dependencies: Phase 10.1

- [ ] Create ProceduralBackground component (static)
  - Files: `src/components/home/ProceduralBackground.tsx`, `src/components/home/ProceduralBackground.test.tsx`
  - Dependencies: Phase 6

- [ ] Create home components index file
  - Files: `src/components/home/index.ts`
  - Dependencies: Phase 13.1-13.5

- [ ] Add Framer Motion animations to Hero
  - Files: `src/components/home/Hero.tsx` (fade-in, slide-up animation)
  - Dependencies: Phase 13.1

- [ ] Ensure ProceduralBackground is static (no heavy animation)
  - Files: `src/components/home/ProceduralBackground.tsx` (CSS-only animation or static SVG)
  - Dependencies: Phase 13.5

---

## Phase 14: Resources Components

- [ ] Create GlossaryList component
  - Files: `src/components/resources/GlossaryList.tsx`, `src/components/resources/GlossaryList.test.tsx`
  - Dependencies: Phase 6

- [ ] Create GlossaryTerm component
  - Files: `src/components/resources/GlossaryTerm.tsx`, `src/components/resources/GlossaryTerm.test.tsx`
  - Dependencies: Phase 6

- [ ] Create FAQList component (accordion)
  - Files: `src/components/resources/FAQList.tsx`, `src/components/resources/FAQList.test.tsx`
  - Dependencies: Phase 6

- [ ] Create FAQItem component (accordion item)
  - Files: `src/components/resources/FAQItem.tsx`, `src/components/resources/FAQItem.test.tsx`
  - Dependencies: Phase 6

- [ ] Create ArchitectureDiagram component
  - Files: `src/components/resources/ArchitectureDiagram.tsx`, `src/components/resources/ArchitectureDiagram.test.tsx`
  - Dependencies: Phase 6

- [ ] Create resources components index file
  - Files: `src/components/resources/index.ts`
  - Dependencies: Phase 14.1-14.5

- [ ] Add search functionality to GlossaryList
  - Files: `src/components/resources/GlossaryList.tsx` (filter by search term)
  - Dependencies: Phase 14.1, Phase 5.7

- [ ] Add accordion interactions to FAQList
  - Files: `src/components/resources/FAQList.tsx` (expand/collapse items)
  - Dependencies: Phase 14.3

---

## Phase 15: Page Components

- [ ] Create HomePage
  - Files: `src/pages/HomePage.tsx`, `src/pages/HomePage.test.tsx`
  - Dependencies: Phase 13

- [ ] Create AgentsPage
  - Files: `src/pages/AgentsPage.tsx`, `src/pages/AgentsPage.test.tsx`
  - Dependencies: Phase 7

- [ ] Create AgentDetailPage
  - Files: `src/pages/AgentDetailPage.tsx`, `src/pages/AgentDetailPage.test.tsx`
  - Dependencies: Phase 7

- [ ] Create LifecyclePage
  - Files: `src/pages/LifecyclePage.tsx`, `src/pages/LifecyclePage.test.tsx`
  - Dependencies: Phase 8

- [ ] Create PhaseDetailPage
  - Files: `src/pages/PhaseDetailPage.tsx`, `src/pages/PhaseDetailPage.test.tsx`
  - Dependencies: Phase 8

- [ ] Create ExamplesPage
  - Files: `src/pages/ExamplesPage.tsx`, `src/pages/ExamplesPage.test.tsx`
  - Dependencies: Phase 10

- [ ] Create WorkflowWalkthroughPage
  - Files: `src/pages/WorkflowWalkthroughPage.tsx`, `src/pages/WorkflowWalkthroughPage.test.tsx`
  - Dependencies: Phase 10

- [ ] Create InteractivePage
  - Files: `src/pages/InteractivePage.tsx`, `src/pages/InteractivePage.test.tsx`
  - Dependencies: Phase 11

- [ ] Create ResourcesPage
  - Files: `src/pages/ResourcesPage.tsx`, `src/pages/ResourcesPage.test.tsx`
  - Dependencies: Phase 14

- [ ] Create GlossaryPage
  - Files: `src/pages/GlossaryPage.tsx`, `src/pages/GlossaryPage.test.tsx`
  - Dependencies: Phase 14

- [ ] Create NotFoundPage (404)
  - Files: `src/pages/NotFoundPage.tsx`, `src/pages/NotFoundPage.test.tsx`
  - Dependencies: Phase 6

- [ ] Create pages index file
  - Files: `src/pages/index.ts`
  - Dependencies: Phase 15.1-15.11

- [ ] Add SEO meta tags to all pages
  - Run: `pnpm add react-helmet-async`
  - Files: Update all page components with `<Helmet>` tags
  - Dependencies: Phase 15.1-15.11

- [ ] Add social sharing meta tags
  - Files: Update all page components with Open Graph and Twitter Card meta tags
  - Dependencies: Phase 15.1-15.11

---

## Phase 16: Routing Integration

- [ ] Create router configuration
  - Files: `src/App.tsx` (add BrowserRouter, Routes, Route)
  - Dependencies: Phase 15

- [ ] Define all routes with params
  - Files: `src/App.tsx` (routes: /, /agents, /agents/:agentId, /lifecycle, etc.)
  - Dependencies: Phase 16.1

- [ ] Add scroll restoration on route change
  - Files: `src/App.tsx` (use useScrollToTop hook)
  - Dependencies: Phase 16.2, Phase 3.11

- [ ] Add analytics page tracking
  - Files: `src/App.tsx` (use usePageTracking hook)
  - Dependencies: Phase 16.2, Phase 3.12

- [ ] Test deep links with query params
  - Files: Test URLs like `/agents?filter=discovery&view=technical`
  - Dependencies: Phase 16.2

- [ ] Add 404 redirect handling for non-existent routes
  - Files: `src/App.tsx` (catch-all route to NotFoundPage)
  - Dependencies: Phase 16.2

- [ ] Test browser back/forward navigation
  - Run: Manual testing in browser
  - Dependencies: Phase 16.2

---

## Phase 17: Public Assets

- [ ] Create favicon
  - Files: `public/favicon.ico` (16x16, 32x32, 48x48 sizes)
  - Dependencies: None

- [ ] Create 404.html for GitHub Pages SPA routing
  - Files: `public/404.html` (redirect to index.html with sessionStorage)
  - Dependencies: None

- [ ] Create robots.txt
  - Files: `public/robots.txt` (allow all)
  - Dependencies: None

- [ ] Create manifest.json (PWA manifest, optional)
  - Files: `public/manifest.json` (app name, icons, theme colors)
  - Dependencies: None

- [ ] Create social sharing images
  - Files: `public/og-image.png` (1200x630px Open Graph image)
  - Dependencies: None

- [ ] Update index.html with meta tags
  - Files: `index.html` (link to favicon, manifest, og:image)
  - Dependencies: Phase 17.1-17.5

---

## Phase 18: Deployment Configuration

- [ ] Create GitHub Actions workflow file
  - Files: `.github/workflows/deploy.yml`
  - Dependencies: Phase 17

- [ ] Configure workflow to install dependencies
  - Files: `.github/workflows/deploy.yml` (pnpm setup, node setup)
  - Dependencies: Phase 18.1

- [ ] Configure workflow to run build
  - Files: `.github/workflows/deploy.yml` (pnpm build)
  - Dependencies: Phase 18.1

- [ ] Configure workflow to run tests
  - Files: `.github/workflows/deploy.yml` (pnpm test)
  - Dependencies: Phase 18.1

- [ ] Configure workflow to deploy to gh-pages
  - Files: `.github/workflows/deploy.yml` (peaceiris/actions-gh-pages)
  - Dependencies: Phase 18.1

- [ ] Update vite.config.ts with correct base path
  - Files: `vite.config.ts` (base: '/virtual-team-planner/')
  - Dependencies: Phase 1

- [ ] Update README.md with live demo link
  - Files: `README.md` (badge and prominent link to GitHub Pages site)
  - Dependencies: None

- [ ] Create CONTRIBUTING.md (optional)
  - Files: `CONTRIBUTING.md` (how to contribute, setup instructions)
  - Dependencies: None

- [ ] Test deployment in separate branch
  - Run: Push to test branch, verify GitHub Actions workflow runs
  - Dependencies: Phase 18.1-18.5

- [ ] Enable GitHub Pages in repository settings
  - Run: Manual step in GitHub repo settings (Source: gh-pages branch)
  - Dependencies: Phase 18.9

---

## Phase 19: Testing & Refinement

- [ ] Install Playwright for E2E testing
  - Run: `pnpm add -D @playwright/test`
  - Run: `pnpm exec playwright install`
  - Dependencies: Phase 18

- [ ] Create Playwright config
  - Files: `playwright.config.ts`
  - Dependencies: Phase 19.1

- [ ] Write E2E test for agent exploration
  - Files: `tests/e2e/agents.spec.ts` (view directory, filter, search, detail)
  - Dependencies: Phase 19.2

- [ ] Write E2E test for lifecycle navigation
  - Files: `tests/e2e/lifecycle.spec.ts` (view timeline, phase detail, navigation)
  - Dependencies: Phase 19.2

- [ ] Write E2E test for workflow walkthrough
  - Files: `tests/e2e/workflows.spec.ts` (select workflow, step-through, quality gates)
  - Dependencies: Phase 19.2

- [ ] Write E2E test for interactive explorer
  - Files: `tests/e2e/interactive.spec.ts` (select agent, run simulation, comparison)
  - Dependencies: Phase 19.2

- [ ] Write E2E accessibility test
  - Files: `tests/e2e/accessibility.spec.ts` (run axe-core on all pages)
  - Run: `pnpm add -D @axe-core/playwright`
  - Dependencies: Phase 19.2

- [ ] Install Lighthouse CI
  - Run: `pnpm add -D @lhci/cli`
  - Files: `lighthouserc.json`
  - Dependencies: Phase 18

- [ ] Configure Lighthouse CI thresholds
  - Files: `lighthouserc.json` (accessibility ≥90, performance ≥90)
  - Dependencies: Phase 19.8

- [ ] Add Lighthouse CI to GitHub Actions workflow
  - Files: `.github/workflows/deploy.yml` (run lhci after build)
  - Dependencies: Phase 19.9, Phase 18.1

- [ ] Run manual keyboard navigation testing
  - Run: Test all interactive elements with Tab, Enter, Escape, Arrow keys
  - Dependencies: Phase 18

- [ ] Run manual screen reader testing
  - Run: Test with NVDA (Windows), VoiceOver (Mac), JAWS (Windows)
  - Dependencies: Phase 18

- [ ] Test on multiple browsers
  - Run: Test on Chrome, Firefox, Safari, Edge
  - Dependencies: Phase 18

- [ ] Test on mobile devices
  - Run: Test on iOS Safari, Chrome Android
  - Dependencies: Phase 18

- [ ] Analyze bundle size
  - Run: `pnpm build` and check dist/ folder size
  - Run: `pnpm add -D vite-plugin-bundle-analyzer`
  - Dependencies: Phase 18

- [ ] Optimize bundle size if needed
  - Files: `vite.config.ts` (tree-shaking, code-splitting)
  - Dependencies: Phase 19.15

- [ ] Fix any failing tests
  - Files: Fix issues in component/test files
  - Dependencies: Phase 19.3-19.7

- [ ] Fix accessibility violations
  - Files: Fix issues identified by axe-core
  - Dependencies: Phase 19.7

- [ ] Fix performance issues
  - Files: Optimize components, lazy load, reduce bundle size
  - Dependencies: Phase 19.10

- [ ] Verify all quality gates pass
  - Run: TypeScript (0 errors), ESLint (0 errors), Tests (100% pass, ≥80% coverage), Lighthouse (≥90 scores)
  - Dependencies: Phase 19.17-19.19

---

## Phase 20: Deploy & Monitor

- [ ] Merge to main branch to trigger deployment
  - Run: `git checkout main && git merge <feature-branch> && git push`
  - Dependencies: Phase 19

- [ ] Verify GitHub Actions workflow completes successfully
  - Run: Check GitHub Actions tab for workflow status
  - Dependencies: Phase 20.1

- [ ] Verify live site is accessible
  - Run: Visit https://<username>.github.io/virtual-team-planner/
  - Dependencies: Phase 20.2

- [ ] Setup Google Analytics or Plausible
  - Run: Create analytics account, add tracking code
  - Files: Update `src/utils/analytics.ts` with tracking ID
  - Dependencies: Phase 20.3

- [ ] Setup Sentry for error tracking (optional)
  - Run: `pnpm add @sentry/react`
  - Files: `src/main.tsx` (initialize Sentry)
  - Dependencies: Phase 20.3

- [ ] Test analytics tracking
  - Run: Visit site, verify page views tracked
  - Dependencies: Phase 20.4

- [ ] Setup Web Vitals monitoring
  - Run: `pnpm add web-vitals`
  - Files: `src/main.tsx` (report web vitals)
  - Dependencies: Phase 20.3

- [ ] Test error tracking (optional)
  - Run: Trigger test error, verify Sentry captures it
  - Dependencies: Phase 20.5

- [ ] Update README with deployment instructions
  - Files: `README.md` (add deployment section)
  - Dependencies: Phase 20.3

- [ ] Create GitHub release (optional)
  - Run: Tag release v1.0.0, create GitHub Release
  - Dependencies: Phase 20.3

- [ ] Share live demo link
  - Run: Update README badge, share on social media
  - Dependencies: Phase 20.3

---

**END OF TASK BREAKDOWN**

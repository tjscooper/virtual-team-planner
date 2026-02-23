# Test Strategy: Virtual Team Demo App

**Feature**: virtual-team-demo-app  
**Date**: 2026-02-23  
**Author**: QA Lead (virtual-team)  
**Phase**: Design (Phase 2)  
**Status**: Draft

---

## Executive Summary

This test strategy defines a comprehensive quality assurance approach for the Virtual Team Demo App, a static React/TypeScript web application deployed to GitHub Pages. The strategy prioritizes user-facing quality (accessibility, performance, responsive design) over backend testing (no backend exists). Testing will focus on component isolation, user interaction flows, cross-browser compatibility, and automated quality gates integrated into CI/CD.

**Key Testing Priorities**:
1. **Accessibility** - WCAG 2.1 AA compliance (Level 90+ Lighthouse score)
2. **Performance** - 60fps animations, <3s load time, Lighthouse 90+ performance
3. **Responsive Design** - Mobile/tablet/desktop layouts
4. **User Flows** - 6 primary user journeys (agent exploration, workflow walkthrough, etc.)
5. **Visual Regression** - Prevent UI breakage across changes

---

## 1. Test Types and Coverage Targets

### Test Pyramid

| Test Type | Scope | Target Coverage | Tools | Est. Test Count |
|-----------|-------|----------------|-------|----------------|
| **Unit Tests** | Utility functions, hooks, data transformations | 80%+ line coverage | Vitest, React Testing Library | 150-200 tests |
| **Component Tests** | Individual React components (isolated) | 70%+ component coverage | Vitest, React Testing Library, @testing-library/user-event | 100-150 tests |
| **Integration Tests** | Multi-component interactions, routing, state management | Critical paths only | Vitest, React Testing Library | 40-60 tests |
| **E2E Tests** | Full user flows across pages | 5 critical flows | Playwright | 15-25 tests |
| **Visual Regression** | UI consistency across changes | Key pages (10-15) | Playwright + percy.io or chromatic | 30-50 snapshots |
| **Accessibility Tests** | WCAG 2.1 AA compliance | All pages and components | axe-core, Lighthouse CI, pa11y | Automated on every page |
| **Performance Tests** | Load time, frame rate, bundle size | All routes | Lighthouse CI, Web Vitals API | Automated on every build |
| **Manual/Exploratory** | Edge cases, usability, mobile devices | Risk-based | Human QA | 8-12 hours |

---

## 2. Testing Framework and Tooling

### Frontend Test Stack

**Unit & Component Testing**:
- **Framework**: [Vitest](https://vitest.dev/) - Fast Vite-native test runner (matches build tool)
- **React Testing**: [@testing-library/react](https://testing-library.com/react) - User-centric component testing
- **User Interaction**: [@testing-library/user-event](https://testing-library.com/docs/user-event/intro) - Realistic user events
- **Assertions**: Built-in Vitest matchers + @testing-library/jest-dom
- **Coverage**: Vitest's built-in coverage (c8/istanbul)

**End-to-End Testing**:
- **Framework**: [Playwright](https://playwright.dev/) - Cross-browser E2E automation
- **Browsers**: Chromium, Firefox, WebKit (Safari)
- **Modes**: Headless (CI), headed (local debugging)
- **Parallelization**: 4 workers in CI, 2 locally

**Visual Regression**:
- **Tool**: Playwright's built-in screenshot comparison OR [Percy.io](https://percy.io/) (cloud-based, free tier for open source)
- **Snapshots**: Stored in `tests/__snapshots__/` or Percy cloud
- **Diff Threshold**: 0.2% pixel difference tolerance

**Accessibility Testing**:
- **Automated**: [axe-core](https://github.com/dequelabs/axe-core) via [@axe-core/playwright](https://www.npmjs.com/package/@axe-core/playwright)
- **Lighthouse CI**: Automated accessibility audits in GitHub Actions
- **Manual**: Screen reader testing (NVDA on Windows, VoiceOver on macOS/iOS)

**Performance Testing**:
- **Lighthouse CI**: Automated performance audits in GitHub Actions
- **Web Vitals**: [@vitejs/plugin-web-vitals](https://www.npmjs.com/package/web-vitals) for RUM tracking
- **Bundle Analysis**: [rollup-plugin-visualizer](https://www.npmjs.com/package/rollup-plugin-visualizer)

**Linting & Static Analysis**:
- **ESLint**: TypeScript + React rules + [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) for accessibility
- **TypeScript**: Strict mode type checking
- **Prettier**: Code formatting enforcement

---

## 3. Test File Organization

### Directory Structure

```
virtual-team-planner/
├── src/
│   ├── components/
│   │   ├── AgentCard/
│   │   │   ├── AgentCard.tsx
│   │   │   ├── AgentCard.test.tsx         # Component tests
│   │   │   └── AgentCard.stories.tsx      # (Optional) Storybook
│   │   ├── PhaseTimeline/
│   │   │   ├── PhaseTimeline.tsx
│   │   │   └── PhaseTimeline.test.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── HomePage/
│   │   │   ├── HomePage.tsx
│   │   │   └── HomePage.test.tsx          # Integration tests
│   │   ├── AgentDetailPage/
│   │   │   └── AgentDetailPage.test.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── useFilterAgents.ts
│   │   └── useFilterAgents.test.ts        # Hook tests
│   ├── utils/
│   │   ├── formatDuration.ts
│   │   └── formatDuration.test.ts         # Utility tests
│   ├── data/
│   │   ├── agents.ts                      # Static data
│   │   ├── phases.ts
│   │   └── workflows.ts
│   └── test/
│       ├── setup.ts                       # Vitest global setup
│       ├── fixtures/                      # Test data
│       │   ├── mockAgents.ts
│       │   ├── mockPhases.ts
│       │   └── mockWorkflows.ts
│       └── helpers/
│           ├── renderWithRouter.tsx       # Test utilities
│           └── mockIntersectionObserver.ts
├── tests/
│   ├── e2e/
│   │   ├── agent-directory.spec.ts        # E2E tests
│   │   ├── workflow-walkthrough.spec.ts
│   │   ├── navigation.spec.ts
│   │   └── accessibility.spec.ts
│   ├── visual/
│   │   ├── home-page.spec.ts              # Visual regression
│   │   ├── agent-detail.spec.ts
│   │   └── phase-timeline.spec.ts
│   └── performance/
│       └── lighthouse-ci-config.js
├── vitest.config.ts                        # Vitest configuration
├── playwright.config.ts                    # Playwright configuration
└── .github/
    └── workflows/
        ├── test.yml                        # CI test workflow
        └── deploy.yml                      # Deployment workflow (includes tests)
```

### Naming Conventions

**Test Files**:
- Unit/Component tests: `ComponentName.test.tsx` (colocated with source)
- E2E tests: `feature-name.spec.ts` (in `tests/e2e/`)
- Visual tests: `page-name.spec.ts` (in `tests/visual/`)

**Test Structure** (BDD-style with `describe`/`it`):
```typescript
describe('AgentCard', () => {
  describe('rendering', () => {
    it('should display agent name and description', () => { ... })
    it('should apply category-specific accent color', () => { ... })
  })

  describe('interactions', () => {
    it('should navigate to agent detail page when clicked', () => { ... })
    it('should show glow effect on hover', () => { ... })
  })

  describe('accessibility', () => {
    it('should have proper ARIA labels', () => { ... })
    it('should be keyboard navigable', () => { ... })
  })
})
```

**E2E Test Structure**:
```typescript
test.describe('Agent Directory Flow', () => {
  test('should filter agents by category', async ({ page }) => { ... })
  test('should search agents by keyword', async ({ page }) => { ... })
  test('should navigate to agent detail and back', async ({ page }) => { ... })
})
```

---

## 4. Test Data Requirements

### Static Test Fixtures

All test data will be derived from production data sources (`src/data/`) with optional subsets for faster test execution.

**Mock Data Files** (`src/test/fixtures/`):

1. **mockAgents.ts** - Subset of 5 agents (1 per category) with complete structure
   ```typescript
   export const mockProductOwner: Agent = {
     id: 'product-owner',
     name: 'Product Owner',
     category: 'discovery',
     description: 'Defines user stories and acceptance criteria',
     capabilities: ['User story creation', 'Backlog prioritization', ...],
     exampleInputs: ['Business objectives', 'User feedback'],
     exampleOutputs: [mockUserStoryArtifact],
     phaseParticipation: ['discovery'],
     relatedAgents: ['ux-researcher', 'tech-lead']
   }
   ```

2. **mockPhases.ts** - All 5 phases with minimal artifacts
   ```typescript
   export const mockDiscoveryPhase: Phase = {
     id: 'discovery',
     name: 'Discovery',
     order: 1,
     durationEstimate: '3-5 days',
     objectives: ['Gather requirements', ...],
     participatingAgents: ['product-owner', 'ux-researcher', 'stakeholder'],
     deliverables: ['User stories', 'Personas'],
     qualityGateCriteria: ['All user stories have acceptance criteria', ...],
     exampleArtifacts: [mockUserStoryArtifact]
   }
   ```

3. **mockWorkflows.ts** - 2 example workflows (simple + complex)
   ```typescript
   export const mockSimpleWorkflow: Workflow = {
     id: 'ecommerce-feature',
     name: 'E-Commerce Checkout Feature',
     industry: 'Retail',
     complexity: 'simple',
     description: 'Add guest checkout to existing e-commerce site',
     steps: [
       {
         id: 'step-1',
         phase: 'discovery',
         activeAgents: ['product-owner'],
         inputArtifacts: [],
         agentReasoning: 'Analyzing user pain points with current checkout...',
         outputArtifacts: [mockUserStoryArtifact],
         qualityCheck: { passed: true, criteria: [...], feedback: '...' }
       },
       // ... 8-12 steps total
     ]
   }
   ```

4. **mockArtifacts.ts** - Example artifacts for each type
   ```typescript
   export const mockUserStoryArtifact: Artifact = {
     id: 'us-001',
     name: 'User Story: Guest Checkout',
     type: 'markdown',
     content: '# User Story\\n\\n**As a** guest user...',
     metadata: {
       createdBy: 'product-owner',
       phase: 'discovery',
       timestamp: '2026-02-23T10:00:00Z'
     }
   }

   export const mockCodeArtifact: Artifact = {
     id: 'code-001',
     name: 'CheckoutButton.tsx',
     type: 'code',
     content: 'export const CheckoutButton = () => { ... }',
     metadata: { ... }
   }
   ```

### Test Data Principles
- **Use production data structure** - Test data matches TypeScript interfaces exactly
- **Minimal viable fixtures** - Each test uses smallest data set needed
- **Shared fixtures** - Common mocks in `src/test/fixtures/`, test-specific mocks inline
- **Type-safe mocks** - All mocks satisfy TypeScript interfaces (compile-time validation)
- **Data completeness tests** - Automated tests verify production data has all required fields

---

## 5. Quality Gates

### Gate Criteria (Must Pass to Merge/Deploy)

| Gate | Criteria | Measurement | Failure Action |
|------|----------|-------------|----------------|
| **Unit Test Coverage** | ≥80% line coverage on `src/` (excluding stories/tests) | Vitest coverage report | Block PR merge |
| **Component Test Coverage** | ≥70% component coverage | Vitest coverage report | Block PR merge |
| **All Unit/Integration Tests** | 100% passing (0 failures, 0 skipped) | Vitest CI run | Block PR merge |
| **E2E Tests** | 100% passing on Chromium, Firefox, WebKit | Playwright CI run | Block PR merge |
| **Accessibility Score** | Lighthouse ≥90 on all pages | Lighthouse CI | Block PR merge |
| **Performance Score** | Lighthouse ≥90 on all pages | Lighthouse CI | Block deployment |
| **Core Web Vitals** | LCP <3s, FID <100ms, CLS <0.1 | Lighthouse CI | Block deployment |
| **Bundle Size** | Main bundle <500KB gzipped | Vite build output | Warning (block if >750KB) |
| **TypeScript** | 0 type errors | `tsc --noEmit` | Block PR merge |
| **Linting** | 0 ESLint errors (warnings OK) | ESLint CI run | Block PR merge |
| **Visual Regression** | 0 unreviewed diffs OR <0.2% pixel diff | Percy/Playwright | Manual review required |
| **WCAG AA Violations** | 0 critical/serious axe-core violations | axe-core E2E tests | Block PR merge |

### Gate Enforcement in CI/CD

**GitHub Actions Workflow** (`.github/workflows/test.yml`):
```yaml
name: Test & Quality Gates

on:
  pull_request:
  push:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test:unit --coverage
      - name: Check coverage threshold
        run: |
          coverage=$(jq '.total.lines.pct' coverage/coverage-summary.json)
          if (( $(echo "$coverage < 80" | bc -l) )); then
            echo "Coverage $coverage% below 80% threshold"
            exit 1
          fi
      - uses: codecov/codecov-action@v3  # Upload coverage report

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm build  # E2E tests run against production build
      - name: Install Playwright
        run: pnpm exec playwright install --with-deps
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  lighthouse-ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:4173
            http://localhost:4173/agents
            http://localhost:4173/lifecycle
          uploadArtifacts: true
          temporaryPublicStorage: true
          runs: 3  # Average of 3 runs
      - name: Check Lighthouse scores
        run: |
          # Parse lighthouse results and fail if <90
          node scripts/check-lighthouse-scores.js

  visual-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test:visual
      - uses: percy/exec-action@v0.3.1  # Percy.io integration
        with:
          command: "pnpm exec percy snapshot dist/"

  lint-and-types:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck
```

### Manual Review Gates

1. **Visual Regression Review** - QA Lead reviews Percy/Playwright diffs before merge
2. **Accessibility Manual Testing** - Before release, QA Tester performs screen reader test on 3 key flows
3. **Mobile Device Testing** - Before release, test on 2 real devices (iOS Safari, Android Chrome)

---

## 6. Accessibility Testing Plan

### WCAG 2.1 Level AA Compliance

**Target**: Lighthouse Accessibility Score ≥90, 0 critical axe-core violations

### Automated Accessibility Testing

**1. Component-Level (Vitest + axe-core)**

Every component test includes accessibility check:
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

describe('AgentCard', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<AgentCard agent={mockProductOwner} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

**2. Page-Level (Playwright + axe-core)**

E2E tests include full-page accessibility scans:
```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

test('Agent Directory page should be accessible', async ({ page }) => {
  await page.goto('/agents');
  await injectAxe(page);
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true }
  });
});
```

**3. Lighthouse CI**

Automated accessibility audits on every PR/push:
- Run on 10+ key pages
- Fail build if score <90
- Generate detailed reports

### Manual Accessibility Testing

**Screen Reader Testing** (Before Release):

| Flow | Tool | Browser | Tester | Result |
|------|------|---------|--------|--------|
| Agent Directory navigation | NVDA 2024 | Chrome | QA Tester | Pass/Fail |
| Workflow walkthrough | VoiceOver | Safari (macOS) | QA Tester | Pass/Fail |
| Interactive Explorer | JAWS 2024 | Edge | External reviewer | Pass/Fail |

**Keyboard Navigation Testing**:

Test all interactive elements are accessible via:
- `Tab` / `Shift+Tab` - Focus navigation
- `Enter` / `Space` - Activate buttons/links
- `Escape` - Close modals/menus
- `Arrow keys` - Navigate lists/timelines

**Focus Indicator Testing**:
- Visual focus outline visible (2px solid, high contrast)
- Focus outline contrasts with background (3:1 ratio)
- Focus order follows visual order

**Color Contrast Testing**:
- Use browser DevTools or [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- All text meets 4.5:1 ratio (normal text), 3:1 ratio (large text 18px+)
- Interactive elements meet 3:1 ratio

**Motion Sensitivity Testing**:
- Enable `prefers-reduced-motion` in OS/browser settings
- Verify animations disabled or reduced
- No parallax or heavy motion effects

### Accessibility Checklist (Per Page)

- [ ] Semantic HTML5 elements (`<nav>`, `<main>`, `<article>`, `<section>`)
- [ ] Single `<h1>` per page, logical heading hierarchy (h1 → h2 → h3)
- [ ] All images have descriptive `alt` text (or `alt=""` for decorative images)
- [ ] All form inputs have associated `<label>` or `aria-label`
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators visible on all focusable elements
- [ ] Color contrast meets WCAG AA (4.5:1 normal, 3:1 large)
- [ ] ARIA roles/labels used correctly (not overused)
- [ ] No keyboard traps (focus can always escape)
- [ ] Skip links provided ("Skip to main content")
- [ ] Error messages associated with form fields via `aria-describedby`
- [ ] Dynamic content announces changes via ARIA live regions
- [ ] Language declared in `<html lang="en">`
- [ ] Page title descriptive and unique (`<title>Agent Directory | Virtual Team Planner</title>`)

---

## 7. Performance Testing Plan

### Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Initial Load (LCP)** | <3s on 3G, <1.5s on broadband | Lighthouse CI |
| **First Input Delay (FID)** | <100ms | Lighthouse CI, Web Vitals API |
| **Cumulative Layout Shift (CLS)** | <0.1 | Lighthouse CI, Web Vitals API |
| **Time to Interactive (TTI)** | <5s on 3G | Lighthouse CI |
| **Frame Rate** | 60fps (16.67ms/frame) | Chrome DevTools Performance panel |
| **Main Bundle Size** | <500KB gzipped | Vite build output |
| **Total Page Weight** | <2MB (initial load) | Lighthouse CI |
| **Lighthouse Performance Score** | ≥90 | Lighthouse CI |

### Automated Performance Testing

**1. Lighthouse CI (GitHub Actions)**

Configure `lighthouserc.js`:
```javascript
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/agents',
        'http://localhost:4173/agents/product-owner',
        'http://localhost:4173/lifecycle',
        'http://localhost:4173/examples',
        'http://localhost:4173/examples/ecommerce-feature',
        'http://localhost:4173/interactive',
      ],
      numberOfRuns: 3,  // Average of 3 runs
      settings: {
        throttling: {
          cpuSlowdownMultiplier: 4,  // Simulate slower device
          rttMs: 150,
          throughputKbps: 1638.4,     // Simulate 3G connection
        },
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 500 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',  // Or use LHCI server
    },
  },
};
```

**2. Bundle Size Monitoring**

Vite build reports bundle sizes:
```json
// package.json
{
  "scripts": {
    "build": "vite build",
    "analyze": "vite build --mode analyze && vite-bundle-visualizer"
  }
}
```

Add budget check to CI:
```bash
# .github/workflows/test.yml
- name: Check bundle size
  run: |
    SIZE=$(gzip -c dist/assets/index-*.js | wc -c)
    if [ $SIZE -gt 512000 ]; then  # 500KB limit
      echo "Bundle size ${SIZE} exceeds 500KB limit"
      exit 1
    fi
```

**3. Web Vitals Real User Monitoring**

Instrument app with Web Vitals API:
```typescript
// src/utils/reportWebVitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals(onPerfEntry?: (metric: any) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}
```

Send metrics to analytics (Google Analytics 4 or Plausible):
```typescript
// src/main.tsx
import { reportWebVitals } from './utils/reportWebVitals';

reportWebVitals((metric) => {
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  }
});
```

### Manual Performance Testing

**Frame Rate Testing** (Chrome DevTools):

1. Open DevTools → Performance tab
2. Record user interaction (e.g., scroll timeline, hover agent cards)
3. Verify FPS counter shows 60fps (green)
4. Check for long tasks (>50ms) in flame chart
5. Identify jank/frame drops

**Key Interactions to Test**:
- [ ] Scroll Phase Timeline (should maintain 60fps)
- [ ] Hover Agent Cards (glow effect animation)
- [ ] Open/close mobile hamburger menu
- [ ] Navigate between pages (smooth transitions)
- [ ] Workflow step-by-step navigation
- [ ] React Flow diagram pan/zoom

**Network Throttling**:
- Test on "Slow 3G" profile (DevTools → Network tab)
- Verify loading skeletons appear
- Check images/code syntax highlighting lazy-load

**Memory Profiling**:
- Record heap snapshots during navigation
- Verify no memory leaks (detached DOM nodes)
- Check memory usage stays <100MB on extended use

### Performance Optimization Checklist

- [ ] Code splitting with `React.lazy()` for routes
- [ ] Lazy load heavy components (React Flow, Framer Motion scenes)
- [ ] Image optimization (WebP format, responsive sizes with `srcset`)
- [ ] Syntax highlighter lazy-loaded (dynamic import)
- [ ] Tree-shaking enabled (Vite default)
- [ ] Dead code elimination (TypeScript unused exports)
- [ ] No heavy WebGL or animated backgrounds
- [ ] Static background (protein visualization)
- [ ] Loading skeletons for async content
- [ ] Suspense boundaries for lazy components
- [ ] `prefers-reduced-motion` disables animations
- [ ] Debounce search/filter inputs (300ms delay)
- [ ] Virtualization for long lists (if needed)

---

## 8. Cross-Browser & Device Testing

### Browser Compatibility Matrix

| Browser | Versions | Platform | E2E Tests | Manual Tests |
|---------|----------|----------|-----------|--------------|
| **Chrome** | Latest, Latest-1 | Windows, macOS, Linux | ✅ Automated (Chromium) | ✅ Smoke test |
| **Firefox** | Latest, Latest-1 | Windows, macOS, Linux | ✅ Automated | ✅ Smoke test |
| **Safari** | Latest, Latest-1 | macOS | ✅ Automated (WebKit) | ✅ Full test |
| **Edge** | Latest | Windows | ❌ (covered by Chromium) | ✅ Smoke test |
| **Safari iOS** | Latest | iPhone/iPad | ❌ (WebKit covers) | ✅ Full test |
| **Chrome Mobile** | Latest | Android | ❌ | ✅ Full test |

**Minimum Supported**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Device Testing Strategy

**Responsive Breakpoints**:
- **Mobile**: 375px (iPhone SE), 390px (iPhone 13), 414px (iPhone 14 Pro Max)
- **Tablet**: 768px (iPad), 820px (iPad Air), 1024px (iPad Pro)
- **Desktop**: 1280px, 1440px, 1920px, 2560px

**E2E Tests (Playwright)**:
```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'Desktop Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'Desktop Safari', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
    { name: 'Tablet', use: { ...devices['iPad Pro'] } },
  ],
});
```

**Manual Device Testing** (Before Release):

| Device | OS | Browser | Tester | Scenarios |
|--------|----|---------|---------|--------------------|
| iPhone 13 | iOS 17 | Safari | QA Tester | Navigation, agent directory, workflow walkthrough |
| Pixel 7 | Android 14 | Chrome | QA Tester | Same as iOS |
| iPad Air | iPadOS 17 | Safari | QA Tester | Tablet layout, touch interactions |

**Testing Checklist (Per Device)**:
- [ ] Navigation menu works (hamburger on mobile)
- [ ] Agent grid adapts (4 cols → 2 cols → 1 col)
- [ ] Phase timeline vertical layout on mobile
- [ ] Touch targets ≥44x44px
- [ ] No horizontal scroll
- [ ] Images scale properly
- [ ] Text readable (min 16px)
- [ ] Forms/inputs work on touch
- [ ] Modals/overlays don't break layout
- [ ] Hover effects replaced with tap on touch

### Cross-Browser Bug Tracking

Document browser-specific issues in test results:
```markdown
## Known Issues

| Browser | Issue | Workaround | Status |
|---------|-------|------------|--------|
| Safari 14 | Backdrop-filter blur flickers | Add `-webkit-backdrop-filter` | Fixed in v1.1 |
| Firefox | Focus outline not visible | Force outline style | Fixed in v1.0 |
```

---

## 9. Test Coverage Details

### Component Test Examples

**AgentCard Component** (`src/components/AgentCard/AgentCard.test.tsx`):

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import { AgentCard } from './AgentCard';
import { mockProductOwner } from '@/test/fixtures/mockAgents';

describe('AgentCard', () => {
  const renderWithRouter = (ui: React.ReactElement) =>
    render(<BrowserRouter>{ui}</BrowserRouter>);

  describe('rendering', () => {
    it('should display agent name', () => {
      renderWithRouter(<AgentCard agent={mockProductOwner} />);
      expect(screen.getByText('Product Owner')).toBeInTheDocument();
    });

    it('should display agent description', () => {
      renderWithRouter(<AgentCard agent={mockProductOwner} />);
      expect(screen.getByText(/Defines user stories/i)).toBeInTheDocument();
    });

    it('should apply discovery category accent color (cyan)', () => {
      const { container } = renderWithRouter(<AgentCard agent={mockProductOwner} />);
      const card = container.querySelector('[data-category="discovery"]');
      expect(card).toHaveClass('border-cyan-500');
    });

    it('should display agent icon', () => {
      renderWithRouter(<AgentCard agent={mockProductOwner} />);
      const icon = screen.getByRole('img', { name: /product owner icon/i });
      expect(icon).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('should navigate to agent detail page when clicked', async () => {
      const user = userEvent.setup();
      renderWithRouter(<AgentCard agent={mockProductOwner} />);
      
      const card = screen.getByRole('link', { name: /product owner/i });
      await user.click(card);
      
      expect(window.location.pathname).toBe('/agents/product-owner');
    });

    it('should show glow effect on hover', async () => {
      const user = userEvent.setup();
      const { container } = renderWithRouter(<AgentCard agent={mockProductOwner} />);
      const card = container.querySelector('[data-testid="agent-card"]');
      
      await user.hover(card);
      expect(card).toHaveClass('hover:shadow-cyan-glow');
    });

    it('should lift card on hover (translate-y)', async () => {
      const user = userEvent.setup();
      const { container } = renderWithRouter(<AgentCard agent={mockProductOwner} />);
      const card = container.querySelector('[data-testid="agent-card"]');
      
      await user.hover(card);
      expect(card).toHaveClass('hover:-translate-y-2');
    });
  });

  describe('accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderWithRouter(<AgentCard agent={mockProductOwner} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA label', () => {
      renderWithRouter(<AgentCard agent={mockProductOwner} />);
      const card = screen.getByRole('link', { name: /view product owner details/i });
      expect(card).toBeInTheDocument();
    });

    it('should be keyboard navigable (focusable)', () => {
      renderWithRouter(<AgentCard agent={mockProductOwner} />);
      const card = screen.getByRole('link');
      card.focus();
      expect(card).toHaveFocus();
    });
  });

  describe('category variants', () => {
    it('should apply magenta accent for design category', () => {
      const designAgent = { ...mockProductOwner, category: 'design' as const };
      const { container } = renderWithRouter(<AgentCard agent={designAgent} />);
      const card = container.querySelector('[data-category="design"]');
      expect(card).toHaveClass('border-magenta-500');
    });

    it('should apply purple accent for implementation category', () => {
      const implAgent = { ...mockProductOwner, category: 'implementation' as const };
      const { container } = renderWithRouter(<AgentCard agent={implAgent} />);
      const card = container.querySelector('[data-category="implementation"]');
      expect(card).toHaveClass('border-purple-500');
    });
  });
});
```

**PhaseTimeline Component** (`src/components/PhaseTimeline/PhaseTimeline.test.tsx`):

```typescript
describe('PhaseTimeline', () => {
  it('should render all 5 phases in order', () => {
    render(<PhaseTimeline phases={mockPhases} />);
    const phaseNodes = screen.getAllByRole('button', { name: /phase/i });
    expect(phaseNodes).toHaveLength(5);
    expect(phaseNodes[0]).toHaveTextContent('Discovery');
    expect(phaseNodes[4]).toHaveTextContent('Compliance');
  });

  it('should display quality gates between phases', () => {
    render(<PhaseTimeline phases={mockPhases} />);
    const gates = screen.getAllByTestId('quality-gate');
    expect(gates).toHaveLength(4); // 4 gates between 5 phases
  });

  it('should navigate to phase detail when phase clicked', async () => {
    const user = userEvent.setup();
    render(<PhaseTimeline phases={mockPhases} />);
    
    await user.click(screen.getByText('Discovery'));
    expect(window.location.pathname).toBe('/lifecycle/discovery');
  });

  it('should animate glow on first load', async () => {
    const { container } = render(<PhaseTimeline phases={mockPhases} animate={true} />);
    
    // Wait for animation to start
    await waitFor(() => {
      const glow = container.querySelector('.phase-glow-animation');
      expect(glow).toBeInTheDocument();
    });
  });

  it('should respect prefers-reduced-motion', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { container } = render(<PhaseTimeline phases={mockPhases} animate={true} />);
    const glow = container.querySelector('.phase-glow-animation');
    expect(glow).not.toBeInTheDocument();
  });

  it('should switch to vertical layout on mobile', () => {
    global.innerWidth = 375; // Mobile width
    global.dispatchEvent(new Event('resize'));
    
    const { container } = render(<PhaseTimeline phases={mockPhases} />);
    expect(container.firstChild).toHaveClass('flex-col'); // Vertical layout
  });
});
```

### Integration Test Examples

**Agent Directory Page** (`src/pages/AgentDirectoryPage/AgentDirectoryPage.test.tsx`):

```typescript
describe('AgentDirectoryPage', () => {
  describe('initial render', () => {
    it('should display all 11 agents', () => {
      render(<AgentDirectoryPage />);
      const agentCards = screen.getAllByTestId('agent-card');
      expect(agentCards).toHaveLength(11);
    });

    it('should show page heading', () => {
      render(<AgentDirectoryPage />);
      expect(screen.getByRole('heading', { level: 1, name: /agent directory/i })).toBeInTheDocument();
    });

    it('should display filter buttons for all categories', () => {
      render(<AgentDirectoryPage />);
      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /discovery/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /design/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /implementation/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /qa/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /compliance/i })).toBeInTheDocument();
    });
  });

  describe('filtering by category', () => {
    it('should filter to Discovery agents when Discovery button clicked', async () => {
      const user = userEvent.setup();
      render(<AgentDirectoryPage />);
      
      await user.click(screen.getByRole('button', { name: /discovery/i }));
      
      const agentCards = screen.getAllByTestId('agent-card');
      expect(agentCards).toHaveLength(3); // 3 Discovery agents
      expect(screen.getByText('Product Owner')).toBeInTheDocument();
      expect(screen.getByText('UX Researcher')).toBeInTheDocument();
      expect(screen.getByText('Stakeholder')).toBeInTheDocument();
    });

    it('should update URL with filter param', async () => {
      const user = userEvent.setup();
      render(<AgentDirectoryPage />);
      
      await user.click(screen.getByRole('button', { name: /design/i }));
      
      expect(window.location.search).toBe('?filter=design');
    });

    it('should restore filter from URL on page load', () => {
      window.history.pushState({}, '', '/agents?filter=qa');
      render(<AgentDirectoryPage />);
      
      const agentCards = screen.getAllByTestId('agent-card');
      expect(agentCards).toHaveLength(2); // 2 QA agents
    });

    it('should show "All" button as active by default', () => {
      render(<AgentDirectoryPage />);
      const allButton = screen.getByRole('button', { name: /all/i });
      expect(allButton).toHaveClass('active');
    });

    it('should highlight active filter button', async () => {
      const user = userEvent.setup();
      render(<AgentDirectoryPage />);
      
      await user.click(screen.getByRole('button', { name: /compliance/i }));
      
      const complianceButton = screen.getByRole('button', { name: /compliance/i });
      expect(complianceButton).toHaveClass('active');
    });
  });

  describe('search functionality', () => {
    it('should filter agents by name search', async () => {
      const user = userEvent.setup();
      render(<AgentDirectoryPage />);
      const searchInput = screen.getByRole('searchbox', { name: /search agents/i });
      
      await user.type(searchInput, 'lead');
      
      const agentCards = screen.getAllByTestId('agent-card');
      expect(agentCards.length).toBeLessThan(11); // Filtered results
      expect(screen.getByText('Tech Lead')).toBeInTheDocument();
      expect(screen.getByText('QA Lead')).toBeInTheDocument();
    });

    it('should filter agents by capability keyword', async () => {
      const user = userEvent.setup();
      render(<AgentDirectoryPage />);
      const searchInput = screen.getByRole('searchbox');
      
      await user.type(searchInput, 'testing');
      
      // Should show agents with "testing" in capabilities
      expect(screen.getByText('QA Lead')).toBeInTheDocument();
      expect(screen.getByText('Test Engineer')).toBeInTheDocument();
    });

    it('should show "no results" message when search has no matches', async () => {
      const user = userEvent.setup();
      render(<AgentDirectoryPage />);
      const searchInput = screen.getByRole('searchbox');
      
      await user.type(searchInput, 'zzzzz');
      
      expect(screen.getByText(/no agents match your search/i)).toBeInTheDocument();
    });

    it('should clear search when clear button clicked', async () => {
      const user = userEvent.setup();
      render(<AgentDirectoryPage />);
      const searchInput = screen.getByRole('searchbox');
      
      await user.type(searchInput, 'lead');
      await user.click(screen.getByRole('button', { name: /clear search/i }));
      
      expect(searchInput).toHaveValue('');
      expect(screen.getAllByTestId('agent-card')).toHaveLength(11); // All agents
    });

    it('should debounce search input', async () => {
      jest.useFakeTimers();
      const user = userEvent.setup({ delay: null });
      render(<AgentDirectoryPage />);
      const searchInput = screen.getByRole('searchbox');
      
      await user.type(searchInput, 'lead');
      
      // Search should not trigger immediately
      expect(screen.getAllByTestId('agent-card')).toHaveLength(11);
      
      // Advance timers past debounce delay (300ms)
      jest.advanceTimersByTime(300);
      
      // Now search should be applied
      await waitFor(() => {
        expect(screen.getAllByTestId('agent-card').length).toBeLessThan(11);
      });
      
      jest.useRealTimers();
    });
  });

  describe('responsive layout', () => {
    it('should display 4 columns on desktop', () => {
      global.innerWidth = 1920;
      global.dispatchEvent(new Event('resize'));
      
      const { container } = render(<AgentDirectoryPage />);
      const grid = container.querySelector('.agent-grid');
      expect(grid).toHaveClass('grid-cols-4');
    });

    it('should display 2 columns on tablet', () => {
      global.innerWidth = 768;
      global.dispatchEvent(new Event('resize'));
      
      const { container } = render(<AgentDirectoryPage />);
      const grid = container.querySelector('.agent-grid');
      expect(grid).toHaveClass('grid-cols-2');
    });

    it('should display 1 column on mobile', () => {
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));
      
      const { container } = render(<AgentDirectoryPage />);
      const grid = container.querySelector('.agent-grid');
      expect(grid).toHaveClass('grid-cols-1');
    });
  });
});
```

### E2E Test Examples

**Workflow Walkthrough** (`tests/e2e/workflow-walkthrough.spec.ts`):

```typescript
import { test, expect } from '@playwright/test';

test.describe('Workflow Walkthrough Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples');
  });

  test('should navigate through complete workflow step-by-step', async ({ page }) => {
    // Click first workflow card
    await page.click('text=E-Commerce Checkout Feature');
    
    // Verify workflow detail page loaded
    await expect(page.locator('h1')).toContainText('E-Commerce Checkout Feature');
    
    // Verify initial step displayed
    await expect(page.locator('[data-testid="step-indicator"]')).toContainText('Step 1 of 10');
    await expect(page.locator('[data-testid="active-phase"]')).toContainText('Discovery');
    await expect(page.locator('[data-testid="active-agent"]')).toContainText('Product Owner');
    
    // Click Next to advance through workflow
    for (let i = 1; i < 10; i++) {
      await page.click('button:has-text("Next Step")');
      await expect(page.locator('[data-testid="step-indicator"]')).toContainText(`Step ${i + 1} of 10`);
    }
    
    // Verify completion message
    await expect(page.locator('text=Workflow Complete')).toBeVisible();
  });

  test('should navigate backward through steps', async ({ page }) => {
    await page.click('text=E-Commerce Checkout Feature');
    
    // Advance to step 3
    await page.click('button:has-text("Next Step")');
    await page.click('button:has-text("Next Step")');
    await expect(page.locator('[data-testid="step-indicator"]')).toContainText('Step 3 of 10');
    
    // Navigate backward
    await page.click('button:has-text("Previous Step")');
    await expect(page.locator('[data-testid="step-indicator"]')).toContainText('Step 2 of 10');
    
    await page.click('button:has-text("Previous Step")');
    await expect(page.locator('[data-testid="step-indicator"]')).toContainText('Step 1 of 10');
    
    // Previous button should be disabled on step 1
    await expect(page.locator('button:has-text("Previous Step")')).toBeDisabled();
  });

  test('should display agent reasoning for each step', async ({ page }) => {
    await page.click('text=E-Commerce Checkout Feature');
    
    // Verify reasoning section exists
    await expect(page.locator('[data-testid="agent-reasoning"]')).toBeVisible();
    await expect(page.locator('[data-testid="agent-reasoning"]')).toContainText('Analyzing');
  });

  test('should display input and output artifacts', async ({ page }) => {
    await page.click('text=E-Commerce Checkout Feature');
    
    // Advance to step with artifacts
    await page.click('button:has-text("Next Step")');
    
    // Check for artifact viewer
    await expect(page.locator('[data-testid="artifact-viewer"]')).toBeVisible();
    
    // Verify syntax highlighting
    await expect(page.locator('pre code')).toBeVisible();
  });

  test('should show quality gate pass/fail', async ({ page }) => {
    await page.click('text=E-Commerce Checkout Feature');
    
    // Advance to step with quality gate
    for (let i = 0; i < 3; i++) {
      await page.click('button:has-text("Next Step")');
    }
    
    // Check for quality gate indicator
    const qualityGate = page.locator('[data-testid="quality-gate"]');
    await expect(qualityGate).toBeVisible();
    
    // Should show pass or fail status
    const status = await qualityGate.getAttribute('data-status');
    expect(['pass', 'fail']).toContain(status);
  });

  test('should display rework loop when quality gate fails', async ({ page }) => {
    await page.click('text=Healthcare Compliance Feature'); // Example with failure
    
    // Navigate to failure step
    for (let i = 0; i < 5; i++) {
      await page.click('button:has-text("Next Step")');
    }
    
    // Verify failure indicator
    await expect(page.locator('[data-testid="quality-gate"][data-status="fail"]')).toBeVisible();
    
    // Verify rework feedback
    await expect(page.locator('[data-testid="rework-feedback"]')).toBeVisible();
    await expect(page.locator('text=Rework Required')).toBeVisible();
  });

  test('should jump to specific step from progress indicator', async ({ page }) => {
    await page.click('text=E-Commerce Checkout Feature');
    
    // Click on step 5 in progress bar
    await page.click('[data-testid="progress-step-5"]');
    
    // Verify jumped to step 5
    await expect(page.locator('[data-testid="step-indicator"]')).toContainText('Step 5 of 10');
  });

  test('should persist step in URL for deep linking', async ({ page }) => {
    await page.click('text=E-Commerce Checkout Feature');
    
    // Advance to step 3
    await page.click('button:has-text("Next Step")');
    await page.click('button:has-text("Next Step")');
    
    // Verify URL contains step parameter
    expect(page.url()).toContain('step=3');
    
    // Reload page
    await page.reload();
    
    // Verify step 3 still displayed
    await expect(page.locator('[data-testid="step-indicator"]')).toContainText('Step 3 of 10');
  });

  test('should copy artifact content', async ({ page }) => {
    await page.click('text=E-Commerce Checkout Feature');
    await page.click('button:has-text("Next Step")');
    
    // Click copy button
    await page.click('button[aria-label="Copy artifact content"]');
    
    // Verify copy success message
    await expect(page.locator('text=Copied!')).toBeVisible({ timeout: 3000 });
  });
});

test.describe('Workflow Walkthrough Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/examples');
    
    // Tab to workflow card
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Verify loaded
    await expect(page.locator('h1')).toContainText('Checkout Feature');
    
    // Tab to Next button and activate
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Verify advanced to next step
    await expect(page.locator('[data-testid="step-indicator"]')).toContainText('Step 2');
  });

  test('should announce step changes to screen readers', async ({ page }) => {
    await page.goto('/examples/ecommerce-feature');
    
    // Check for ARIA live region
    const liveRegion = page.locator('[aria-live="polite"]');
    await expect(liveRegion).toBeVisible();
    
    // Click next
    await page.click('button:has-text("Next Step")');
    
    // Verify live region updated
    await expect(liveRegion).toContainText('Now on step 2');
  });
});
```

### Visual Regression Test Examples

**Home Page Visual Test** (`tests/visual/home-page.spec.ts`):

```typescript
import { test, expect } from '@playwright/test';

test.describe('Home Page Visual Regression', () => {
  test('should match hero section snapshot', async ({ page }) => {
    await page.goto('/');
    
    // Wait for animations to settle
    await page.waitForTimeout(1000);
    
    // Take snapshot of hero section
    const hero = page.locator('[data-testid="hero-section"]');
    await expect(hero).toHaveScreenshot('hero-section.png', {
      maxDiffPixels: 100, // Allow minor differences
    });
  });

  test('should match quick stats section snapshot', async ({ page }) => {
    await page.goto('/');
    
    const stats = page.locator('[data-testid="quick-stats"]');
    await expect(stats).toHaveScreenshot('quick-stats.png');
  });

  test('should match full page snapshot (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('home-page-desktop.png', {
      fullPage: true,
      maxDiffPixels: 500,
    });
  });

  test('should match full page snapshot (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('home-page-mobile.png', {
      fullPage: true,
      maxDiffPixels: 300,
    });
  });

  test('should match dark mode glassmorphic card styles', async ({ page }) => {
    await page.goto('/agents');
    
    // Hover first agent card to capture glow effect
    const firstCard = page.locator('[data-testid="agent-card"]').first();
    await firstCard.hover();
    await page.waitForTimeout(300); // Wait for hover animation
    
    await expect(firstCard).toHaveScreenshot('agent-card-hover.png');
  });
});
```

---

## 10. CI Integration and Deployment Pipeline

### GitHub Actions Workflow

**Complete CI/CD Pipeline** (`.github/workflows/ci-cd.yml`):

```yaml
name: CI/CD Pipeline

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

env:
  PNPM_VERSION: 8
  NODE_VERSION: 18

jobs:
  # Job 1: Lint and Type Check
  lint-and-types:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run ESLint
        run: pnpm lint
      
      - name: Run TypeScript type check
        run: pnpm typecheck
      
      - name: Check code formatting
        run: pnpm format:check

  # Job 2: Unit & Component Tests
  unit-tests:
    name: Unit & Component Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run unit tests with coverage
        run: pnpm test:unit --coverage --run
      
      - name: Check coverage threshold
        run: |
          COVERAGE=$(jq '.total.lines.pct' coverage/coverage-summary.json)
          echo "Coverage: $COVERAGE%"
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "❌ Coverage $COVERAGE% is below 80% threshold"
            exit 1
          fi
          echo "✅ Coverage $COVERAGE% meets 80% threshold"
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
          name: unit-tests-coverage
      
      - name: Upload coverage artifacts
        uses: actions/upload-artifact@v3
        with:
          name: coverage-report
          path: coverage/

  # Job 3: Build
  build:
    name: Build Application
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build application
        run: pnpm build
        env:
          NODE_ENV: production
      
      - name: Check bundle size
        run: |
          MAIN_BUNDLE=$(find dist/assets -name "index-*.js" -exec gzip -c {} \; | wc -c)
          echo "Main bundle size: $MAIN_BUNDLE bytes ($(($MAIN_BUNDLE / 1024))KB)"
          
          if [ $MAIN_BUNDLE -gt 524288 ]; then  # 512KB limit
            echo "❌ Bundle size exceeds 512KB limit"
            exit 1
          fi
          echo "✅ Bundle size within limit"
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
          retention-days: 7

  # Job 4: E2E Tests
  e2e-tests:
    name: E2E Tests (Playwright)
    runs-on: ubuntu-latest
    needs: build
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps ${{ matrix.browser }}
      
      - name: Run E2E tests
        run: pnpm test:e2e --project=${{ matrix.browser }}
      
      - name: Upload Playwright report
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report-${{ matrix.browser }}
          path: playwright-report/
          retention-days: 7

  # Job 5: Accessibility Tests
  accessibility-tests:
    name: Accessibility Tests
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: Install Playwright
        run: pnpm exec playwright install --with-deps chromium
      
      - name: Run accessibility tests
        run: pnpm test:a11y
      
      - name: Upload accessibility report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: accessibility-report
          path: test-results/accessibility/

  # Job 6: Lighthouse CI
  lighthouse:
    name: Lighthouse Performance & Accessibility
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:4173
            http://localhost:4173/agents
            http://localhost:4173/agents/product-owner
            http://localhost:4173/lifecycle
            http://localhost:4173/examples
            http://localhost:4173/interactive
          configPath: './lighthouserc.js'
          uploadArtifacts: true
          temporaryPublicStorage: true
      
      - name: Check Lighthouse scores
        run: node scripts/check-lighthouse-scores.js

  # Job 7: Visual Regression Tests
  visual-regression:
    name: Visual Regression Tests
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Fetch full history for Percy
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: Run visual regression tests
        run: pnpm test:visual
      
      - name: Upload Percy snapshots
        uses: percy/exec-action@v0.3.1
        with:
          command: "pnpm exec percy snapshot dist/"
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}

  # Job 8: Deploy to GitHub Pages (only on push to main)
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    needs: [lint-and-types, unit-tests, e2e-tests, accessibility-tests, lighthouse]
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build for production
        run: pnpm build
        env:
          NODE_ENV: production
          VITE_BASE_PATH: /virtual-team-planner/
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: virtual-team-planner.example.com  # Optional custom domain

  # Job 9: Notification (on failure)
  notify-failure:
    name: Notify on Failure
    runs-on: ubuntu-latest
    needs: [lint-and-types, unit-tests, e2e-tests, accessibility-tests, lighthouse, deploy]
    if: failure()
    steps:
      - name: Send failure notification
        run: |
          echo "⚠️ CI/CD pipeline failed. Check workflow logs."
          # Add Slack/email notification here if needed
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,md}\"",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:unit": "vitest run --coverage",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:a11y": "playwright test tests/e2e/accessibility.spec.ts",
    "test:visual": "playwright test tests/visual/",
    "lighthouse": "lhci autorun"
  }
}
```

### Quality Gate Summary

| Gate | Phase | Tool | Pass Criteria | Block Merge? | Block Deploy? |
|------|-------|------|---------------|--------------|---------------|
| Type Check | Lint | TypeScript | 0 errors | ✅ Yes | ✅ Yes |
| Linting | Lint | ESLint | 0 errors | ✅ Yes | ✅ Yes |
| Unit Tests | Test | Vitest | 100% pass | ✅ Yes | ✅ Yes |
| Unit Coverage | Test | Vitest | ≥80% | ✅ Yes | ✅ Yes |
| E2E Tests | Test | Playwright | 100% pass | ✅ Yes | ✅ Yes |
| Accessibility | Test | axe-core | 0 critical violations | ✅ Yes | ✅ Yes |
| Lighthouse A11y | Test | Lighthouse CI | Score ≥90 | ✅ Yes | ✅ Yes |
| Lighthouse Perf | Test | Lighthouse CI | Score ≥90 | ❌ No | ✅ Yes |
| Bundle Size | Build | Vite | <512KB gzipped | ⚠️ Warn | ⚠️ Warn |
| Visual Regression | Test | Percy/Playwright | Manual review | ❌ No | ❌ No |

---

## 11. Risk-Based Testing Priorities

### High-Risk Areas (Extra Testing Focus)

1. **Agent Directory Filtering** (US-1.3)
   - **Risk**: Complex state management (filter + search + URL sync)
   - **Mitigation**: 15+ integration tests, E2E tests for all filter combinations, manual exploratory testing

2. **Workflow Step-by-Step Navigation** (US-3.2)
   - **Risk**: Deep linking, state persistence, edge cases (first/last step)
   - **Mitigation**: 20+ E2E tests, manual testing on 3 workflows, URL parameter validation

3. **Responsive Layouts** (US-5.3)
   - **Risk**: Layout breakage on mobile, touch interactions
   - **Mitigation**: Visual regression tests at 3 breakpoints, manual device testing on 3 real devices

4. **Accessibility** (US-5.4)
   - **Risk**: Complex visualizations (React Flow), keyboard navigation
   - **Mitigation**: Automated axe-core tests on every component, manual screen reader testing, external a11y audit

5. **Performance** (US-5.5)
   - **Risk**: Heavy animations, large bundle size
   - **Mitigation**: Lighthouse CI on every PR, bundle size monitoring, lazy loading strategy, performance profiling

### Medium-Risk Areas

6. **React Flow Diagrams** (US-2.3)
   - **Risk**: Third-party library, complex interactions
   - **Mitigation**: Integration tests for key interactions, manual testing on touch devices

7. **Syntax Highlighting** (Artifact Viewer)
   - **Risk**: Performance impact, security (XSS)
   - **Mitigation**: Lazy load syntax highlighter, sanitize code content, performance testing

8. **Client-Side Routing** (GitHub Pages)
   - **Risk**: 404 errors on deep links, base path configuration
   - **Mitigation**: E2E tests for all routes, test deployment on staging branch, 404.html redirect fallback

### Low-Risk Areas

9. **Static Data** (Agents, Phases, Workflows)
   - **Risk**: Data completeness, type safety
   - **Mitigation**: TypeScript compile-time validation, data completeness unit tests

10. **Styling/CSS** (Tailwind + Glassmorphism)
    - **Risk**: Visual inconsistencies
    - **Mitigation**: Visual regression tests, design review

---

## 12. Test Execution Schedule

### Development Phase (Phase 3)

**Week 1-2**: Foundation
- Developer writes unit tests alongside components (TDD approach)
- SDET sets up test infrastructure (Vitest, Playwright configs)
- QA Lead reviews test coverage weekly

**Week 3-4**: Integration
- Developer writes integration tests for pages
- SDET writes E2E tests for first 2 user flows
- QA Tester performs exploratory testing on dev builds

**Week 5-6**: Polish
- SDET completes E2E tests for all flows
- QA Tester performs accessibility testing (screen reader)
- QA Lead performs mobile device testing

### QA Phase (Phase 4)

**Week 1**: Regression Testing
- Run full test suite (unit, integration, E2E)
- QA Tester performs manual regression testing on 5 key flows
- Fix any critical/high bugs

**Week 2**: Pre-Release Testing
- Performance testing (Lighthouse, manual profiling)
- Accessibility audit (external reviewer if possible)
- Cross-browser testing (manual on Edge, Safari, mobile)
- Visual regression review (Percy diffs)
- Final quality gate review

---

## 13. Bug Severity Classification

| Severity | Definition | Examples | Response Time | Fix Priority |
|----------|------------|----------|---------------|--------------|
| **Critical** | Blocks primary user flow, no workaround | App crashes on load, navigation broken, accessibility blocker (Level A violation) | <4 hours | Immediate |
| **High** | Major feature broken, workaround exists | Filter not working, workflow step nav fails, performance <60 | <24 hours | High |
| **Medium** | Minor feature issue, doesn't block primary flow | Visual glitch, hover effect missing, incorrect tooltip | <3 days | Medium |
| **Low** | Cosmetic issue, minimal user impact | Typo, minor alignment issue, color slightly off | <1 week | Low |

---

## 14. Test Environment Requirements

### Local Development
- **OS**: macOS, Windows, or Linux
- **Node.js**: 18+
- **pnpm**: 8+
- **Browsers**: Chrome, Firefox, Safari (for local E2E testing)

### CI Environment (GitHub Actions)
- **OS**: ubuntu-latest
- **Node.js**: 18
- **Browsers**: Chromium, Firefox, WebKit (via Playwright)
- **Parallelization**: 4 workers for E2E tests

### Device Lab (Manual Testing)
- **iPhone 13** (iOS 17, Safari)
- **Pixel 7** (Android 14, Chrome)
- **iPad Air** (iPadOS 17, Safari)

---

## 15. Success Criteria for Phase 4 (QA Gate)

### Quality Gate Review Checklist

| Criteria | Target | Measured | Pass? |
|----------|--------|----------|-------|
| Unit test coverage | ≥80% | _% | ⬜ |
| Component test coverage | ≥70% | _% | ⬜ |
| All unit/integration tests passing | 100% | _% | ⬜ |
| E2E tests passing (Chromium) | 100% | _% | ⬜ |
| E2E tests passing (Firefox) | 100% | _% | ⬜ |
| E2E tests passing (WebKit) | 100% | _% | ⬜ |
| Lighthouse Accessibility score | ≥90 | _ | ⬜ |
| Lighthouse Performance score | ≥90 | _ | ⬜ |
| Core Web Vitals (LCP) | <3s | _s | ⬜ |
| Core Web Vitals (FID) | <100ms | _ms | ⬜ |
| Core Web Vitals (CLS) | <0.1 | _ | ⬜ |
| Bundle size (gzipped) | <512KB | _KB | ⬜ |
| TypeScript errors | 0 | _ | ⬜ |
| ESLint errors | 0 | _ | ⬜ |
| axe-core critical violations | 0 | _ | ⬜ |
| Manual screen reader test | Pass | _ | ⬜ |
| Manual device test (iOS) | Pass | _ | ⬜ |
| Manual device test (Android) | Pass | _ | ⬜ |
| Visual regression review | Approved | _ | ⬜ |

### Gate Decision

- **PASS**: All critical criteria met, no critical/high bugs, ready to deploy
- **CONDITIONAL PASS**: Minor issues found, documented as known issues, deploy with action items
- **FAIL**: Critical criteria not met or critical bugs found, block deployment

---

## Appendix A: Test Data Completeness Tests

Ensure production data has all required fields:

```typescript
// src/data/agents.test.ts
import { agents } from './agents';
import type { Agent } from '@/types';

describe('Agent Data Completeness', () => {
  it('should have exactly 11 agents', () => {
    expect(agents).toHaveLength(11);
  });

  it('should have 3 Discovery agents', () => {
    const discoveryAgents = agents.filter(a => a.category === 'discovery');
    expect(discoveryAgents).toHaveLength(3);
  });

  // Similar tests for other categories...

  it('all agents should have required fields', () => {
    agents.forEach(agent => {
      expect(agent.id).toBeTruthy();
      expect(agent.name).toBeTruthy();
      expect(agent.category).toBeTruthy();
      expect(agent.description).toBeTruthy();
      expect(agent.capabilities).toBeInstanceOf(Array);
      expect(agent.capabilities.length).toBeGreaterThan(0);
      expect(agent.exampleInputs).toBeInstanceOf(Array);
      expect(agent.exampleOutputs).toBeInstanceOf(Array);
      expect(agent.phaseParticipation).toBeInstanceOf(Array);
      expect(agent.relatedAgents).toBeInstanceOf(Array);
    });
  });

  it('all agent IDs should be unique', () => {
    const ids = agents.map(a => a.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all related agent IDs should reference existing agents', () => {
    const allIds = new Set(agents.map(a => a.id));
    agents.forEach(agent => {
      agent.relatedAgents.forEach(relatedId => {
        expect(allIds.has(relatedId)).toBe(true);
      });
    });
  });
});
```

---

## Appendix B: Configuration Files

### Vitest Config (`vitest.config.ts`)

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/*.stories.tsx',
        'src/main.tsx',
        'vite.config.ts',
      ],
      lines: 80,
      functions: 75,
      branches: 75,
      statements: 80,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Playwright Config (`playwright.config.ts`)

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 2,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'tablet',
      use: { ...devices['iPad Pro'] },
    },
  ],
  webServer: {
    command: 'pnpm preview',
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
});
```

### Lighthouse CI Config (`lighthouserc.js`)

```javascript
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/agents',
        'http://localhost:4173/agents/product-owner',
        'http://localhost:4173/lifecycle',
        'http://localhost:4173/lifecycle/discovery',
        'http://localhost:4173/examples',
        'http://localhost:4173/examples/ecommerce-feature',
        'http://localhost:4173/interactive',
      ],
      numberOfRuns: 3,
      settings: {
        throttling: {
          cpuSlowdownMultiplier: 4,
          rttMs: 150,
          throughputKbps: 1638.4,
        },
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 500 }],
        'uses-responsive-images': 'warn',
        'offscreen-images': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

---

## Appendix C: Test Utilities

### Custom Render with Router (`src/test/helpers/renderWithRouter.tsx`)

```typescript
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

export function renderWithRouter(
  ui: React.ReactElement,
  options?: RenderOptions
) {
  return render(<BrowserRouter>{ui}</BrowserRouter>, options);
}
```

### Mock Intersection Observer (`src/test/helpers/mockIntersectionObserver.ts`)

```typescript
export function mockIntersectionObserver() {
  global.IntersectionObserver = class IntersectionObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  } as any;
}
```

---

**END OF TEST STRATEGY**

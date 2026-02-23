# Virtual Team Demo App

![Virtual Team Demo](https://img.shields.io/badge/Live%20Demo-Virtual%20Team-00f5ff?style=for-the-badge)

**Live Demo:** [https://tjscooper.github.io/virtual-team-planner/](https://tjscooper.github.io/virtual-team-planner/)

## Overview

An interactive web application showcasing a virtual team orchestration system with 12 AI agent roles collaborating across a 5-phase software delivery lifecycle (Discovery, Design, Implementation, QA, Compliance). This demo illustrates how multi-agent AI systems can scale beyond single-agent tools to deliver complete software projects with QMS compliance.

### Key Features

- **12 Specialized AI Agents**: Product Owner, UX Researcher, Stakeholder, Product Manager, Tech Lead, QA Lead, Developer, SDET, QA Tester, Security Lead, QMS Lead, and Compliance Lead
- **5 Lifecycle Phases**: Discovery → Design → Implementation → QA → Compliance
- **Quality Gates**: Enforced checkpoints between phases with pass/fail criteria
- **Example Workflows**: Real-world scenarios showing agent collaboration and quality gate failures/rework
- **QMS Compliance**: Full traceability from requirements to code to tests
- **Dark Mode Liquid Glass UI**: Modern aesthetic with glassmorphic panels and neon accents

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with custom dark mode theme
- **Animation**: Framer Motion
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/tjscooper/virtual-team-planner.git
cd virtual-team-planner

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── types/           # TypeScript type definitions
├── data/            # Static data (agents, phases, workflows)
├── utils/           # Utility functions
├── constants/       # Route and config constants
├── components/      # React components
│   ├── layout/      # Header, Footer, Layout
│   └── shared/      # Button, Card, Badge
├── pages/           # Page components
├── main.tsx         # Entry point
└── App.tsx          # Main app with routing
```

## Key Concepts

### Agents

12 specialized AI roles organized across 5 categories:
- **Discovery Agents** (3): Product Owner, UX Researcher, Stakeholder
- **Design Agents** (3): Product Manager, Tech Lead, QA Lead
- **Implementation Agents** (2): Developer, SDET Automation
- **QA Agents** (2): QA Tester, Security Lead
- **Compliance Agents** (2): QMS Lead, Compliance Lead

### Phases

Five sequential stages with quality gates:
1. **Discovery**: Requirements gathering and user research
2. **Design**: Architecture and test strategy
3. **Implementation**: Coding and automated testing
4. **QA**: Manual testing and security validation
5. **Compliance**: Documentation and regulatory approval

### Quality Gates

Checkpoints between phases that enforce quality criteria. Failed gates trigger rework loops where agents fix issues before re-evaluation.

## Known Limitations

This is an MVP/alpha release. The following features are planned but not yet implemented:

- **Agent filter/search**: The agent directory does not yet support filtering by category or searching by keyword
- **Workflow step navigation**: Workflow walkthroughs display all steps at once rather than step-by-step with Previous/Next controls
- **Agent flow diagram**: The interactive React Flow visualization of agent handoffs between phases is not yet integrated
- **Interactive explorer**: The agent capability simulator is a placeholder ("Coming Soon")
- **Accessibility**: WCAG 2.1 AA compliance is in progress — ARIA labels and screen reader testing are being added
- **Animations**: Framer Motion page transitions and phase timeline animations are not yet active
- **Glossary search**: The glossary page does not yet support filtering terms
- **Breadcrumb navigation**: Detail pages use back links instead of breadcrumbs

These will be addressed in upcoming sprints. Contributions are welcome.

## Deployment

The app is automatically deployed to GitHub Pages via GitHub Actions on every push to the main branch.

### Manual Deployment

```bash
pnpm build
# Deploy dist/ folder to GitHub Pages
```

## Development

```bash
# Run linter
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgements

- Built with [React](https://react.dev/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Deployed on [GitHub Pages](https://pages.github.com/)

---

**"The only AI development platform that thinks like a team, not a tool."**

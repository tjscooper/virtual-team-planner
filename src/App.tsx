import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter basename="/virtual-team-planner">
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
    </BrowserRouter>
  );
}

export default App;

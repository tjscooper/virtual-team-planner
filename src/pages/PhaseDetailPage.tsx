import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getPhaseById, getAgentById, getNextPhase, getPreviousPhase } from '../data';
import { Card, Badge, Button } from '../components/shared';

export function PhaseDetailPage() {
  const { phaseId } = useParams<{ phaseId: string }>();
  const phase = phaseId ? getPhaseById(phaseId) : undefined;

  if (!phase) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-pixel mb-4">Phase Not Found</h1>
        <Link to="/lifecycle">
          <Button>Back to Lifecycle</Button>
        </Link>
      </div>
    );
  }

  const nextPhase = getNextPhase(phase.id);
  const prevPhase = getPreviousPhase(phase.id);
  const participatingAgentObjects = phase.participatingAgents
    .map((id) => getAgentById(id))
    .filter((a): a is NonNullable<typeof a> => a !== undefined);

  return (
    <div className="space-y-8">
      <Link to="/lifecycle" className="inline-flex items-center text-areas hover:underline">
        <ArrowLeft size={16} className="mr-2" />
        Back to Lifecycle
      </Link>

      <Card className={`border-l-4 border-${phase.color}`}>
        <div className="flex items-start space-x-6 mb-6">
          <div className={`text-4xl font-pixel text-${phase.color}`}>{phase.order}</div>
          <div className="flex-1">
            <h1 className="text-3xl font-pixel mb-2">{phase.name}</h1>
            <p className="text-gray-400">{phase.durationEstimate}</p>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Objectives</h2>
            <ul className="space-y-2">
              {phase.objectives.map((objective, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-areas mr-2">•</span>
                  <span className="text-gray-300">{objective}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Deliverables</h2>
            <ul className="space-y-2">
              {phase.deliverables.map((deliverable, index) => (
                <li key={index} className="glass-panel p-3 text-sm text-gray-400">
                  {deliverable}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Quality Gate Criteria</h2>
            <ul className="space-y-2">
              {phase.qualityGateCriteria.map((criteria, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-compliance mr-2">✓</span>
                  <span className="text-gray-300">{criteria}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Participating Agents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {participatingAgentObjects.map((agent) => (
                <Link key={agent.id} to={`/agents/${agent.id}`}>
                  <Card hover className="flex items-center space-x-3">
                    <div className="flex-1">
                      <div className="font-semibold">{agent.name}</div>
                      <Badge variant={agent.category}>{agent.category}</Badge>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Card>

      <div className="flex justify-between">
        {prevPhase ? (
          <Link to={`/lifecycle/${prevPhase.id}`}>
            <Button variant="ghost">
              <ArrowLeft className="mr-2" size={16} />
              Previous: {prevPhase.name}
            </Button>
          </Link>
        ) : (
          <div />
        )}
        {nextPhase && (
          <Link to={`/lifecycle/${nextPhase.id}`}>
            <Button variant="ghost">
              Next: {nextPhase.name}
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

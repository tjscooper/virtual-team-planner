import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { getWorkflowById, getAgentById, getPhaseById } from '../data';
import { Card, Badge, Button } from '../components/shared';

export function WorkflowDetailPage() {
  const { workflowId } = useParams<{ workflowId: string }>();
  const workflow = workflowId ? getWorkflowById(workflowId) : undefined;

  if (!workflow) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-pixel mb-4">Workflow Not Found</h1>
        <Link to="/examples">
          <Button>Back to Examples</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link to="/examples" className="inline-flex items-center text-areas hover:underline">
        <ArrowLeft size={16} className="mr-2" />
        Back to Examples
      </Link>

      <Card>
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-pixel mb-3">{workflow.name}</h1>
            <p className="text-gray-400">{workflow.industry}</p>
          </div>
          <Badge>{workflow.complexity}</Badge>
        </div>

        <p className="text-lg text-gray-300 mb-8">{workflow.description}</p>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Workflow Steps</h2>

          {workflow.steps.map((step, index) => {
            const phase = getPhaseById(step.phase);
            const stepAgents = step.activeAgents.map((id) => getAgentById(id));

            return (
              <div key={step.id} className="glass-panel p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xl font-pixel text-areas">
                        Step {index + 1}
                      </span>
                      {phase && (
                        <Badge variant={phase.id as any}>{phase.name}</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-400 mb-3">
                      Agents: {stepAgents.filter((a) => a).map((a) => a?.name).join(', ')}
                    </div>
                  </div>
                  <div>
                    {step.qualityCheck.passed ? (
                      <CheckCircle2 className="w-6 h-6 text-compliance" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Agent Reasoning</h4>
                  <p className="text-sm text-gray-400">{step.agentReasoning}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Quality Check</h4>
                  <p
                    className={`text-sm ${
                      step.qualityCheck.passed ? 'text-compliance' : 'text-red-400'
                    }`}
                  >
                    {step.qualityCheck.passed ? 'PASSED' : 'FAILED'}: {step.qualityCheck.feedback}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as Icons from 'lucide-react';
import { getAgentById } from '../data';
import { Card, Badge, Button } from '../components/shared';
import { getCategoryBorderClass } from '../utils/categoryColors';
import { cn } from '../utils';

export function AgentDetailPage() {
  const { agentId } = useParams<{ agentId: string }>();
  const agent = agentId ? getAgentById(agentId) : undefined;

  if (!agent) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-pixel mb-4">Agent Not Found</h1>
        <Link to="/agents">
          <Button>Back to Agents</Button>
        </Link>
      </div>
    );
  }

  const IconComponent = (Icons as any)[agent.icon] || Icons.User;
  const relatedAgentObjects = agent.relatedAgents
    .map((id) => getAgentById(id))
    .filter((a): a is NonNullable<typeof a> => a !== undefined);

  return (
    <div className="space-y-8">
      <Link to="/agents" className="inline-flex items-center text-areas hover:underline">
        <ArrowLeft size={16} className="mr-2" />
        Back to Agents
      </Link>

      <Card className={cn('border-l-4', getCategoryBorderClass(agent.category))}>
        <div className="flex items-start space-x-6 mb-6">
          <div className="flex-shrink-0">
            <IconComponent className="w-16 h-16 text-areas" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-pixel mb-3">{agent.name}</h1>
            <Badge variant={agent.category}>{agent.category}</Badge>
          </div>
        </div>

        <p className="text-lg text-gray-300 mb-8">{agent.description}</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Key Capabilities</h2>
            <ul className="space-y-2">
              {agent.capabilities.map((capability, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-areas mr-2">•</span>
                  <span className="text-gray-300">{capability}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Example Inputs</h2>
            <ul className="space-y-2">
              {agent.exampleInputs.map((input, index) => (
                <li key={index} className="glass-panel p-3 text-sm text-gray-400">
                  {input}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Phase Participation</h2>
            <div className="flex flex-wrap gap-2">
              {agent.phaseParticipation.map((phaseId) => (
                <Link key={phaseId} to={`/lifecycle/${phaseId}`}>
                  <Badge className="cursor-pointer hover:scale-105 transition-transform">
                    {phaseId}
                  </Badge>
                </Link>
              ))}
            </div>
          </section>

          {relatedAgentObjects.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Related Agents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedAgentObjects.map((relatedAgent) => {
                  const RelatedIcon = (Icons as any)[relatedAgent.icon] || Icons.User;
                  return (
                    <Link key={relatedAgent.id} to={`/agents/${relatedAgent.id}`}>
                      <Card hover className="flex items-center space-x-3">
                        <RelatedIcon className="w-8 h-8 text-areas flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{relatedAgent.name}</div>
                          <div className="text-sm text-gray-400 truncate">
                            {relatedAgent.category}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </Card>
    </div>
  );
}

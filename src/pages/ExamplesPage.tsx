import { Link } from 'react-router-dom';
import { workflows } from '../data';
import { Card, Badge } from '../components/shared';

export function ExamplesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-pixel text-gradient-cyan-magenta mb-4">Example Workflows</h1>
        <p className="text-lg text-gray-300">
          Real-world examples showing how agents collaborate across the full lifecycle.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <Link key={workflow.id} to={`/examples/${workflow.id}`}>
            <Card hover className="h-full">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold flex-1">{workflow.name}</h2>
                <Badge>{workflow.complexity}</Badge>
              </div>

              <p className="text-gray-300 mb-4">{workflow.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Industry:</span>
                  <span className="text-gray-300">{workflow.industry}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Steps:</span>
                  <span className="text-gray-300">{workflow.steps.length}</span>
                </div>
              </div>

              <div className="mt-4 text-sm text-areas">View Workflow →</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

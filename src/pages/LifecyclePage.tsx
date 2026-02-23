import { Link } from 'react-router-dom';
import { phases } from '../data';
import { Card } from '../components/shared';

export function LifecyclePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-pixel text-gradient-cyan-magenta mb-4">
          Software Delivery Lifecycle
        </h1>
        <p className="text-lg text-gray-300">
          Five phases from discovery to compliance, each with quality gates ensuring excellence.
        </p>
      </div>

      <div className="space-y-6">
        {phases.map((phase) => (
          <Link key={phase.id} to={`/lifecycle/${phase.id}`}>
            <Card hover className={`border-l-4 border-${phase.color}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`text-3xl font-pixel text-${phase.color}`}>{phase.order}</div>
                  <div>
                    <h2 className="text-2xl font-semibold">{phase.name}</h2>
                    <p className="text-sm text-gray-400">{phase.durationEstimate}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2">Key Objectives</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phase.objectives.slice(0, 4).map((objective, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-areas mr-2">•</span>
                        <span className="text-gray-400">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    {phase.participatingAgents.length} agents participating
                  </span>
                  <span className="text-areas">View Details →</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

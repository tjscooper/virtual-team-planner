import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { agents } from '../data';
import { Card, Badge } from '../components/shared';
import { getCategoryBorderClass } from '../utils/categoryColors';
import { cn } from '../utils';

export function AgentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-pixel text-gradient-cyan-magenta mb-4">Agent Directory</h1>
        <p className="text-lg text-gray-300">
          Meet the 11 specialized AI agents that power the Virtual Team platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const IconComponent = (Icons as any)[agent.icon] || Icons.User;

          return (
            <Link key={agent.id} to={`/agents/${agent.id}`}>
              <Card
                hover
                className={cn('h-full border-l-4', getCategoryBorderClass(agent.category))}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <IconComponent className="w-10 h-10 text-areas" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                    <Badge variant={agent.category}>{agent.category}</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-400 line-clamp-3">{agent.description}</p>
                <div className="mt-4 text-sm text-areas">View Details →</div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

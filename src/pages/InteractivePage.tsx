import { Card } from '../components/shared';

export function InteractivePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-pixel text-gradient-cyan-magenta mb-4">
          Interactive Explorer
        </h1>
        <p className="text-lg text-gray-300">
          Experiment with agent capabilities and compare their outputs.
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">
            Interactive agent simulation coming soon. This feature will allow you to:
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2 text-gray-400">
            <li>• Select an agent and scenario</li>
            <li>• Run simulated agent outputs</li>
            <li>• Compare multiple agents side-by-side</li>
            <li>• Explore different workflow configurations</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

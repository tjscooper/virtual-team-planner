import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { glossaryTerms } from '../data';
import { Card } from '../components/shared';

export function GlossaryPage() {
  return (
    <div className="space-y-8">
      <Link to="/resources" className="inline-flex items-center text-areas hover:underline">
        <ArrowLeft size={16} className="mr-2" />
        Back to Resources
      </Link>

      <div>
        <h1 className="text-4xl font-pixel text-gradient-cyan-magenta mb-4">Glossary</h1>
        <p className="text-lg text-gray-300">
          Key terms and concepts in the Virtual Team platform.
        </p>
      </div>

      <div className="space-y-6">
        {glossaryTerms.map((term) => (
          <Card key={term.id}>
            <h2 className="text-xl font-semibold text-areas mb-2">{term.term}</h2>
            <p className="text-gray-300">{term.definition}</p>
            {term.relatedTerms.length > 0 && (
              <div className="mt-4 text-sm text-gray-400">
                Related: {term.relatedTerms.join(', ')}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

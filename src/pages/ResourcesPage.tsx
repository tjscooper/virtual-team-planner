import { Link } from 'react-router-dom';
import { Book, HelpCircle } from 'lucide-react';
import { Card } from '../components/shared';
import { faqItems } from '../data';

export function ResourcesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-pixel text-gradient-cyan-magenta mb-4">Resources</h1>
        <p className="text-lg text-gray-300">
          Learn about the Virtual Team platform, terminology, and frequently asked questions.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/resources/glossary">
          <Card hover className="h-full">
            <Book className="w-12 h-12 text-areas mb-4" />
            <h2 className="text-xl font-semibold mb-2">Glossary</h2>
            <p className="text-gray-400">
              Understand key terminology like agents, artifacts, quality gates, and phases.
            </p>
          </Card>
        </Link>

        <Card>
          <HelpCircle className="w-12 h-12 text-projects mb-4" />
          <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-400 mb-4">Quick answers to common questions.</p>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
        <div className="space-y-4">
          {faqItems.map((item) => (
            <Card key={item.id}>
              <h3 className="text-lg font-semibold mb-2 text-areas">{item.question}</h3>
              <p className="text-gray-400">{item.answer}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

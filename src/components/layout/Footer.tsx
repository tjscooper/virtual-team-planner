import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

export function Footer() {
  return (
    <footer className="glass-panel border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-pixel text-areas mb-4">Virtual Team</h3>
            <p className="text-sm text-gray-400">
              The only AI development platform that thinks like a team, not a tool.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.AGENTS} className="text-sm text-gray-400 hover:text-areas transition-colors">
                  Agents
                </Link>
              </li>
              <li>
                <Link to={ROUTES.LIFECYCLE} className="text-sm text-gray-400 hover:text-areas transition-colors">
                  Lifecycle
                </Link>
              </li>
              <li>
                <Link to={ROUTES.GLOSSARY} className="text-sm text-gray-400 hover:text-areas transition-colors">
                  Glossary
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <a
              href="https://github.com/tjscooper/virtual-team-planner"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-areas transition-colors"
            >
              <Github size={16} />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-gray-500">
            © 2026 Virtual Team Demo. Built with React + TypeScript + TailwindCSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

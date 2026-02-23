import { Link } from 'react-router-dom';
import { ArrowRight, Users, GitBranch, Shield } from 'lucide-react';
import { Button } from '../components/shared';
import { ROUTES } from '../constants';
import { agents, phases, workflows } from '../data';

export function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-pixel text-gradient-cyan-magenta mb-6">
          Think Like a Team,
          <br />
          Not a Tool
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
          The only AI development platform that orchestrates 12 specialized agents across 5
          lifecycle phases with QMS compliance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={ROUTES.AGENTS}>
            <Button size="lg" variant="primary">
              Explore Agents
              <ArrowRight className="ml-2 inline" size={20} />
            </Button>
          </Link>
          <Link to={ROUTES.EXAMPLES}>
            <Button size="lg" variant="secondary">
              View Examples
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-6 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-areas" />
          <div className="text-4xl font-pixel text-areas mb-2">{agents.length}</div>
          <div className="text-sm text-gray-400">Specialized AI Agents</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <GitBranch className="w-12 h-12 mx-auto mb-4 text-projects" />
          <div className="text-4xl font-pixel text-projects mb-2">{phases.length}</div>
          <div className="text-sm text-gray-400">Lifecycle Phases</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-compliance" />
          <div className="text-4xl font-pixel text-compliance mb-2">100%</div>
          <div className="text-sm text-gray-400">QMS Compliant</div>
        </div>
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-3xl font-pixel text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6">
            <div className="text-2xl font-pixel text-areas mb-3">1. Discovery</div>
            <p className="text-sm text-gray-400">
              Product Owner, UX Researcher, and Stakeholder gather requirements and create user
              stories.
            </p>
          </div>
          <div className="glass-panel p-6">
            <div className="text-2xl font-pixel text-projects mb-3">2. Design</div>
            <p className="text-sm text-gray-400">
              Tech Lead architects the solution. QA Lead defines test strategy and quality gates.
            </p>
          </div>
          <div className="glass-panel p-6">
            <div className="text-2xl font-pixel text-resources mb-3">3. Implement</div>
            <p className="text-sm text-gray-400">
              Developer writes code. SDET creates automated tests. Code reviews ensure quality.
            </p>
          </div>
          <div className="glass-panel p-6">
            <div className="text-2xl font-pixel text-qa mb-3">4. Test & Ship</div>
            <p className="text-sm text-gray-400">
              QA Tester and Security Lead validate. QMS Lead ensures documentation. Compliance Lead
              approves.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Workflow */}
      <section>
        <h2 className="text-3xl font-pixel text-center mb-8">Featured Example</h2>
        {workflows[0] && (
          <Link to={`/examples/${workflows[0].id}`}>
            <div className="glass-panel-hover p-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{workflows[0].name}</h3>
                <span className="text-sm text-gray-400">{workflows[0].complexity} complexity</span>
              </div>
              <p className="text-gray-300 mb-4">{workflows[0].description}</p>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{workflows[0].steps.length} steps</span>
                <span className="text-areas">View Workflow →</span>
              </div>
            </div>
          </Link>
        )}
      </section>
    </div>
  );
}

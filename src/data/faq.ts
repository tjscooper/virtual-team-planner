import { FAQItem } from '../types';

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Are these AI agents or real people?',
    answer:
      'These are AI-powered agents, not human contractors. Each agent is a specialized AI role designed to handle specific tasks in the software delivery lifecycle, similar to how you might work with different team members in a traditional setup.',
    category: 'General',
  },
  {
    id: 'faq-2',
    question: 'How is this different from GitHub Copilot or Cursor AI?',
    answer:
      'While tools like Copilot assist with code completion, Virtual Team orchestrates multiple specialized agents across the entire software lifecycle (requirements, architecture, testing, compliance). It\'s a multi-agent system with quality gates, not a single coding assistant.',
    category: 'General',
  },
  {
    id: 'faq-3',
    question: 'What does "QMS compliant" mean?',
    answer:
      'QMS (Quality Management System) compliance means the system maintains audit trails, traceability between requirements and code, and documentation standards required in regulated industries like medical devices and fintech.',
    category: 'Compliance',
  },
  {
    id: 'faq-4',
    question: 'What happens when a quality gate fails?',
    answer:
      'When a quality gate fails (e.g., tests fail, security scan finds vulnerabilities), the workflow enters a rework loop. The relevant agents fix the issues, and the gate is re-evaluated before progressing to the next phase.',
    category: 'Process',
  },
  {
    id: 'faq-5',
    question: 'Can I customize which agents participate in my workflow?',
    answer:
      'Yes (in the full product, not this demo). You can select which phases and agents to include based on your project needs. For example, early-stage products might skip compliance agents, while fintech products require them.',
    category: 'Features',
  },
];

export function getFAQItemsByCategory(category: string): FAQItem[] {
  return faqItems.filter((item) => item.category === category);
}

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge component', () => {
  describe('rendering', () => {
    it('should render with text content', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('should have default badge styles', () => {
      const { container } = render(<Badge>Default</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass(
        'inline-flex',
        'items-center',
        'px-3',
        'py-1',
        'rounded-full',
        'text-xs',
        'font-semibold'
      );
    });

    it('should have glassmorphic background', () => {
      const { container } = render(<Badge>Glass</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-white/10', 'border', 'border-white/20');
    });

    it('should apply custom className', () => {
      const { container } = render(<Badge className="custom-class">Custom</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('custom-class');
    });
  });

  describe('variants', () => {
    it('should render default variant with gray text', () => {
      const { container } = render(<Badge variant="default">Default</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('text-gray-300');
    });

    it('should render discovery variant with areas color', () => {
      const { container } = render(<Badge variant="discovery">Discovery</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('text-areas');
    });

    it('should render design variant with projects color', () => {
      const { container } = render(<Badge variant="design">Design</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('text-projects');
    });

    it('should render implementation variant with resources color', () => {
      const { container } = render(<Badge variant="implementation">Implementation</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('text-resources');
    });

    it('should render qa variant with qa color', () => {
      const { container } = render(<Badge variant="qa">QA</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('text-qa');
    });

    it('should render compliance variant with compliance color', () => {
      const { container } = render(<Badge variant="compliance">Compliance</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('text-compliance');
    });
  });

  describe('HTML attributes', () => {
    it('should support data attributes', () => {
      render(<Badge data-testid="custom-badge">Test</Badge>);
      expect(screen.getByTestId('custom-badge')).toBeInTheDocument();
    });

    it('should support id attribute', () => {
      const { container } = render(<Badge id="my-badge">ID</Badge>);
      expect(container.querySelector('#my-badge')).toBeInTheDocument();
    });

    it('should support onClick handler', () => {
      const { container } = render(<Badge onClick={() => {}}>Clickable</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.onclick).toBeDefined();
    });
  });

  describe('content', () => {
    it('should render text content', () => {
      render(<Badge>Simple text</Badge>);
      expect(screen.getByText('Simple text')).toBeInTheDocument();
    });

    it('should render with numbers', () => {
      render(<Badge>42</Badge>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('should render with uppercase text', () => {
      render(<Badge>UPPERCASE</Badge>);
      expect(screen.getByText('UPPERCASE')).toBeInTheDocument();
    });
  });
});

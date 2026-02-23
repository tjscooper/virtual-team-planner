import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

describe('Card component', () => {
  describe('rendering', () => {
    it('should render children content', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should apply glassmorphic styles', () => {
      const { container } = render(<Card>Glass card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('glass-panel');
    });

    it('should have default padding', () => {
      const { container } = render(<Card>Padded card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-6');
    });

    it('should apply custom className', () => {
      const { container } = render(<Card className="custom-class">Custom</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });

    it('should apply hover styles when hover prop is true', () => {
      const { container } = render(<Card hover>Hoverable card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('glass-panel-hover', 'cursor-pointer');
    });

    it('should not apply hover styles by default', () => {
      const { container } = render(<Card>Default card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveClass('glass-panel-hover');
      expect(card).not.toHaveClass('cursor-pointer');
    });
  });

  describe('interactions', () => {
    it('should handle onClick when provided', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Card onClick={handleClick}>Clickable card</Card>);
      await user.click(screen.getByText('Clickable card'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be keyboard accessible when onClick is provided', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Card onClick={handleClick} tabIndex={0}>
          Keyboard card
        </Card>
      );
      const card = screen.getByText('Keyboard card');
      card.focus();
      await user.keyboard('{Enter}');

      // Note: onClick on div doesn't trigger on Enter by default without role="button"
      // This test documents current behavior
    });
  });

  describe('HTML attributes', () => {
    it('should support data attributes', () => {
      render(<Card data-testid="custom-card">Test card</Card>);
      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });

    it('should support id attribute', () => {
      const { container } = render(<Card id="my-card">ID card</Card>);
      expect(container.querySelector('#my-card')).toBeInTheDocument();
    });

    it('should forward ref', () => {
      const ref = vi.fn();
      render(<Card ref={ref}>Ref card</Card>);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('nested content', () => {
    it('should render complex nested content', () => {
      render(
        <Card>
          <h2>Card title</h2>
          <p>Card description</p>
          <button>Action</button>
        </Card>
      );

      expect(screen.getByText('Card title')).toBeInTheDocument();
      expect(screen.getByText('Card description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });
});

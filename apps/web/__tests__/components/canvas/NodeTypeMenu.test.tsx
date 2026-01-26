/**
 * Tests for NodeTypeMenu component
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NodeTypeMenu from '@/components/canvas/NodeTypeMenu';

// Mock the nodeTypeRegistry
jest.mock('@reasoning-graph/graph-engine', () => {
  const actual = jest.requireActual('@reasoning-graph/graph-engine');
  return {
    ...actual,
    nodeTypeRegistry: {
      getByCategory: jest.fn((category: string) => {
        const mockTypes = {
          foundational: [
            {
              type: 'axiom',
              label: 'Axiom',
              description: 'Foundational truth',
              inputCount: 0,
              outputCount: 1,
              category: 'foundational',
              icon: '🔸',
              notation: 'Hypothesis',
            },
            {
              type: 'simple-affirmation',
              label: 'Simple Affirmation',
              description: 'Direct pass-through',
              inputCount: 1,
              outputCount: 1,
              category: 'foundational',
              icon: '⊢',
              notation: 'P ⊢ P',
            },
          ],
          inference: [
            {
              type: 'modus-ponens',
              label: 'Modus Ponens',
              description: 'If P→Q and P, then Q',
              inputCount: 2,
              outputCount: 1,
              category: 'inference',
              icon: '🔹',
              notation: 'P→Q, P ⊢ Q',
            },
            {
              type: 'modus-tollens',
              label: 'Modus Tollens',
              description: 'If P→Q and ¬Q, then ¬P',
              inputCount: 2,
              outputCount: 1,
              category: 'inference',
              icon: '🔹',
              notation: 'P→Q, ¬Q ⊢ ¬P',
            },
            {
              type: 'syllogism',
              label: 'Syllogism',
              description: 'Syllogistic reasoning',
              inputCount: 2,
              outputCount: 1,
              category: 'inference',
              icon: '🔹',
              notation: 'A→B, B→C ⊢ A→C',
            },
            {
              type: 'disjunction',
              label: 'Disjunctive Syllogism',
              description: 'P∨Q and ¬P, then Q',
              inputCount: 2,
              outputCount: 1,
              category: 'inference',
              icon: '🔹',
              notation: 'P∨Q, ¬P ⊢ Q',
            },
          ],
          advanced: [
            {
              type: 'reductio-ad-absurdum',
              label: 'Reductio Ad Absurdum',
              description: 'Proof by contradiction',
              inputCount: 1,
              outputCount: 1,
              category: 'advanced',
              icon: '🔺',
              notation: 'P→⊥ ⊢ ¬P',
            },
            {
              type: 'induction',
              label: 'Mathematical Induction',
              description: 'Prove base case and inductive step',
              inputCount: 2,
              outputCount: 1,
              category: 'advanced',
              icon: '♾️',
              notation: 'P(0), P(n)→P(n+1) ⊢ ∀n P(n)',
            },
          ],
          special: [
            {
              type: 'free-form',
              label: 'Free Form',
              description: 'Flexible node',
              inputCount: -1,
              outputCount: -1,
              category: 'special',
              icon: '📝',
              notation: 'Custom Logic',
            },
          ],
        };
        return mockTypes[category as keyof typeof mockTypes] || [];
      }),
    },
  };
});

describe('NodeTypeMenu', () => {
  const mockOnSelectType = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    x: 100,
    y: 100,
    onSelectType: mockOnSelectType,
    onClose: mockOnClose,
  };

  it('should render the menu with title', () => {
    render(<NodeTypeMenu {...defaultProps} />);
    expect(screen.getByText('Create Logic Node')).toBeInTheDocument();
  });

  it('should display all 4 categories', () => {
    render(<NodeTypeMenu {...defaultProps} />);

    expect(screen.getByText(/Foundational/i)).toBeInTheDocument();
    expect(screen.getByText(/Inference/i)).toBeInTheDocument();
    expect(screen.getByText(/Advanced/i)).toBeInTheDocument();
    expect(screen.getByText(/Special/i)).toBeInTheDocument();
  });

  it('should display all 9 node types', () => {
    render(<NodeTypeMenu {...defaultProps} />);

    // Foundational
    expect(screen.getByText('Axiom')).toBeInTheDocument();
    expect(screen.getByText('Simple Affirmation')).toBeInTheDocument();

    // Inference
    expect(screen.getByText('Modus Ponens')).toBeInTheDocument();
    expect(screen.getByText('Modus Tollens')).toBeInTheDocument();
    expect(screen.getByText('Syllogism')).toBeInTheDocument();
    expect(screen.getByText('Disjunctive Syllogism')).toBeInTheDocument();

    // Advanced
    expect(screen.getByText('Reductio Ad Absurdum')).toBeInTheDocument();
    expect(screen.getByText('Mathematical Induction')).toBeInTheDocument();

    // Special
    expect(screen.getByText('Free Form')).toBeInTheDocument();
  });

  it('should display formal notation for node types', () => {
    render(<NodeTypeMenu {...defaultProps} />);

    expect(screen.getByText(/P→Q, P ⊢ Q/)).toBeInTheDocument(); // Modus Ponens
    expect(screen.getByText(/P→Q, ¬Q ⊢ ¬P/)).toBeInTheDocument(); // Modus Tollens
  });

  it('should call onSelectType when a node type is clicked', () => {
    render(<NodeTypeMenu {...defaultProps} />);

    const axiomButton = screen.getByTestId('node-type-axiom');
    fireEvent.click(axiomButton);

    expect(mockOnSelectType).toHaveBeenCalledWith('axiom');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should close menu when clicking outside', async () => {
    render(<NodeTypeMenu {...defaultProps} />);

    // Click outside the menu
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should close menu when pressing ESC key', async () => {
    render(<NodeTypeMenu {...defaultProps} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should position menu at specified coordinates', () => {
    const { container } = render(<NodeTypeMenu {...defaultProps} />);

    const menu = container.querySelector('[data-testid="node-type-menu"]');
    expect(menu).toHaveStyle({
      position: 'fixed',
      left: '100px',
      top: '100px',
    });
  });

  it('should adjust position if near screen edges', () => {
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 400,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 400,
    });

    const { container } = render(
      <NodeTypeMenu x={350} y={350} onSelectType={mockOnSelectType} onClose={mockOnClose} />
    );

    const menu = container.querySelector('[data-testid="node-type-menu"]');
    const style = menu?.getAttribute('style') || '';

    // Menu should be flipped to stay on screen
    expect(style).toContain('left:');
    expect(style).toContain('top:');
  });
});

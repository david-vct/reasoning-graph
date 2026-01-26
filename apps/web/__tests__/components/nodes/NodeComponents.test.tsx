/**
 * Tests for Logic Node Components
 * Tests rendering, handle positioning, and formal notation display
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReactFlowProvider } from 'reactflow';
import { AxiomNode } from '@/components/nodes/AxiomNode';
import { ModusPonensNode } from '@/components/nodes/ModusPonensNode';
import { ModusTollensNode } from '@/components/nodes/ModusTollensNode';
import { SyllogismNode } from '@/components/nodes/SyllogismNode';
import { DisjunctionNode } from '@/components/nodes/DisjunctionNode';
import { FreeFormNode } from '@/components/nodes/FreeFormNode';

// Wrapper component to provide React Flow context
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ReactFlowProvider>{children}</ReactFlowProvider>
);

describe('AxiomNode', () => {
  it('renders with formal notation "Axiom"', () => {
    const mockData = {
      conclusion: { id: 'c1', content: '' },
    };

    render(
      <TestWrapper>
        <AxiomNode data={mockData} id="node-1" type="axiom" />
      </TestWrapper>
    );

    // Check for Axiom label and notation
    expect(screen.getAllByText('Axiom').length).toBeGreaterThan(0);
  });

  it('displays placeholder for empty conclusion', () => {
    const mockData = {
      conclusion: { id: 'c1', content: '' },
    };

    render(
      <TestWrapper>
        <AxiomNode data={mockData} id="node-1" type="axiom" />
      </TestWrapper>
    );

    // Check that the placeholder is displayed
    expect(screen.getAllByText('Axiom').length).toBeGreaterThan(0);
  });

  it('has no input handles (premises)', () => {
    const mockData = {
      conclusion: { id: 'c1', content: 'Truth' },
    };

    const { container } = render(
      <TestWrapper>
        <AxiomNode data={mockData} id="node-1" type="axiom" />
      </TestWrapper>
    );

    // Check for handle with type "target" (input)
    const inputHandles = container.querySelectorAll('[data-handlepos="left"]');
    expect(inputHandles.length).toBe(0);
  });

  it('has one output handle', () => {
    const mockData = {
      conclusion: { id: 'c1', content: 'Truth' },
    };

    const { container } = render(
      <TestWrapper>
        <AxiomNode data={mockData} id="node-1" type="axiom" />
      </TestWrapper>
    );

    // Check for handle with type "source" (output)
    const outputHandles = container.querySelectorAll('[data-handlepos="right"]');
    expect(outputHandles.length).toBe(1);
  });
});

describe('ModusPonensNode', () => {
  it('renders with formal notation "P→Q, P ⊢ Q"', () => {
    const mockData = {
      premises: {
        implication: { id: 'p1', content: '' },
        affirmation: { id: 'p2', content: '' },
      },
      conclusion: { id: 'c1', content: '' },
    };

    render(
      <TestWrapper>
        <ModusPonensNode data={mockData} id="node-1" type="modus-ponens" />
      </TestWrapper>
    );

    expect(screen.getByText('P→Q, P ⊢ Q')).toBeInTheDocument();
  });

  it('displays placeholders for empty premises', () => {
    const mockData = {
      premises: {
        implication: { id: 'p1', content: '' },
        affirmation: { id: 'p2', content: '' },
      },
      conclusion: { id: 'c1', content: '' },
    };

    render(
      <TestWrapper>
        <ModusPonensNode data={mockData} id="node-1" type="modus-ponens" />
      </TestWrapper>
    );

    expect(screen.getByText('P→Q')).toBeInTheDocument();
    expect(screen.getByText('P')).toBeInTheDocument();
    expect(screen.getByText('Q')).toBeInTheDocument();
  });

  it('has two input handles for premises', () => {
    const mockData = {
      premises: {
        implication: { id: 'p1', content: 'If A then B' },
        affirmation: { id: 'p2', content: 'A' },
      },
      conclusion: { id: 'c1', content: 'B' },
    };

    const { container } = render(
      <TestWrapper>
        <ModusPonensNode data={mockData} id="node-1" type="modus-ponens" />
      </TestWrapper>
    );

    const inputHandles = container.querySelectorAll('[data-handlepos="left"]');
    expect(inputHandles.length).toBe(2);
  });

  it('has one output handle for conclusion', () => {
    const mockData = {
      premises: {
        implication: { id: 'p1', content: 'If A then B' },
        affirmation: { id: 'p2', content: 'A' },
      },
      conclusion: { id: 'c1', content: 'B' },
    };

    const { container } = render(
      <TestWrapper>
        <ModusPonensNode data={mockData} id="node-1" type="modus-ponens" />
      </TestWrapper>
    );

    const outputHandles = container.querySelectorAll('[data-handlepos="right"]');
    expect(outputHandles.length).toBe(1);
  });
});

describe('ModusTollensNode', () => {
  it('renders with formal notation "P→Q, ¬Q ⊢ ¬P"', () => {
    const mockData = {
      premises: {
        implication: { id: 'p1', content: '' },
        negation: { id: 'p2', content: '' },
      },
      conclusion: { id: 'c1', content: '' },
    };

    render(
      <TestWrapper>
        <ModusTollensNode data={mockData} id="node-1" type="modus-tollens" />
      </TestWrapper>
    );

    expect(screen.getByText('P→Q, ¬Q ⊢ ¬P')).toBeInTheDocument();
  });

  it('displays placeholders with negation symbols', () => {
    const mockData = {
      premises: {
        implication: { id: 'p1', content: '' },
        negation: { id: 'p2', content: '' },
      },
      conclusion: { id: 'c1', content: '' },
    };

    render(
      <TestWrapper>
        <ModusTollensNode data={mockData} id="node-1" type="modus-tollens" />
      </TestWrapper>
    );

    expect(screen.getByText('¬Q')).toBeInTheDocument();
    expect(screen.getByText('¬P')).toBeInTheDocument();
  });
});

describe('SyllogismNode', () => {
  it('renders with label "Syllogism"', () => {
    const mockData = {
      premises: {
        major: { id: 'p1', content: '' },
        minor: { id: 'p2', content: '' },
      },
      conclusion: { id: 'c1', content: '' },
    };

    render(
      <TestWrapper>
        <SyllogismNode data={mockData} id="node-1" type="syllogism" />
      </TestWrapper>
    );

    expect(screen.getAllByText('Syllogism').length).toBeGreaterThan(0);
  });

  it('displays Major and Minor premise placeholders', () => {
    const mockData = {
      premises: {
        major: { id: 'p1', content: '' },
        minor: { id: 'p2', content: '' },
      },
      conclusion: { id: 'c1', content: '' },
    };

    render(
      <TestWrapper>
        <SyllogismNode data={mockData} id="node-1" type="syllogism" />
      </TestWrapper>
    );

    expect(screen.getByText('Major Premise')).toBeInTheDocument();
    expect(screen.getByText('Minor Premise')).toBeInTheDocument();
  });
});

describe('DisjunctionNode', () => {
  it('renders with formal notation "P∨Q, ¬P ⊢ Q"', () => {
    const mockData = {
      premises: {
        disjunction: { id: 'p1', content: '' },
        negation: { id: 'p2', content: '' },
      },
      conclusion: { id: 'c1', content: '' },
    };

    render(
      <TestWrapper>
        <DisjunctionNode data={mockData} id="node-1" type="disjunction" />
      </TestWrapper>
    );

    expect(screen.getByText('P∨Q, ¬P ⊢ Q')).toBeInTheDocument();
  });

  it('displays disjunction symbol in placeholder', () => {
    const mockData = {
      premises: {
        disjunction: { id: 'p1', content: '' },
        negation: { id: 'p2', content: '' },
      },
      conclusion: { id: 'c1', content: '' },
    };

    render(
      <TestWrapper>
        <DisjunctionNode data={mockData} id="node-1" type="disjunction" />
      </TestWrapper>
    );

    expect(screen.getByText('P∨Q')).toBeInTheDocument();
  });
});

describe('FreeFormNode', () => {
  it('renders with label "Free Form"', () => {
    const mockData = {
      premises: [],
      conclusions: [{ id: 'c1', content: '' }],
    };

    render(
      <TestWrapper>
        <FreeFormNode data={mockData} id="node-1" type="free-form" />
      </TestWrapper>
    );

    expect(screen.getAllByText('Free Form').length).toBeGreaterThan(0);
  });

  it('renders dynamic number of input handles', () => {
    const mockData = {
      premises: [
        { id: 'p1', content: 'Input 1' },
        { id: 'p2', content: 'Input 2' },
        { id: 'p3', content: 'Input 3' },
      ],
      conclusions: [{ id: 'c1', content: 'Output' }],
    };

    const { container } = render(
      <TestWrapper>
        <FreeFormNode data={mockData} id="node-1" type="free-form" />
      </TestWrapper>
    );

    const inputHandles = container.querySelectorAll('[data-handlepos="left"]');
    expect(inputHandles.length).toBe(3);
  });

  it('renders dynamic number of output handles', () => {
    const mockData = {
      premises: [{ id: 'p1', content: 'Input' }],
      conclusions: [
        { id: 'c1', content: 'Output 1' },
        { id: 'c2', content: 'Output 2' },
      ],
    };

    const { container } = render(
      <TestWrapper>
        <FreeFormNode data={mockData} id="node-1" type="free-form" />
      </TestWrapper>
    );

    const outputHandles = container.querySelectorAll('[data-handlepos="right"]');
    expect(outputHandles.length).toBe(2);
  });

  it('always shows warning validation state', () => {
    const mockData = {
      premises: [],
      conclusions: [{ id: 'c1', content: '' }],
    };

    const { container } = render(
      <TestWrapper>
        <FreeFormNode data={mockData} id="node-1" type="free-form" />
      </TestWrapper>
    );

    // Free form nodes should have warning border color
    const nodeContainer = container.querySelector('.border-amber-500');
    expect(nodeContainer).toBeInTheDocument();
  });
});

describe('SimpleAffirmationNode', () => {
  it('renders with notation "⊢"', async () => {
    const { SimpleAffirmationNode } = await import('@/components/nodes/SimpleAffirmationNode');
    const mockData = {
      premise: { id: 'p1', content: 'Justification' },
      conclusion: { id: 'c1', content: 'Statement' },
    };

    render(
      <TestWrapper>
        <SimpleAffirmationNode data={mockData} id="node-1" type="simple-affirmation" />
      </TestWrapper>
    );

    expect(screen.getByText('⊢')).toBeInTheDocument();
  });
});

describe('ReductioAdAbsurdumNode', () => {
  it('renders with notation "P→⊥ ⊢ ¬P"', async () => {
    const { ReductioAdAbsurdumNode } = await import('@/components/nodes/ReductioAdAbsurdumNode');
    const mockData = {
      premise: { id: 'p1', content: '' },
      conclusion: { id: 'c1', content: '' },
    };

    render(
      <TestWrapper>
        <ReductioAdAbsurdumNode data={mockData} id="node-1" type="reductio-ad-absurdum" />
      </TestWrapper>
    );

    expect(screen.getByText('P→⊥ ⊢ ¬P')).toBeInTheDocument();
  });
});

describe('InductionNode', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const InductionNode = require('@/components/nodes/InductionNode').InductionNode;

  it('renders base case and inductive step placeholders', () => {
    const mockData = {
      premises: {
        baseCase: { id: 'p1', content: '' },
        inductiveStep: { id: 'p2', content: '' },
      },
      conclusion: { id: 'c1', content: '' },
    };

    render(
      <TestWrapper>
        <InductionNode data={mockData} id="node-1" type="induction" />
      </TestWrapper>
    );

    expect(screen.getByText('Base Case: P(0)')).toBeInTheDocument();
    expect(screen.getByText('Inductive: P(n)→P(n+1)')).toBeInTheDocument();
  });
});

/**
 * Tests for PropositionDisplay Component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { PropositionDisplay } from '@/components/nodes/PropositionDisplay';

describe('PropositionDisplay', () => {
  it('renders with content correctly', () => {
    render(
      <PropositionDisplay
        id="prop-1"
        content="If it rains, the ground is wet"
        placeholder="P→Q"
        isEmpty={false}
        type="premise"
      />
    );

    expect(screen.getByText('If it rains, the ground is wet')).toBeInTheDocument();
  });

  it('displays placeholder when empty', () => {
    render(
      <PropositionDisplay id="prop-2" content="" placeholder="P→Q" isEmpty={true} type="premise" />
    );

    const placeholderElement = screen.getByText('P→Q');
    expect(placeholderElement).toBeInTheDocument();
    expect(placeholderElement).toHaveClass('text-slate-400', 'italic', 'font-mono');
  });

  it('truncates long text with ellipsis', () => {
    const longText = 'a'.repeat(250);
    render(
      <PropositionDisplay
        id="prop-3"
        content={longText}
        placeholder="P"
        isEmpty={false}
        type="conclusion"
        maxLength={200}
      />
    );

    const displayedText = screen.getByText(/^a+\.\.\.$/);
    expect(displayedText).toBeInTheDocument();
    expect(displayedText.textContent?.length).toBe(203); // 200 chars + '...'
  });

  it('applies correct styling for filled content', () => {
    render(
      <PropositionDisplay
        id="prop-4"
        content="Content"
        placeholder="P"
        isEmpty={false}
        type="premise"
      />
    );

    const contentElement = screen.getByText('Content');
    expect(contentElement).toHaveClass('text-slate-800', 'break-words');
  });

  it('renders premise type correctly', () => {
    const { container } = render(
      <PropositionDisplay
        id="prop-5"
        content="Premise content"
        placeholder="P"
        isEmpty={false}
        type="premise"
      />
    );

    expect(container.querySelector('.w-full')).toBeInTheDocument();
  });

  it('renders conclusion type correctly', () => {
    const { container } = render(
      <PropositionDisplay
        id="prop-6"
        content="Conclusion content"
        placeholder="Q"
        isEmpty={false}
        type="conclusion"
      />
    );

    expect(container.querySelector('.w-full')).toBeInTheDocument();
  });
});

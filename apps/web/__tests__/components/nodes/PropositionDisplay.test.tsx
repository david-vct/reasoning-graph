/**
 * Tests for PropositionDisplay with inline editing
 */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropositionDisplay } from '@/components/nodes/PropositionDisplay';

describe('PropositionDisplay', () => {
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders content when not empty', () => {
    render(
      <PropositionDisplay
        id="prop-1"
        content="Test proposition"
        placeholder="Placeholder"
        isEmpty={false}
        type="premise"
      />
    );

    expect(screen.getByText('Test proposition')).toBeInTheDocument();
  });

  it('renders placeholder when empty', () => {
    render(
      <PropositionDisplay
        id="prop-1"
        content=""
        placeholder="Enter premise"
        isEmpty={true}
        type="premise"
      />
    );

    expect(screen.getByText('Enter premise')).toBeInTheDocument();
  });

  it('activates edit mode on double-click', () => {
    render(
      <PropositionDisplay
        id="prop-1"
        content="Test"
        placeholder="Placeholder"
        isEmpty={false}
        type="premise"
        onSave={mockOnSave}
      />
    );

    const display = screen.getByText('Test');
    fireEvent.doubleClick(display);

    // Editor should appear with input
    const input = screen.getByDisplayValue('Test');
    expect(input).toBeInTheDocument();
  });

  it('does not activate edit mode when disabled', () => {
    render(
      <PropositionDisplay
        id="prop-1"
        content="Test"
        placeholder="Placeholder"
        isEmpty={false}
        type="premise"
        onSave={mockOnSave}
        disabled={true}
      />
    );

    const display = screen.getByText('Test');
    fireEvent.doubleClick(display);

    // Editor should NOT appear
    expect(screen.queryByDisplayValue('Test')).not.toBeInTheDocument();
  });

  it('does not activate edit mode without onSave callback', () => {
    render(
      <PropositionDisplay
        id="prop-1"
        content="Test"
        placeholder="Placeholder"
        isEmpty={false}
        type="premise"
      />
    );

    const display = screen.getByText('Test');
    fireEvent.doubleClick(display);

    // Editor should NOT appear
    expect(screen.queryByDisplayValue('Test')).not.toBeInTheDocument();
  });

  it('saves edited content', async () => {
    render(
      <PropositionDisplay
        id="prop-1"
        content="Initial"
        placeholder="Placeholder"
        isEmpty={false}
        type="premise"
        onSave={mockOnSave}
      />
    );

    // Activate edit mode
    const display = screen.getByText('Initial');
    fireEvent.doubleClick(display);

    // Edit content
    const input = screen.getByDisplayValue('Initial');
    await userEvent.clear(input);
    await userEvent.type(input, 'Modified{Enter}');

    expect(mockOnSave).toHaveBeenCalledWith('Modified');
  });

  it('only calls onSave when content changes', async () => {
    render(
      <PropositionDisplay
        id="prop-1"
        content="Test"
        placeholder="Placeholder"
        isEmpty={false}
        type="premise"
        onSave={mockOnSave}
      />
    );

    // Activate edit mode
    const display = screen.getByText('Test');
    fireEvent.doubleClick(display);

    // Press Enter without changing content
    const input = screen.getByDisplayValue('Test');
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('truncates long text with ellipsis', () => {
    const longText = 'A'.repeat(250);
    render(
      <PropositionDisplay
        id="prop-1"
        content={longText}
        placeholder="Placeholder"
        isEmpty={false}
        type="premise"
        maxLength={200}
      />
    );

    const displayText = screen.getByText(/A{200}\.\.\./);
    expect(displayText).toBeInTheDocument();
  });

  it('shows full text in title attribute when truncated', () => {
    const longText = 'A'.repeat(250);
    const { container } = render(
      <PropositionDisplay
        id="prop-1"
        content={longText}
        placeholder="Placeholder"
        isEmpty={false}
        type="premise"
        maxLength={200}
      />
    );

    const displayDiv = container.querySelector('div[title]');
    expect(displayDiv).toHaveAttribute('title', longText);
  });
});

/**
 * Tests for PropositionEditor component
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropositionEditor } from '@/components/nodes/PropositionEditor';

describe('PropositionEditor', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with initial content', () => {
    render(
      <PropositionEditor
        content="Test content"
        placeholder="Enter text"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const input = screen.getByDisplayValue('Test content');
    expect(input).toBeInTheDocument();
  });

  it('auto-focuses input on mount', () => {
    render(
      <PropositionEditor
        content=""
        placeholder="Enter text"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveFocus();
  });

  it('calls onSave when Enter is pressed', async () => {
    render(
      <PropositionEditor
        content="Initial"
        placeholder="Enter text"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const input = screen.getByDisplayValue('Initial');
    await userEvent.clear(input);
    await userEvent.type(input, 'New content{Enter}');

    expect(mockOnSave).toHaveBeenCalledWith('New content');
  });

  it('calls onCancel when Escape is pressed', async () => {
    render(
      <PropositionEditor
        content="Initial"
        placeholder="Enter text"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const input = screen.getByDisplayValue('Initial');
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(mockOnCancel).toHaveBeenCalled();
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('calls onSave when input loses focus', async () => {
    render(
      <PropositionEditor
        content="Initial"
        placeholder="Enter text"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const input = screen.getByDisplayValue('Initial');
    await userEvent.clear(input);
    await userEvent.type(input, 'Modified');
    fireEvent.blur(input);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith('Modified');
    });
  });

  it('renders with label for complex propositions', () => {
    render(
      <PropositionEditor
        content=""
        placeholder="Enter P"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        isComplex={true}
        label="P"
      />
    );

    expect(screen.getByText('P:')).toBeInTheDocument();
  });

  it('updates value on input change', async () => {
    render(
      <PropositionEditor
        content=""
        placeholder="Enter text"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const input = screen.getByPlaceholderText('Enter text');
    await userEvent.type(input, 'Typing text');

    expect(input).toHaveValue('Typing text');
  });
});

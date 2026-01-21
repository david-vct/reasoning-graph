import { render, screen } from '../utils/test-utils';
import Header from '@/components/Header';
import { useSession } from 'next-auth/react';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Reasoning Graph title', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });

    render(<Header />);

    expect(screen.getByText('Reasoning Graph')).toBeInTheDocument();
  });

  it('renders login and signup links when not authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });

    render(<Header />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('renders user email and logout button when authenticated', () => {
    const mockSession = {
      user: { email: 'test@example.com' },
      expires: '2026-12-31',
    };
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: 'authenticated' });

    render(<Header />);

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign up')).not.toBeInTheDocument();
  });
});

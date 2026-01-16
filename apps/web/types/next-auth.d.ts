import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      preferences?: {
        theme?: 'light' | 'dark';
        connectionMode?: string;
      };
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    preferences?: {
      theme?: 'light' | 'dark';
      connectionMode?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
  }
}

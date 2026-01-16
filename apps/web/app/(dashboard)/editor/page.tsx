'use client';

import { useSession } from 'next-auth/react';

export default function EditorPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to the Graph Editor
          </h1>
          <p className="text-gray-600 mb-2">
            Hello, {session?.user?.name || 'User'}!
          </p>
          <p className="text-gray-500">
            This is a protected page. The graph editor canvas will be implemented in future stories.
          </p>
        </div>
      </div>
    </div>
  );
}

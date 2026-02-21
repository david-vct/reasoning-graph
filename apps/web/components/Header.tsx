'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useGraphStore } from '@/lib/store/graphStore';

type ConnectionMode = 'drag-drop' | 'click-click';

export default function Header() {
  const { data: session, update } = useSession();
  const [isSavingMode, setIsSavingMode] = useState(false);
  const [localConnectionMode, setLocalConnectionMode] = useState<ConnectionMode>('drag-drop');
  const setConnectionMode = useGraphStore((state) => state.setConnectionMode);

  useEffect(() => {
    const sessionMode = session?.user?.preferences?.connectionMode;
    if (sessionMode === 'drag-drop' || sessionMode === 'click-click') {
      setLocalConnectionMode(sessionMode);
      setConnectionMode(sessionMode);
    }
  }, [session?.user?.preferences?.connectionMode, setConnectionMode]);

  const handleConnectionModeChange = async (nextMode: ConnectionMode) => {
    setLocalConnectionMode(nextMode);
    setConnectionMode(nextMode);
    setIsSavingMode(true);

    try {
      const response = await fetch('/api/preferences/connection-mode', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ connectionMode: nextMode }),
      });

      if (!response.ok) {
        throw new Error('Failed to save connection mode');
      }

      await update({
        ...session,
        user: {
          ...session?.user,
          preferences: {
            ...session?.user?.preferences,
            connectionMode: nextMode,
          },
        },
      });
    } catch {
      const previousMode = session?.user?.preferences?.connectionMode;
      if (previousMode === 'drag-drop' || previousMode === 'click-click') {
        setLocalConnectionMode(previousMode);
        setConnectionMode(previousMode);
      }
    } finally {
      setIsSavingMode(false);
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Reasoning Graph
          </Link>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  Connection mode
                  <select
                    value={localConnectionMode}
                    onChange={(event) =>
                      handleConnectionModeChange(event.target.value as ConnectionMode)
                    }
                    disabled={isSavingMode}
                    className="px-2 py-1 border border-gray-300 rounded-md bg-white"
                    title="Choose how to connect nodes: drag and drop, or click then click"
                  >
                    <option value="drag-drop">Drag & Drop</option>
                    <option value="click-click">Click-Click</option>
                  </select>
                </label>
                <span className="text-gray-700">{session.user?.email}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

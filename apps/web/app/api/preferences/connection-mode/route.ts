import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/auth';
import { UserRepository } from '@/repositories/UserRepository';

const connectionModeSchema = z.object({
  connectionMode: z.enum(['drag-drop', 'click-click']),
});

/**
 * Updates the authenticated user's preferred connection mode.
 */
export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { connectionMode } = connectionModeSchema.parse(body);

    const user = await UserRepository.updateConnectionMode(session.user.id, connectionMode);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Connection mode updated',
      connectionMode: user.preferences.connectionMode,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    console.error('Failed to update connection mode:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

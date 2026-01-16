import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const startTime = Date.now();
    await connectDB();
    const latency = Date.now() - startTime;

    const isConnected = mongoose.connection.readyState === 1;

    return NextResponse.json({
      status: 'ok',
      database: {
        connected: isConnected,
        name: mongoose.connection.name,
        latency: `${latency}ms`,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'error',
        database: {
          connected: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { UserRepository } from '@/repositories/UserRepository';

const signupSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validated = signupSchema.parse(body);

    // Create user
    const user = await UserRepository.create(validated);

    return NextResponse.json({ user, message: 'User created successfully' }, { status: 201 });
  } catch (error: unknown) {
    // Handle validation errors
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: 'errors' in error ? error.errors : [] },
        { status: 400 }
      );
    }

    // Handle duplicate email (MongoDB unique constraint)
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    // Handle other errors
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

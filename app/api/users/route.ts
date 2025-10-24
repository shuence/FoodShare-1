import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database-prisma';

// GET /api/users - Get users (with optional filtering)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // const role = searchParams.get('role');
    const email = searchParams.get('email');

    if (email) {
      const user = await db.getUserByEmail(email);
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ user }, { status: 200 });
    }

    // For now, we'll return an error since we don't have a getAllUsers method
    // In a real app, you'd implement this with proper pagination and filtering
    return NextResponse.json(
      { error: 'Use specific user endpoints' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

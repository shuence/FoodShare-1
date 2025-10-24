import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database-prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, role, location, phone } = body;

    // Validate required fields
    if (!name || !email || !role || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = await db.createUser({
      name,
      email,
      role,
      location,
      phone: phone || '',
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

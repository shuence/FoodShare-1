import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database-prisma';

// PUT /api/notifications/[id] - Mark notification as read
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const updatedNotification = await db.markNotificationAsRead(id);
    
    if (!updatedNotification) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ notification: updatedNotification }, { status: 200 });
  } catch (error) {
    console.error('Mark notification as read error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

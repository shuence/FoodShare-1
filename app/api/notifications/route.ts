import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database-prisma';

// GET /api/notifications - Get notifications for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    let notifications = await db.getNotificationsByUser(userId);
    
    // Apply limit if specified
    if (limit && limit > 0) {
      notifications = notifications.slice(0, limit);
    }
    
    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    console.error('Get notifications error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/notifications - Create a new notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, title, message, listingId, claimId } = body;

    // Validate required fields
    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newNotification = await db.createNotification({
      userId,
      type,
      title,
      message,
      listingId,
      claimId,
      read: false,
    });

    // Note: In a real-time system, you would broadcast this notification
    // to the user's connected clients here. For now, the SSE stream will
    // pick it up on the next check interval.

    return NextResponse.json({ notification: newNotification }, { status: 201 });
  } catch (error) {
    console.error('Create notification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

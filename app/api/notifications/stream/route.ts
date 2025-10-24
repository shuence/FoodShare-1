import { NextRequest } from 'next/server';
import { db } from '@/lib/database-prisma';

// Server-Sent Events endpoint for real-time notifications
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response('User ID is required', { status: 400 });
  }

  // Create a readable stream for SSE
  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      const sendSSE = (data: Record<string, unknown>) => {
        const sseData = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(new TextEncoder().encode(sseData));
      };

      // Send connection established message
      sendSSE({ type: 'connected', message: 'Real-time notifications connected' });

      // Set up interval to check for new notifications
      const checkInterval = setInterval(async () => {
        try {
          const notifications = await db.getNotificationsByUser(userId);
          const unreadCount = notifications.filter(n => !n.read).length;
          
          if (unreadCount > 0) {
            sendSSE({ 
              type: 'notification_count', 
              count: unreadCount,
              notifications: notifications.slice(0, 5) // Send latest 5 notifications
            });
          }
        } catch (error) {
          console.error('Error checking notifications:', error);
          sendSSE({ type: 'error', message: 'Failed to check notifications' });
        }
      }, 5000); // Check every 5 seconds

      // Cleanup on close
      const cleanup = () => {
        clearInterval(checkInterval);
        controller.close();
      };

      // Handle client disconnect
      request.signal.addEventListener('abort', cleanup);
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
}

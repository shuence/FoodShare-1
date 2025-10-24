import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

let io: SocketIOServer | null = null;

export const initializeSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_APP_URL 
        : "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join user to their personal room
    socket.on('join-user-room', (userId: string) => {
      socket.join(`user-${userId}`);
      console.log(`User ${userId} joined their room`);
    });

    // Leave user room
    socket.on('leave-user-room', (userId: string) => {
      socket.leave(`user-${userId}`);
      console.log(`User ${userId} left their room`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

export const getSocketIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

// Helper function to send notification to a specific user
export const sendNotificationToUser = (userId: string, notification: Record<string, unknown>) => {
  if (io) {
    io.to(`user-${userId}`).emit('notification', notification);
    console.log(`Notification sent to user ${userId}:`, notification);
  }
};

// Helper function to broadcast to all connected users
export const broadcastToAll = (event: string, data: Record<string, unknown>) => {
  if (io) {
    io.emit(event, data);
    console.log(`Broadcasted ${event} to all users:`, data);
  }
};

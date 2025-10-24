import { useEffect, useState, useRef, useCallback } from 'react';
import { Notification } from '@/types';

interface NotificationStreamData {
  type: 'connected' | 'notification_count' | 'error';
  message?: string;
  count?: number;
  notifications?: Notification[];
}

export function useRealtimeNotifications(userId: string | null) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const initializeConnection = useCallback(() => {
    if (!userId) {
      setIsConnected(false);
      return;
    }
    
    setIsConnected(true);

    // Create EventSource connection
    const eventSource = new EventSource(`/api/notifications/stream?userId=${userId}`);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log('Real-time notifications connected');
      setIsConnected(true);
      setError(null);
    };

    eventSource.onmessage = (event) => {
      try {
        const data: NotificationStreamData = JSON.parse(event.data);
        
        switch (data.type) {
          case 'connected':
            console.log('SSE connection established');
            break;
            
          case 'notification_count':
            if (data.count !== undefined) {
              setUnreadCount(data.count);
            }
            if (data.notifications) {
              setNotifications(data.notifications);
            }
            break;
            
          case 'error':
            setError(data.message || 'Unknown error');
            break;
        }
      } catch (err) {
        console.error('Error parsing SSE data:', err);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      setIsConnected(false);
      setError('Connection lost. Attempting to reconnect...');
      
      // Attempt to reconnect after 3 seconds
      setTimeout(() => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }
        // The useEffect will run again and create a new connection
      }, 3000);
    };

    // Cleanup on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setIsConnected(false);
    };
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const initialize = () => {
        initializeConnection();
      };
      initialize();
    }
  }, [userId, initializeConnection]);

  // Function to manually refresh notifications
  const refreshNotifications = async () => {
    if (!userId) return;
    
    try {
      const response = await fetch(`/api/notifications?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.filter((n: Notification) => !n.read).length);
      }
    } catch (err) {
      console.error('Error refreshing notifications:', err);
    }
  };

  // Function to mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'PUT',
      });
      
      if (response.ok) {
        // Update local state
        setNotifications(prev => 
          prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return {
    notifications,
    unreadCount,
    isConnected,
    error,
    refreshNotifications,
    markAsRead,
  };
}

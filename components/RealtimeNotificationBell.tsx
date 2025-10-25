'use client';

import React, { useState } from 'react';
import { Bell, X, Check, ExternalLink } from 'lucide-react';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function RealtimeNotificationBell() {
  const { user } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    isConnected, 
    error, 
    markAsRead 
  } = useRealtimeNotifications(user?.id || null);

  const handleMarkAsRead = async (notificationId: string) => {
    await markAsRead(notificationId);
  };

  const handleMarkAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.read);
    for (const notification of unreadNotifications) {
      await markAsRead(notification.id);
    }
  };

  const handleViewAll = () => {
    setIsOpen(false);
    router.push('/notifications');
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    setIsOpen(false);
    
    if (notification.listingId) {
      router.push(`/listing/${notification.listingId}`);
    } else if (notification.claimId) {
      router.push('/dashboard/claims');
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg transition-colors"
        title="Notifications"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
        {/* Connection Status Indicator */}
        {isConnected && (
          <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500" title="Real-time connected" />
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-2 px-2 py-1 text-xs font-semibold text-white bg-orange-500 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={handleViewAll}
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center ml-auto"
                >
                  View all
                  <ExternalLink className="w-3 h-3 ml-1" />
                </button>
              </div>
            
              {/* Connection Status */}
              {isConnected && (
                <div className="mt-2 flex items-center text-xs text-green-600">
                  <div className="w-2 h-2 rounded-full mr-2 bg-green-500 animate-pulse" />
                  Real-time updates enabled
                </div>
              )}
            
              {error && (
                <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}
            </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No notifications yet</p>
                <p className="text-xs text-gray-400 mt-1">We'll notify you when something happens</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-orange-50 border-l-4 border-l-orange-500' : 'border-l-4 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(notification.createdAt).toLocaleDateString()} at {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(notification.id);
                          }}
                          className="text-orange-500 hover:text-orange-600 p-1 rounded-lg hover:bg-orange-100 flex-shrink-0"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                {notifications.length > 5 && (
                  <button
                    onClick={handleViewAll}
                    className="w-full p-3 text-center text-sm text-orange-500 hover:text-orange-600 font-medium hover:bg-gray-50"
                  >
                    View all {notifications.length} notifications
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        </>
      )}
    </div>
  );
}

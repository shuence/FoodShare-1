'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Clock, CheckCircle, XCircle, Package, ArrowLeft } from 'lucide-react';
import { Notification } from '@/types';

export default function NotificationsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const loadNotifications = useCallback(() => {
    // Mock notifications data - moved to initialization to avoid setState in effect
    const mockNotifications = [
      {
        id: '1',
        type: 'claim_request',
        title: 'New Claim Request',
        message: 'John Doe wants to claim your "Fresh Vegetables" listing',
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        listingId: 'listing-1'
      },
      {
        id: '2',
        type: 'claim_confirmed',
        title: 'Claim Confirmed',
        message: 'Your claim for "Bread and Pastries" has been confirmed by Sarah',
        read: true,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        listingId: 'listing-2'
      },
      {
        id: '3',
        type: 'listing_expired',
        title: 'Listing Expired',
        message: 'Your "Fresh Fruits" listing has expired and was automatically removed',
        read: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        listingId: 'listing-3'
      },
      {
        id: '4',
        type: 'claim_rejected',
        title: 'Claim Rejected',
        message: 'Your claim for "Dairy Products" was rejected by the donor',
        read: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        listingId: 'listing-4'
      }
    ];
    
    setNotifications(mockNotifications as unknown as Notification[]);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    return true;
  });

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'claim_request':
        return <Bell className="w-5 h-5 text-blue-500" />;
      case 'claim_confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'claim_rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'listing_expired':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'claim_request':
        return 'border-l-blue-500 bg-blue-50';
      case 'claim_confirmed':
        return 'border-l-green-500 bg-green-50';
      case 'claim_rejected':
        return 'border-l-red-500 bg-red-50';
      case 'listing_expired':
        return 'border-l-orange-500 bg-orange-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => router.back()}
                className="flex items-center text-orange-500 hover:text-orange-600 mr-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    filter === 'all'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    filter === 'unread'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Unread
                </button>
              </div>
              <button
                onClick={markAllAsRead}
                className="text-orange-500 hover:text-orange-600 font-medium text-sm"
              >
                Mark all as read
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </h3>
            <p className="text-gray-600">
              {filter === 'unread' 
                ? 'You\'re all caught up!'
                : 'You\'ll receive notifications about food claims and updates here.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm border-l-4 p-6 cursor-pointer hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-orange-500' : 'border-l-gray-300'
                } ${getNotificationColor(notification.type)}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-medium ${
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(notification.createdAt)}
                        </span>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className={`mt-1 text-sm ${
                      !notification.read ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      {notification.message}
                    </p>
                    {notification.listingId && (
                      <button className="mt-2 text-orange-500 hover:text-orange-600 text-sm font-medium">
                        View Details →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Notification Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Claim Requests</div>
                <div className="text-sm text-gray-600">Get notified when someone wants to claim your food</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Claim Updates</div>
                <div className="text-sm text-gray-600">Get notified about claim confirmations and rejections</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Listing Expiry</div>
                <div className="text-sm text-gray-600">Get notified when your listings are about to expire</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardNavbar from '@/components/DashboardNavbar';
import RealtimeNotificationBell from '@/components/RealtimeNotificationBell';
import { 
  Plus, 
  Package, 
  Heart, 
  Clock, 
  Users, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Star,
} from 'lucide-react';

export default function DashboardMainPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [stats] = useState({
    totalListings: 12,
    totalClaims: 8,
    hoursSaved: 24,
    peopleHelped: 15,
  });
  const [recentActivity, setRecentActivity] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    // Load recent activity from API
    const loadRecentActivity = async () => {
      try {
        const response = await fetch('/api/activity');
        if (response.ok) {
          const data = await response.json();
          setRecentActivity(data.activity || []);
        }
      } catch (error) {
        console.error('Error loading recent activity:', error);
        // Fallback to mock data
        setRecentActivity([
          ...recentActivity,
          {
            id: 2,
            type: 'claim',
            title: 'Bread Claimed',
            description: 'You claimed fresh bread from Sarah',
            time: '1 day ago',
            status: 'completed',
          },
          {
            id: 3,
            type: 'listing',
            title: 'Fruits Available',
            description: 'Your fruit basket is ready for pickup',
            time: '2 days ago',
            status: 'pending',
          },
        ]);
      }
    };

    loadRecentActivity();
  }, []);

  if (!user) {
    router.push('/login');
    return null;
  }

  const quickActions = [
    {
      title: 'Share Food',
      description: 'List food you want to share',
      icon: Plus,
      color: 'bg-orange-500',
      href: '/dashboard',
    },
    {
      title: 'Browse Food',
      description: 'Find food near you',
      icon: Package,
      color: 'bg-green-500',
      href: '/browse',
    },
    {
      title: 'My Listings',
      description: 'Manage your food listings',
      icon: Heart,
      color: 'bg-blue-500',
      href: '/dashboard/listings',
    },
    {
      title: 'My Claims',
      description: 'View your claimed food',
      icon: CheckCircle,
      color: 'bg-purple-500',
      href: '/dashboard/claims',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardNavbar 
        title="Dashboard" 
        subtitle={`Welcome back, ${user?.name}!`} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 text-sm">Welcome back, {user?.name}!</p>
              </div>
              <div className="flex items-center space-x-4">
                <RealtimeNotificationBell />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Package className="w-6 h-6 text-orange-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Food Listings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalListings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Heart className="w-6 h-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Food Claimed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalClaims}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hours Saved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.hoursSaved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">People Helped</p>
                <p className="text-2xl font-bold text-gray-900">{stats.peopleHelped}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => router.push(action.href)}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                  >
                    <div className="flex items-center mb-3">
                      <div className={`p-2 ${action.color} rounded-lg text-white mr-3`}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id as string} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'listing' 
                        ? 'bg-orange-100' 
                        : 'bg-green-100'
                    }`}>
                      {activity.type === 'listing' ? (
                        <Package className={`w-4 h-4 ${
                          activity.status === 'completed' 
                            ? 'text-orange-500' 
                            : 'text-orange-400'
                        }`} />
                      ) : (
                        <Heart className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title as string}</p>
                      <p className="text-sm text-gray-600">{activity.description as string}</p>
                      <p className="text-xs text-gray-500">{activity.time as unknown as string}</p>
                    </div>
                    {activity.status as string === 'completed' && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {activity.status as string === 'pending' && (
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-orange-500 hover:text-orange-600 font-medium">
                View all activity
              </button>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Make a Difference Today</h3>
                <p className="text-orange-100 mb-4">
                  Share food with your community and help reduce waste. Every small act counts!
                </p>
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="bg-white text-orange-500 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Share Food Now
                </button>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Star className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}

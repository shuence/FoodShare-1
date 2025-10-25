'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Star,
  Activity,
  Settings,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalListings: 0,
    totalClaims: 0,
    hoursSaved: 0,
    peopleHelped: 0,
  });
  const [recentActivity, setRecentActivity] = useState<Record<string, unknown>[]>([]);

  const loadDashboardData = useCallback(async () => {
    if (!user) return;

    try {
      // Load user's listings
      const listingsResponse = await fetch(`/api/listings?donorId=${user.id}`);
      if (listingsResponse.ok) {
        const listingsData = await listingsResponse.json();
        setStats(prev => ({
          ...prev,
          totalListings: listingsData.listings?.length || 0,
        }));
      }

      // Load recent activity
      const activityResponse = await fetch('/api/activity');
      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setRecentActivity(activityData.activity || []);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  }, [user]);

  useEffect(() => {
    const loadData = async () => {
      await loadDashboardData();
    };
    loadData();
  }, [loadDashboardData]);  

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Share Food',
      description: 'List food you want to share',
      icon: Plus,
      color: 'bg-orange-500',
      href: '/dashboard/create',
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

  const dashboardSections = [
    {
      title: 'Profile & Settings',
      descriusern: 'Manage your account and preferences',
      icon: User,
      color: 'bg-gray-500',
      href: '/profile',
    },
    {
      title: 'Settings',
      description: 'Account preferences and notifications',
      icon:  Settings,
      color: 'bg-gray-600',
      href: '/dashboard/settings',
    },
    {
      title: 'Help & Support',
      description: 'Get help and find answers',
      icon: AlertCircle,
      color: 'bg-blue-600',
      href: '/dashboard/help',
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

            {/* Dashboard Sections */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Management</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {dashboardSections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => router.push(section.href)}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                  >
                    <div className="flex items-center mb-3">
                      <div className={`p-2 ${section.color} rounded-lg text-white mr-3`}>
                        <section.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{section.title}</h3>
                        <p className="text-sm text-gray-600">{section.description}</p>
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
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key ={activity.id as string} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        activity.type as string === 'listing' 
                          ? 'bg-orange-100' 
                          : 'bg-green-100'
                      }`}>
                        {activity.type as string === 'listing' ? (
                          <Package className={`w-4 h-4 ${
                            activity.status as string === 'completed' 
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
                  ))
                ) : (
                  <div className="text-center py-4">
                    <Activity className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No recent activity</p>
                  </div>
                )}
              </div>
              <button className="w-full mt-4 text-sm text-orange-500 hover:text-orange-600 font-medium">
                View all activity
              </button>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white bg-gradient-to-r from-orange-500 to-orange-600">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Make a Difference Today</h3>
                <p className="text-orange-100 mb-4">
                  Share food with your community and help reduce waste. Every small act counts!
                </p>
                <button 
                  onClick={() => router.push('/dashboard/create')}
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
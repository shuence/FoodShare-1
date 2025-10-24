'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Package,
  Heart,
  Plus,
  Settings,
  HelpCircle,
  LogOut,
  UserCircle2,
  Bell,
  Menu,
  X,
  Home,
  Search
} from 'lucide-react';

interface DashboardNavbarProps {
  title?: string;
  subtitle?: string;
}

export default function DashboardNavbar({ title = "Dashboard", subtitle }: DashboardNavbarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Listings', href: '/dashboard/listings', icon: Package },
    { name: 'My Claims', href: '/dashboard/claims', icon: Heart },
    { name: 'Share Food', href: '/dashboard/create', icon: Plus },
    { name: 'Profile', href: '/profile', icon: UserCircle2 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Help & Support', href: '/dashboard/help', icon: HelpCircle },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200">
          <Link href="/dashboard" className="text-2xl font-bold text-orange-500">
            FoodShare
          </Link>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <UserCircle2 className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="px-2 py-4 border-t border-gray-200">
          <Link
            href="/browse"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Search className="mr-3 h-5 w-5" />
            Browse Food
          </Link>
          <Link
            href="/"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Home className="mr-3 h-5 w-5" />
            Home
          </Link>
        </div>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Top Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 md:hidden">
        <div className="flex items-center justify-between h-16 px-6">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </header>

    </>
  );
}

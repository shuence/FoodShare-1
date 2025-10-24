'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  Plus,
  // Search,
  // MapPin
} from 'lucide-react';
import RealtimeNotificationBell from './RealtimeNotificationBell';

interface NavigationProps {
  showAuthButtons?: boolean;
  showDashboardLinks?: boolean;
}

export default function Navigation({ showAuthButtons = true, showDashboardLinks = true }: NavigationProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-3xl font-bold text-orange-500">FoodShare</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/browse" 
                className="text-gray-700 hover:text-orange-500 px-3 py-2 text-base font-medium transition-colors"
              >
                Browse Food
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-orange-500 px-3 py-2 text-base font-medium transition-colors"
              >
                About
              </Link>
              <Link 
                href="/help" 
                className="text-gray-700 hover:text-orange-500 px-3 py-2 text-base font-medium transition-colors"
              >
                Help
              </Link>
              {user && showDashboardLinks && (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-gray-700 hover:text-orange-500 px-3 py-2 text-base font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/dashboard/listings" 
                    className="text-gray-700 hover:text-orange-500 px-3 py-2 text-base font-medium transition-colors"
                  >
                    My Listings
                  </Link>
                  <Link 
                    href="/dashboard/claims" 
                    className="text-gray-700 hover:text-orange-500 px-3 py-2 text-base font-medium transition-colors"
                  >
                    My Claims
                  </Link>
                <RealtimeNotificationBell />
                </>
              )}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          {showAuthButtons && (
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  {user.role === 'donor' && (
                    <Link
                      href="/dashboard"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Listing
                    </Link>
                  )}
                  
                  {/* User Menu */}
                  <div className="relative group">
                    <button className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-orange-500" />
                      </div>
                      <span className="text-sm font-medium">{user.name}</span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User className="w-4 h-4 mr-3" />
                          Profile
                        </Link>
                        <div className="px-4 py-2">
                          <RealtimeNotificationBell />
                        </div>
                        <Link
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Settings
                        </Link>
                        <hr className="my-1" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-orange-500 px-3 py-2 text-base font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-base font-medium transition-colors shadow-sm hover:shadow-md"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                href="/browse"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Food
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/help"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </Link>
              
              {user ? (
                <>
                  {showDashboardLinks && (
                    <>
                      <Link
                        href="/dashboard"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/listings"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Listings
                      </Link>
                      <Link
                        href="/dashboard/claims"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Claims
                      </Link>
                    </>
                  )}
                  <Link
                    href="/notifications"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Notifications
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {user.role === 'donor' && (
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 text-base font-medium text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Listing
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 text-base font-medium text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

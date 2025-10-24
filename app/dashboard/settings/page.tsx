'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardNavbar from '@/components/DashboardNavbar';
import { 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Smartphone, 
  Mail, 
  Lock, 
  Trash2, 
  Download,
  Sun,
  Volume2,
  VolumeX,
  MapPin,
  Eye,
} from 'lucide-react'; 

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('notifications');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
    newListings: true,
    claimUpdates: true,
    messages: true,
    reminders: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    locationSharing: true,
    showOnlineStatus: true,
    allowMessages: true,
  });
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'Asia/Kolkata',
    distanceUnit: 'kilometers',
    soundEnabled: true,
    vibrationEnabled: true,
  });

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, this would delete the account
      alert('Account deletion would be processed here');
    }
  };

  const handleExportData = () => {
    // In a real app, this would export user data
    alert('Data export would be initiated here');
  };

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Channels</h3>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email Notifications', description: 'Get notified about new food listings and claims via email', icon: Mail },
            { key: 'push', label: 'Push Notifications', description: 'Receive push notifications on your device', icon: Smartphone },
            { key: 'sms', label: 'SMS Notifications', description: 'Get text messages for urgent updates', icon: Smartphone },
            { key: 'marketing', label: 'Marketing Emails', description: 'Receive updates about new features and tips', icon: Mail },
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center flex-1">
                <notification.icon className="w-5 h-5 text-gray-400 mr-3" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{notification.label}</div>
                  <div className="text-sm text-gray-600">{notification.description}</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[notification.key as keyof typeof notifications]}
                  onChange={(e) => handleNotificationChange(notification.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Types</h3>
        <div className="space-y-4">
          {[
            { key: 'newListings', label: 'New Food Listings', description: 'Get notified when new food is available near you' },
            { key: 'claimUpdates', label: 'Claim Updates', description: 'Updates about your food claims and listings' },
            { key: 'messages', label: 'Messages', description: 'Notifications for new messages from other users' },
            { key: 'reminders', label: 'Reminders', description: 'Reminders about pickup times and expiring food' },
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{notification.label}</div>
                <div className="text-sm text-gray-600">{notification.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[notification.key as keyof typeof notifications]}
                  onChange={(e) => handleNotificationChange(notification.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Eye className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Profile Visibility</div>
                <div className="text-sm text-gray-600">Control who can see your profile information</div>
              </div>
            </div>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Location Sharing</div>
                <div className="text-sm text-gray-600">Allow others to see your general location</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.locationSharing}
                onChange={(e) => handlePrivacyChange('locationSharing', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Show Online Status</div>
                <div className="text-sm text-gray-600">Let others know when you&apos;re online</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.showOnlineStatus}
                onChange={(e) => handlePrivacyChange('showOnlineStatus', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Allow Messages</div>
                <div className="text-sm text-gray-600">Let other users send you messages</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.allowMessages}
                onChange={(e) => handlePrivacyChange('allowMessages', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Sun className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Theme</div>
                <div className="text-sm text-gray-600">Choose your preferred theme</div>
              </div>
            </div>
            <select
              value={preferences.theme}
              onChange={(e) => handlePreferenceChange('theme', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Language</div>
                <div className="text-sm text-gray-600">Select your preferred language</div>
              </div>
            </div>
            <select
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Distance Unit</div>
                <div className="text-sm text-gray-600">Choose your preferred distance unit</div>
              </div>
            </div>
            <select
              value={preferences.distanceUnit}
              onChange={(e) => handlePreferenceChange('distanceUnit', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="miles">Miles</option>
              <option value="kilometers">Kilometers</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Sound & Vibration</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              {preferences.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-gray-400 mr-3" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400 mr-3" />
              )}
              <div>
                <div className="font-medium text-gray-900">Sound Effects</div>
                <div className="text-sm text-gray-600">Play sounds for notifications</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.soundEnabled}
                onChange={(e) => handlePreferenceChange('soundEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Smartphone className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Vibration</div>
                <div className="text-sm text-gray-600">Vibrate for notifications</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.vibrationEnabled}
                onChange={(e) => handlePreferenceChange('vibrationEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Data & Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Download className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Export Data</div>
                <div className="text-sm text-gray-600">Download your data</div>
              </div>
            </div>
            <button
              onClick={handleExportData}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Export
            </button>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Lock className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Change Password</div>
                <div className="text-sm text-gray-600">Update your account password</div>
              </div>
            </div>
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Trash2 className="w-5 h-5 text-red-400 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Delete Account</div>
                <div className="text-sm text-gray-600">Permanently delete your account</div>
              </div>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardNavbar 
        title="Settings" 
        subtitle="Manage your account preferences" 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {/* Tabs */}
          <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'privacy', label: 'Privacy', icon: Shield },
              { id: 'preferences', label: 'Preferences', icon: Settings },
              { id: 'account', label: 'Account', icon: Lock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'privacy' && renderPrivacyTab()}
            {activeTab === 'preferences' && renderPreferencesTab()}
            {activeTab === 'account' && renderAccountTab()}
          </div>
        </main>
      </div>
    </div>
  );
}

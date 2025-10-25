'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardNavbar from '@/components/DashboardNavbar';
import { User, MapPin, Phone, Mail, Bell, Shield, HelpCircle, LogOut, Edit3, Camera, Package, Heart, Clock } from 'lucide-react';
import AddressAutocomplete from '@/components/AddressAutocomplete';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.location?.address || '',
    lat: user?.location?.lat || 40.7128,
    lng: user?.location?.lng || -74.0060,
  });
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });
  const [stats, setStats] = useState({
    foodListings: 0,
    foodClaimed: 0,
    hoursSaved: 0,
  });
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Fetch statistics
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!user?.id) return;
        
        // Fetch user's food listings
        const listingsRes = await fetch(`/api/listings?donorId=${user.id}`);
        if (listingsRes.ok) {
          const listingsData = await listingsRes.json();
          const listings = listingsData.listings || [];
          
          // Count claimed listings (status = 'claimed')
          const claimedCount = listings.filter((l: any) => l.status === 'claimed').length;
          
          setStats({
            foodListings: listings.length,
            foodClaimed: claimedCount,
            hoursSaved: claimedCount * 3, // Assume 3 hours saved per claim
          });
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, [user?.id]);

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (address: string, coordinates?: { lat: number; lng: number }) => {
    setFormData(prev => ({
      ...prev,
      address,
      lat: coordinates?.lat || prev.lat,
      lng: coordinates?.lng || prev.lng,
    }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSave = async () => {
    setLoading(true);
    // In a real app, this would update the user profile
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      address: user.location.address,
      lat: user.location.lat,
      lng: user.location.lng,
    });
    setIsEditing(false);
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 ${
                  !isEditing ? 'bg-gray-50' : ''
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 ${
                  !isEditing ? 'bg-gray-50' : ''
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 ${
                  !isEditing ? 'bg-gray-50' : ''
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <div className="relative">
              <input
                type="text"
                value={user.role === 'donor' ? 'Food Donor' : 'Food Receiver'}
                disabled
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
              />
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="mt-6">
          {isEditing ? (
            <AddressAutocomplete
              defaultValue={formData.address}
              onAddressSelect={(data) => handleAddressChange(data.address, { lat: data.lat, lng: data.lng })}
              placeholder="Enter your address"
              label="Address"
            />
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.address}
                  disabled
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Statistics</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.foodListings}</div>
            <div className="text-sm text-gray-700">Food Listings</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.foodClaimed}</div>
            <div className="text-sm text-gray-700">Food Claimed</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.hoursSaved}</div>
            <div className="text-sm text-gray-700">Hours Saved</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email Notifications', description: 'Get notified about new food listings and claims via email' },
            { key: 'push', label: 'Push Notifications', description: 'Receive push notifications on your device' },
            { key: 'sms', label: 'SMS Notifications', description: 'Get text messages for urgent updates' },
            { key: 'marketing', label: 'Marketing Emails', description: 'Receive updates about new features and tips' },
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{notification.label}</div>
                <div className="text-sm text-gray-700">{notification.description}</div>
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
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy & Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <div className="font-medium text-gray-900">Profile Visibility</div>
              <div className="text-sm text-gray-700">Control who can see your profile information</div>
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Public</option>
              <option>Friends Only</option>
              <option>Private</option>
            </select>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <div className="font-medium text-gray-900">Location Sharing</div>
              <div className="text-sm text-gray-700">Allow others to see your general location</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <div className="font-medium text-gray-900">Data Export</div>
              <div className="text-sm text-gray-700">Download your data</div>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHelpTab = () => {
    const faqs = [
      {
        id: 'listing',
        question: 'How do I create a food listing?',
        answer: 'Go to your dashboard and click "Create Listing". Fill in the food details, pickup time, location, and photos. Your listing will be visible to food receivers immediately.',
      },
      {
        id: 'claim',
        question: 'How do I claim food from a listing?',
        answer: 'Browse available food listings, select one you\'re interested in, and click "Claim". The food donor will be notified and you can coordinate the pickup time and location.',
      },
      {
        id: 'safety',
        question: 'How do I know if food is safe to eat?',
        answer: 'Check the food quality rating and donor reviews. All food should be in good condition. Read the listing description carefully for storage and expiration information.',
      },
      {
        id: 'cancel',
        question: 'Can I cancel a claim?',
        answer: 'Yes, you can cancel a claim before the pickup time. Go to your dashboard, find the claim, and click "Cancel Claim". The donor will be notified.',
      },
      {
        id: 'contact',
        question: 'How do I contact support?',
        answer: 'Email us at support@foodshare.com or use the contact form in the app. We typically respond within 24 hours.',
      },
      {
        id: 'report',
        question: 'How do I report an issue?',
        answer: 'Click "Report Issue" in the Help & Support section or go to your dashboard and use the "Report Problem" option for a specific listing or claim.',
      },
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 text-left">{faq.question}</span>
                  <span className={`text-orange-600 transition-transform ${expandedFaq === faq.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Resources</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/safety" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="font-medium text-gray-900 mb-1">Safety Guidelines</div>
                <div className="text-sm text-gray-700">Food safety best practices</div>
              </a>
              <a href="/contact" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="font-medium text-gray-900 mb-1">Contact Support</div>
                <div className="text-sm text-gray-700">Get help from our team</div>
              </a>
              <a href="/terms" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="font-medium text-gray-900 mb-1">Terms of Service</div>
                <div className="text-sm text-gray-700">Read our terms</div>
              </a>
              <a href="/privacy" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="font-medium text-gray-900 mb-1">Privacy Policy</div>
                <div className="text-sm text-gray-700">Your data and privacy</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardNavbar 
        title="Profile"
        subtitle="Manage your account and preferences"
      />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <div className="flex items-center space-x-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Profile Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-orange-500" />
                </div>
                {isEditing && (
                  <button className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.role === 'donor' 
                    ? 'bg-green-500 text-green-100' 
                    : 'bg-blue-500 text-blue-100'
                }`}>
                  {user.role === 'donor' ? 'Food Donor' : 'Food Receiver'}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'privacy', label: 'Privacy & Security', icon: Shield },
              { id: 'help', label: 'Help & Support', icon: HelpCircle },
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
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'notifications' && renderNotificationsTab()}
        {activeTab === 'privacy' && renderPrivacyTab()}
        {activeTab === 'help' && renderHelpTab()}
      </div>
      </div>
    </div>
  );
}
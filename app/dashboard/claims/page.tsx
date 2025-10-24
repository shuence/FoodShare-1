'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardNavbar from '@/components/DashboardNavbar';
import { 
  Heart, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  MessageCircle, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  Star,
  Calendar
} from 'lucide-react';

export default function MyClaimsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  // Helper function to create static dates for demo purposes
  const createStaticDate = (hoursOffset: number) => {
    const baseDate = new Date('2024-01-15T12:00:00Z'); // Fixed base date
    return new Date(baseDate.getTime() + hoursOffset * 60 * 60 * 1000);
  };
  
  const [claims] = useState([
    {
      id: '1',
      listingId: '1',
      title: 'Fresh Organic Vegetables',
      description: 'Assorted fresh vegetables from my garden including tomatoes, cucumbers, and lettuce.',
      foodType: 'Vegetables',
      quantity: '5 lbs',
      status: 'confirmed',
      donor: {
        name: 'Sarah Johnson',
        phone: '+1-555-0101',
        rating: 4.8,
      },
      location: {
        address: '123 Main Street, New York, NY 10001',
        lat: 40.7128,
        lng: -74.0060,
      },
      pickupTime: createStaticDate(2),
      expiryTime: createStaticDate(24),
      claimedAt: createStaticDate(-1),
      message: 'Thank you for sharing! I can pick up this evening.',
    },
    {
      id: '2',
      listingId: '2',
      title: 'Fresh Bread and Pastries',
      description: 'Freshly baked bread, croissants, and muffins from local bakery.',
      foodType: 'Bakery',
      quantity: '2 bags',
      status: 'pending',
      donor: {
        name: 'Mike Chen',
        phone: '+1-555-0102',
        rating: 4.5,
      },
      location: {
        address: '456 Broadway, New York, NY 10013',
        lat: 40.7589,
        lng: -73.9851,
      },
      pickupTime: createStaticDate(1),
      expiryTime: createStaticDate(12),
      claimedAt: createStaticDate(-0.5),
      message: 'Perfect timing! I love fresh bread.',
    },
    {
      id: '3',
      listingId: '3',
      title: 'Mixed Fruits Basket',
      description: 'Fresh seasonal fruits including apples, oranges, bananas, and grapes.',
      foodType: 'Fruits',
      quantity: '3 lbs',
      status: 'completed',
      donor: {
        name: 'Emily Rodriguez',
        phone: '+1-555-0103',
        rating: 4.9,
      },
      location: {
        address: '789 5th Avenue, New York, NY 10022',
        lat: 40.7505,
        lng: -73.9934,
      },
      pickupTime: createStaticDate(-2),
      expiryTime: createStaticDate(22),
      claimedAt: createStaticDate(-3),
      message: 'Great variety of fruits!',
    },
  ]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.donor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || claim.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleContactDonor = (claim: { donor: { name: string; phone: string } }) => {
    // In a real app, this would open a chat or call functionality
    alert(`Contacting ${claim.donor.name} at ${claim.donor.phone}`);
  };

  const handleRateDonor = (claimId: string) => {
    // In a real app, this would open a rating modal
    alert(`Rating donor for claim ${claimId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardNavbar 
        title="My Food Claims" 
        subtitle="Track your claimed food items" 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => router.push('/browse')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Heart className="w-4 h-4 mr-2" />
              Browse Food
            </button>
          </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Heart className="w-6 h-6 text-orange-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Claims</p>
                <p className="text-2xl font-bold text-gray-900">{claims.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {claims.filter(c => c.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {claims.filter(c => c.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {claims.filter(c => c.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search claims..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Claims */}
        <div className="space-y-6">
          {filteredClaims.map((claim) => (
            <div key={claim.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{claim.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(claim.status)}`}>
                      {getStatusIcon(claim.status)}
                      <span className="ml-1 capitalize">{claim.status}</span>
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{claim.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      <span className="font-medium">Donor:</span>
                      <span className="ml-2">{claim.donor.name}</span>
                      <div className="flex items-center ml-2">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="ml-1 text-xs">{claim.donor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-medium">Claimed:</span>
                      <span className="ml-2">{claim.claimedAt.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-medium">Pickup:</span>
                      <span className="ml-2">{claim.pickupTime.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{claim.location.address}</span>
                    </div>
                  </div>
                  
                  {claim.message && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Your message:</span> {claim.message}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleContactDonor(claim)}
                      className="flex items-center text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Contact Donor</span>
                    </button>
                    <button
                      onClick={() => handleContactDonor(claim)}
                      className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Message</span>
                    </button>
                    {claim.status === 'completed' && (
                      <button
                        onClick={() => handleRateDonor(claim.id)}
                        className="flex items-center text-yellow-500 hover:text-yellow-600 transition-colors"
                      >
                        <Star className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Rate Donor</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredClaims.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No claims found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'You haven\'t claimed any food yet.'
                }
              </p>
              <button
                onClick={() => router.push('/browse')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Available Food
              </button>
            </div>
          )}
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}

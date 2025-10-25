'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardNavbar from '@/components/DashboardNavbar';
import { FoodListing, Claim } from '@/types';
import { 
  Heart, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  MessageCircle, 
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Star,
  Calendar
} from 'lucide-react';

interface ClaimWithListing extends Claim {
  listing?: FoodListing;
  donor?: {
    name: string;
    phone?: string;
    rating: number;
  };
}

export default function MyClaimsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const [claims, setClaims] = useState<ClaimWithListing[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingClaims, setLoadingClaims] = useState(true);

  const loadClaims = useCallback(async () => {
    if (!user?.id) {
      setLoadingClaims(false);
      return;
    }

    try {
      const response = await fetch(`/api/claims?receiverId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        const claimsData = data.claims || [];
        
        // Fetch listing details for each claim
        const claimsWithListings = await Promise.all(
          claimsData.map(async (claim: Claim) => {
            try {
              const listingRes = await fetch(`/api/listings?id=${claim.listingId}`);
              if (listingRes.ok) {
                const listingData = await listingRes.json();
                const listing = listingData.listings as FoodListing;
                
                // Fetch donor details
                let donor = { name: 'Unknown Donor', rating: 4.5, phone: '' };
                if (listing && listing.donorId) {
                  try {
                    const donorRes = await fetch(`/api/users/${listing.donorId}`);
                    if (donorRes.ok) {
                      const donorData = await donorRes.json();
                      donor = {
                        name: donorData.user?.name || 'Unknown Donor',
                        phone: donorData.user?.phone || '',
                        rating: 4.5,
                      };
                    }
                  } catch (err) {
                    console.error('Error fetching donor:', err);
                  }
                }
                
                return { ...claim, listing, donor };
              }
              return claim;
            } catch (err) {
              console.error('Error fetching listing:', err);
              return claim;
            }
          })
        );
        
        setClaims(claimsWithListings);
      } else {
        console.error('Failed to fetch claims');
        setClaims([]);
      }
    } catch (error) {
      console.error('Error loading claims:', error);
      setClaims([]);
    } finally {
      setLoadingClaims(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    loadClaims();
  }, [loadClaims]);

  if (loading || loadingClaims) {
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
    if (!claim.listing) return false;
    const matchesSearch = claim.listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.donor?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || claim.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500 text-green-800';
      case 'pending':
        return 'bg-yellow-500 text-yellow-800';
      case 'rejected':
        return 'bg-red-500 text-red-800';
      default:
        return 'bg-gray-500 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  const handleContactDonor = (donor?: { name: string; phone?: string }) => {
    if (donor?.phone) {
      alert(`Contacting ${donor.name} at ${donor.phone}`);
    } else {
      alert(`Contact ${donor?.name || 'Donor'}`);
    }
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
                  <div className="p-3 bg-red-100 rounded-lg">
                    <XCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Rejected</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {claims.filter(c => c.status === 'rejected').length}
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
                    className="border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 "
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
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
                        <h3 className="text-lg font-semibold text-gray-900">{claim.listing?.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(claim.status)}`}>
                          {getStatusIcon(claim.status)}
                          <span className="ml-1 capitalize">{claim.status}</span>
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{claim.listing?.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="w-4 h-4 mr-2" />
                          <span className="font-medium">Donor:</span>
                          <span className="ml-2">{claim.donor?.name}</span>
                          {claim.donor?.rating && (
                            <div className="flex items-center ml-2">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="ml-1 text-xs">{claim.donor.rating}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="font-medium">Claimed:</span>
                          <span className="ml-2">{new Date(claim.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="font-medium">Pickup:</span>
                          <span className="ml-2">{claim.listing?.pickupTime ? new Date(claim.listing.pickupTime).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="font-medium">Location:</span>
                          <span className="ml-2">{claim.listing?.location.address}</span>
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
                          onClick={() => handleContactDonor(claim.donor)}
                          className="flex items-center text-orange-500 hover:text-orange-600 transition-colors"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">Contact Donor</span>
                        </button>
                        <button
                          onClick={() => handleContactDonor(claim.donor)}
                          className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">Message</span>
                        </button>
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

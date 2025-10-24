'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/database-prisma';
import { FoodListing, Claim } from '@/types';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Package, 
  User, 
  Phone, 
  MessageCircle,
  Heart,
  Share2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import MapInterface from '@/components/MapInterface';

export default function ListingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [listing, setListing] = useState<FoodListing | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showClaimForm, setShowClaimForm] = useState<boolean> (false);
  const [claimMessage, setClaimMessage] = useState<string> ('');
  const [submittingClaim, setSubmittingClaim] = useState<boolean>(false);

  const loadListing = useCallback(async () => {
    try {
      const response = await fetch(`/api/listings?id=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.listings) {
          setListing(data.listings);
          
          if (data.listings && user?.role === 'donor' && data.listings.donorId === user.id) {
            // Load claims for donors
            const claimsResponse = await fetch(`/api/claims?listingId=${params.id}`);
            if (claimsResponse.ok) {
              const claimsData = await claimsResponse.json();
              setClaims(claimsData.claims || []);
            }
          }
        } else {
          setListing(null);
        }
      } else if (response.status === 404) {
        // Listing not found
        setListing(null);
      } else {
        setListing(null);
      }
    } catch (error) {
      console.error('Error loading listing:', error);
      setListing(null);
    } finally {
      setLoading(false);
    }
  }, [params.id, user]);

  useEffect(() => {
    loadListing();
  }, [loadListing]);

  const handleClaim = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (!listing) return;

    setSubmittingClaim(true);
    try {
      const newClaim = await db.createClaim({
        listingId: listing.id,
        receiverId: user.id,
        message: claimMessage,
        status: 'pending',
      });
      
      setClaims(prev => [newClaim, ...prev]);
      setShowClaimForm(false);
      setClaimMessage('');
    } catch (error) {
      console.error('Error creating claim:', error);
    } finally {
      setSubmittingClaim(false);
    }
  };

  const handleClaimAction = async (claimId: string, action: 'confirmed' | 'rejected') => {
    try {
      await db.updateClaim(claimId, { status: action });
      setClaims(prev => 
        prev.map(claim => 
          claim.id === claimId 
            ? { ...claim, status: action }
            : claim
        )
      );
    } catch (error) {
      console.error('Error updating claim:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Listing not found</h3>
          <p className="text-gray-600 mb-4">This food listing may have been removed or expired.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isOwner = user?.role === 'donor' && listing.donorId === user.id;
  const canClaim = user?.role === 'receiver' && listing.status === 'available';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-orange-500 hover:text-orange-600 mr-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Food Listing</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {listing.title}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                      {listing.foodType}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      listing.status === 'available' 
                        ? 'bg-green-100 text-green-800'
                        : listing.status === 'claimed'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {listing.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Package className="w-5 h-5 mr-3" />
                      <span className="font-medium">Quantity:</span>
                      <span className="ml-2">{listing.quantity}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-3" />
                      <span className="font-medium">Pickup Time:</span>
                      <span className="ml-2">{new Date(listing.pickupTime).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-3" />
                      <span className="font-medium">Expires:</span>
                      <span className="ml-2">{new Date(listing.expiryTime).toLocaleString()}</span>
                    </div>
             
                  </div>
             
                </div>
          
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Information</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Food Donor</div>
                      <div className="text-sm text-gray-600">Verified Member</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>Contact available after claim</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      <span>Message donor directly</span>
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="flex items-center text-gray-600 mt-10 ">
                      <MapPin className="w-5 h-5 mr-3" />
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{listing.location.address}</span>
                    </div>

              {/* Action Buttons */}
              {canClaim && (
                <div className="border-t border-gray-200 pt-6">
                  {!showClaimForm ? (
                    <button
                      onClick={() => {
                        if (!user) {
                          router.push('/login');
                          return;
                        }
                        setShowClaimForm(true);
                      }}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                    >
                      {user ? 'Claim This Food' : 'Login to Claim'}
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message to Donor (Optional)
                        </label>
                        <textarea
                          value={claimMessage}
                          onChange={(e) => setClaimMessage(e.target.value)}
                          placeholder="Let the donor know when you can pick up the food..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleClaim}
                          disabled={submittingClaim}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {submittingClaim ? 'Submitting...' : 'Submit Claim'}
                        </button>
                        <button
                          onClick={() => setShowClaimForm(false)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Claims Section (for donors) */}
            {isOwner && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Claim Requests ({claims.length})
                </h3>
                {claims.length === 0 ? (
                  <p className="text-gray-600 text-sm">No claims yet</p>
                ) : (
                  <div className="space-y-3">
                    {claims.map((claim) => (
                      <div key={claim.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            Claim Request
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            claim.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : claim.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {claim.status}
                          </span>
                        </div>
                        {claim.message && (
                                <p className="text-sm text-gray-600 mb-3">{claim.message}</p>
                              )}
                              {claim.status === 'pending' && (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleClaimAction(claim.id, 'confirmed')}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Accept
                                  </button>
                                  <button
                                    onClick={() => handleClaimAction(claim.id, 'rejected')}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center"
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Map Section */}
                  <div className="bg-white rounded-lg shadow-sm p-6 pt-12">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                    <div className="h-64 rounded-lg overflow-hidden">
                <MapInterface selectedListing={listing as FoodListing & { location: { address: string } } & { pickupTime: Date } & { expiryTime: Date } & { status: string } & { foodType: string } & { title: string } & { description: string } & { quantity: string } & { id: string } & { donorId: string } & { claimedBy?: string } & { claimedAt?: Date } & { createdAt: Date } & { imageUrl?: string } & { location: { lat: number; lng: number; address: string } } & { donor: { name: string; phone: string; rating: number } } } />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
  );
}
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
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
  XCircle,
  Star,
  Navigation
} from 'lucide-react';
import MapboxComponent from '@/components/MapboxComponent';
import { formatRating, getRatingStars } from '@/lib/gemini-rating';

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
  const [userClaim, setUserClaim] = useState<Claim | null>(null);

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
          } else if (data.listings && user?.role === 'receiver') {
            // Load receiver's claim if any
            const claimsResponse = await fetch(`/api/claims?receiverId=${user.id}`);
            if (claimsResponse.ok) {
              const claimsData = await claimsResponse.json();
              const userClaimForThisListing = claimsData.claims?.find((claim: Claim) => claim.listingId === params.id);
              if (userClaimForThisListing) {
                setUserClaim(userClaimForThisListing);
              }
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
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listingId: listing.id,
          receiverId: user.id,
          message: claimMessage,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error creating claim:', error);
        alert(`Error: ${error.error || 'Failed to create claim'}`);
        return;
      }

      const data = await response.json();
      setUserClaim(data.claim);
      setClaims(prev => [data.claim, ...prev]);
      setShowClaimForm(false);
      setClaimMessage('');
      alert('Claim submitted successfully!');
    } catch (error) {
      console.error('Error creating claim:', error);
      alert('An error occurred while submitting your claim');
    } finally {
      setSubmittingClaim(false);
    }
  };

  const handleClaimAction = async (claimId: string, action: 'confirmed' | 'rejected') => {
    try {
      const response = await fetch(`/api/claims/${claimId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: action,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error updating claim:', error);
        alert(`Error: ${error.error || 'Failed to update claim'}`);
        return;
      }

      const data = await response.json();
      setClaims(prev => 
        prev.map(claim => 
          claim.id === claimId 
            ? { ...claim, status: action }
            : claim
        )
      );
      alert(`Claim ${action} successfully!`);
    } catch (error) {
      console.error('Error updating claim:', error);
      alert('An error occurred while updating the claim');
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
              {/* Image */}
              {listing.imageUrl && (
                <div className="mb-6 -mx-6 -mt-6">
                  <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="w-full h-96 object-cover rounded-t-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {listing.title}
                  </h2>
                  <div className="flex items-center space-x-4 flex-wrap gap-2">
                    <span className="px-3 py-1 bg-orange-500 !text-orange-900 text-sm font-medium rounded-full">
                      {listing.foodType}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full text-white ${
                      listing.status === 'available' 
                        ? 'bg-green-600'
                        : listing.status === 'claimed'
                        ? 'bg-amber-600'
                        : 'bg-gray-600'
                    }`}>
                      {listing.status}
                    </span>

                    {/* AI Rating Badge */}
                    {listing.aiRating !== null && listing.aiRating !== undefined && (
                      <div className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-black border border-blue-300 rounded-full">
                        <span className="text-lg">{getRatingStars(listing.aiRating)}</span>
                      </div>
                    )}
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

              {/* AI Rating Stars Display */}
              {listing.aiRating !== null && listing.aiRating !== undefined && (
                <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold !text-gray-900">AI Quality Rating:</span>
                    <span className="text-3xl !text-gray-900 tracking-wider">{getRatingStars(listing.aiRating)}</span>
                  </div>
                  <p className="text-xs text-gray-700 mt-2">
                    This rating is generated by AI based on food type, description quality, and listing details.
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <Package className="w-5 h-5 mr-3 text-orange-500" />
                      <span className="font-medium text-gray-900">Quantity:</span>
                      <span className="ml-2 text-gray-700">{listing.quantity}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-3 text-orange-500" />
                      <span className="font-medium text-gray-900">Pickup Time:</span>
                      <span className="ml-2 text-gray-700">{new Date(listing.pickupTime).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-3 text-orange-500" />
                      <span className="font-medium text-gray-900">Expires:</span>
                      <span className="ml-2 text-gray-700">{new Date(listing.expiryTime).toLocaleString()}</span>
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
                      <div className="font-medium text-gray-900">{(listing as any)?.donor?.name || 'Food Donor'}</div>
                      <div className="text-sm text-gray-600">Verified Member</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <Phone className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="text-gray-700">{(listing as any)?.donor?.phone ? `${(listing as any).donor.phone}` : 'Contact available after claim'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <MessageCircle className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="text-gray-700">Message donor directly</span>
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="flex items-center text-gray-700 mt-10">
                <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                <div>
                  <span className="font-medium text-gray-900">Location:</span>
                  <p className="text-gray-700 mt-1">{listing.location.address}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    📍 Coordinates: {listing.location.lat.toFixed(4)}, {listing.location.lng.toFixed(4)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {canClaim && !userClaim ? (
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 text-black"
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
              ) : null}

              {/* User's Claim Status Section */}
              {userClaim && user?.role === 'receiver' && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-1">Your Claim Status</h3>
                        <p className="text-sm text-black">Your claim has been submitted to the donor</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                        userClaim.status === 'pending'
                          ? 'bg-yellow-500 text-yellow-900'
                          : userClaim.status === 'confirmed'
                          ? 'bg-green-500 text-green-900'
                          : 'bg-red-500 text-red-900'
                      }`}>
                        {userClaim.status.charAt(0).toUpperCase() + userClaim.status.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm">
                        <span className="font-medium !text-gray-800 mr-2">📋 Claim ID:</span>
                        <span className="!text-gray-800 font-mono text-xs">{userClaim.id}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium !text-gray-800 mr-2">📅 Submitted:</span>
                        <span className="!text-gray-800">{new Date(userClaim.createdAt).toLocaleString()}</span>
                      </div>
                      {userClaim.message && (
                        <div className="flex flex-col text-sm">
                          <span className="font-medium !text-gray-800 mb-1">💬 Your Message:</span>
                          <p className="text-black bg-white p-2 rounded border border-gray-200 italic">"{userClaim.message}"</p>
                        </div>
                      )}
                      {userClaim.confirmedAt && userClaim.status === 'confirmed' && (
                        <div className="flex items-center text-sm">
                          <span className="font-medium text-black mr-2">✅ Confirmed at:</span>
                          <span className="text-black font-semibold">{new Date(userClaim.confirmedAt).toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {userClaim.status === 'pending' && (
                      <div className="p-3 bg-white rounded border border-yellow-300">
                        <p className="text-sm text-black">
                          <span className="font-semibold">⏳ Waiting for Response:</span> The donor will review your claim and respond soon. You'll be notified once they accept or reject your claim.
                        </p>
                      </div>
                    )}

                    {userClaim.status === 'confirmed' && (
                      <div className="p-3 bg-green-50 rounded border border-green-300">
                        <p className="text-sm text-black">
                          <span className="font-semibold">🎉 Great News!</span> Your claim has been confirmed by the donor. Check your notifications for pickup details and contact information.
                        </p>
                      </div>
                    )}

                    {userClaim.status === 'rejected' && (
                      <div className="p-3 bg-red-50 rounded border border-red-300">
                        <p className="text-sm text-black">
                          <span className="font-semibold">❌ Claim Rejected:</span> Unfortunately, the donor has rejected your claim. You can browse other food listings or try claiming again if more food becomes available.
                        </p>
                      </div>
                    )}
                  </div>
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
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Location on Map</h3>
                      <button
                        onClick={() => {
                          const url = `https://www.google.com/maps/dir/?api=1&destination=${listing.location.lat},${listing.location.lng}&travelmode=driving`;
                          window.open(url, '_blank');
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <Navigation className="w-4 h-4" />
                        Directions
                      </button>
                    </div>
                    <MapboxComponent 
                      listing={listing}
                      height="300px"
                      zoom={14}
                    />
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-900 font-medium">
                        📍 {listing.location.address}
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        Coordinates: {listing.location.lat.toFixed(4)}, {listing.location.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
  );
}
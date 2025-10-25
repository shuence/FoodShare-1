'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
// import { db } from '@/lib/database-prisma';
import { FoodListing } from '@/types';
import { 
  Search,   
  MapPin, 
  Clock, 
  Package,
  Grid,
  List,
  SlidersHorizontal,
  Rows3,
} from 'lucide-react';
import MapboxComponent from '@/components/MapboxComponent';
import ListingCard from '@/components/ListingCard';

export default function BrowsePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [listings, setListings] = useState<FoodListing[]>([]);
  const [listingsWithClaims, setListingsWithClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('available');
  const [activeTab, setActiveTab] = useState('available');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map' | 'table'>('grid');
  const [showFilters, setShowFilters] = useState<boolean> (false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  const loadListings = useCallback(async () => {
    try {
      // Always load all listings without any filter
      const url = '/api/listings?status=all';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const loadedListings = data.listings || [];
        setListings(loadedListings);
        
        // Fetch claim information for each listing
        const listingsWithClaimsData = await Promise.all(
          loadedListings.map(async (listing: FoodListing) => {
            try {
              const claimsResponse = await fetch(`/api/claims?listingId=${listing.id}`);
              if (claimsResponse.ok) {
                const claimsData = await claimsResponse.json();
                const claims = claimsData.claims || [];
                
                // Get confirmed claim details if any
                const confirmedClaim = claims.find((c: any) => c.status === 'confirmed');
                
                return {
                  ...listing,
                  claims,
                  claimInfo: {
                    totalClaims: claims.length,
                    pendingClaims: claims.filter((c: any) => c.status === 'pending').length,
                    confirmedClaims: claims.filter((c: any) => c.status === 'confirmed').length,
                    claimerName: confirmedClaim?.receiver?.name,
                    claimerPhone: confirmedClaim?.receiver?.phone,
                  }
                };
              }
              return { ...listing, claims: [], claimInfo: { totalClaims: 0, pendingClaims: 0, confirmedClaims: 0 } };
            } catch (error) {
              console.error(`Error fetching claims for listing ${listing.id}:`, error);
              return { ...listing, claims: [], claimInfo: { totalClaims: 0, pendingClaims: 0, confirmedClaims: 0 } };
            }
          })
        );
        
        setListingsWithClaims(listingsWithClaimsData);
      } else {
        console.error('Failed to fetch listings');
        setListings([]);
        setListingsWithClaims([]);
      }
    } catch (error) {
      console.error('Error loading listings:', error);
      setListings([]);
      setListingsWithClaims([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  const filteredAndSortedListings = listingsWithClaims
    .filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           listing.foodType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || listing.foodType === filterType;
      // Show all listings regardless of status
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'expiring_soon':
          return new Date(a.expiryTime).getTime() - new Date(b.expiryTime).getTime();
        case 'pickup_soon':
          return new Date(a.pickupTime).getTime() - new Date(b.pickupTime).getTime();
        default:
          return 0;
      }
    });

  const handleListingClick = (listingId: string) => {
    router.push(`/listing/${listingId}`);
  };

  const handleMapListingSelect = (listing: FoodListing) => {
    // Don't navigate directly, just highlight the listing
    setSelectedListingId(listing.id);
    
    // Scroll to the listing if not in map view
    if (viewMode !== 'map') {
      const element = document.getElementById(`listing-${listing.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleClaimClick = (listingId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    router.push(`/listing/${listingId}`);
  };

  // Remove the user check - page is now public

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Browse Food</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Rows3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'map' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MapPin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        {/* Public Access Notice */}
        {!user && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-orange-900 mb-1">
                  Browse Food for Free
                </h3>
                <p className="text-orange-700">
                  You can view all available food listings. Sign up to claim food and start sharing!
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => router.push('/register')}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs - Hidden since showing all listings */}
        {/* Previously had tabs for Available/All, but now showing all by default */}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search food listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Types</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Bakery">Bakery</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
                <option value="Prepared">Prepared Food</option>
                <option value="Other">Other</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="expiring_soon">Expiring Soon</option>
                <option value="pickup_soon">Pickup Soon</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="all">Any Distance</option>
                    <option value="1">Within 1 mile</option>
                    <option value="5">Within 5 miles</option>
                    <option value="10">Within 10 miles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Time
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="all">Any Time</option>
                    <option value="1">Within 1 hour</option>
                    <option value="6">Within 6 hours</option>
                    <option value="24">Within 24 hours</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredAndSortedListings.length} food listing{filteredAndSortedListings.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading food listings...</p>
          </div>
        ) : viewMode === 'map' ? (
          <div className="bg-white rounded-lg shadow-sm">
            <MapboxComponent 
              allListings={filteredAndSortedListings}
              onListingSelect={handleMapListingSelect}
              height="600px"
            />
          </div>
        ) : viewMode === 'table' ? (
          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Food Item</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Pickup Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Expires</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedListings.map((listing: FoodListing) => (
                  <tr key={listing.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{listing.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{listing.foodType}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                        listing.status === 'available' 
                          ? 'bg-green-600'
                          : listing.status === 'claimed'
                          ? 'bg-amber-600'
                          : 'bg-gray-600'
                      }`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{listing.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(listing.pickupTime).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(listing.expiryTime).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">{listing.location.address}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleListingClick(listing.id)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : filteredAndSortedListings.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No food listings found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or check back later for new listings.
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredAndSortedListings.map((listing: FoodListing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                viewMode={viewMode as 'grid' | 'list' | 'table'}
                onViewDetails={handleListingClick}
                onClaimFood={handleClaimClick}
                isLoggedIn={!!user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

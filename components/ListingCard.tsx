import React from 'react';
import { FoodListing } from '@/types';
import { Package, MapPin, Clock, Star } from 'lucide-react';
import { formatRating, getRatingStars } from '@/lib/gemini-rating';

interface ListingCardProps {
  listing: FoodListing;
  viewMode?: 'grid' | 'list' | 'table';
  onViewDetails: (id: string) => void;
  onClaimFood: (id: string) => void;
  isLoggedIn: boolean;
}

export default function ListingCard({
  listing,
  viewMode = 'grid',
  onViewDetails,
  onClaimFood,
  isLoggedIn,
}: ListingCardProps) {
  return (
    <div
      onClick={() => onViewDetails(listing.id)}
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
        viewMode === 'list' ? 'p-6' : 'p-6'
      }`}
    >
      <div className={viewMode === 'list' ? 'flex space-x-6' : ''}>
        {/* Image */}
        {listing.imageUrl && (
          <div className="mb-4 -mx-6 -mt-6 -ml-6 mr-6">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-40 object-cover rounded-t-lg"
              onError={(e) => {
                // Handle broken images gracefully
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        <div className={viewMode === 'list' ? 'flex-1' : ''}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {listing.title}
              </h3>
              <div className="flex items-center space-x-2 mb-2 flex-wrap gap-2">
                <span className="px-2 py-1 bg-orange-500 text-orange-800 text-xs font-medium rounded-full">
                  {listing.foodType}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    listing.status === 'available'
                      ? 'bg-green-500 text-green-800'
                      : listing.status === 'claimed'
                      ? 'bg-yellow-500 text-yellow-800'
                      : 'bg-gray-500 text-gray-800'
                  }`}
                >
                  {listing.status}
                </span>

                {/* AI Rating Badge */}
                {listing.aiRating !== null && listing.aiRating !== undefined && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-blue-500 border border-blue-200 rounded-full">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-semibold text-blue-900">
                      {formatRating(listing.aiRating)}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {listing.description}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Package className="w-4 h-4 mr-2" />
              {listing.quantity}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {listing.location.address}
            </div>
            <div className="text-xs text-gray-500 ml-6">
              📍 {listing.location.lat.toFixed(4)}, {listing.location.lng.toFixed(4)}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              Pickup: {new Date(listing.pickupTime).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              Expires: {new Date(listing.expiryTime).toLocaleDateString()}
            </div>

            {/* Rating Stars Display */}
            {listing.aiRating !== null && listing.aiRating !== undefined && (
              <div className="flex items-center text-sm text-gray-600 pt-2 border-t border-gray-200">
                <span className="mr-2">AI Quality Rating:</span>
                <span className="text-lg tracking-wider">{getRatingStars(listing.aiRating)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(listing.id);
            }}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
          >
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClaimFood(listing.id);
            }}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
          >
            {isLoggedIn ? 'Claim Food' : 'Login to Claim'}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import { FoodListing } from '@/types';

interface EnhancedMapComponentProps {
  onListingSelect?: (listing: FoodListing) => void;
  selectedListing?: FoodListing | null;
  allListings?: FoodListing[];
  listing?: FoodListing | null;
  showNearby?: boolean;
  zoom?: number;
}

export default function EnhancedMapComponent({ 
  listing, 
  onListingSelect,
  selectedListing, 
  allListings,
  showNearby = true, 
  zoom = 14 
}: EnhancedMapComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border-2 border-dashed border-orange-300">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <MapPin className="w-16 h-16 text-orange-500 opacity-50" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-orange-600 mb-2">Map View</h3>
          <p className="text-gray-600 text-lg">Coming Soon</p>
          <p className="text-gray-500 text-sm mt-2">Map functionality will be available shortly</p>
        </div>
      </div>
    </div>
  );
}

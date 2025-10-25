'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { FoodListing } from '@/types';

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm">Loading map...</p>
      </div>
    </div>
  ),
});

interface MapInterfaceProps {
  onListingSelect?: (listing: FoodListing) => void;
  selectedListing?: FoodListing | null;
  allListings?: FoodListing[];
}

export default function MapInterface({ 
  onListingSelect, 
  selectedListing,
  allListings 
}: MapInterfaceProps) {
  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-200">
      <MapComponent 
        onListingSelect={onListingSelect}
        selectedListing={selectedListing}
        allListings={allListings}
      />
    </div>
  );
}

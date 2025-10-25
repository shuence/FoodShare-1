'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FoodListing } from '@/types';
import { MapPin } from 'lucide-react';

// Set your Mapbox access token here
// You can get one for free at https://www.mapbox.com/
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiZm9vZHNoYXJlIiwiYSI6ImNtNXN5ZG5pNTA0N2cyaXB4M2RxdTZzNGMifQ.example';

interface ListingWithClaims extends FoodListing {
  claims?: any[];
  claimInfo?: {
    totalClaims: number;
    pendingClaims: number;
    confirmedClaims: number;
    claimerName?: string;
    claimerPhone?: string;
  };
}

interface MapboxComponentProps {
  // For browse page: show all listings
  allListings?: ListingWithClaims[];
  // For listing detail page: show single listing
  listing?: ListingWithClaims | null;
  // Optional: show nearby listings on detail page
  showNearby?: boolean;
  nearbyListings?: ListingWithClaims[];
  // Callback when a listing marker is clicked
  onListingSelect?: (listing: ListingWithClaims) => void;
  // Map height
  height?: string;
  // Zoom level
  zoom?: number;
}

export default function MapboxComponent({
  allListings = [],
  listing,
  showNearby = false,
  nearbyListings = [],
  onListingSelect,
  height = '600px',
  zoom = 12,
}: MapboxComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapError, setMapError] = useState<string>('');

  // Determine which listings to display
  const displayListings = listing 
    ? [listing, ...(showNearby ? nearbyListings : [])] 
    : allListings;

  // Calculate center of map
  const getMapCenter = (): [number, number] => {
    if (listing) {
      return [listing.location.lng, listing.location.lat];
    }
    
    if (displayListings.length > 0) {
      const avgLng = displayListings.reduce((sum, l) => sum + l.location.lng, 0) / displayListings.length;
      const avgLat = displayListings.reduce((sum, l) => sum + l.location.lat, 0) / displayListings.length;
      return [avgLng, avgLat];
    }
    
    // Default to San Francisco
    return [-122.4194, 37.7749];
  };

  // Get color based on listing status
  const getMarkerColor = (listingItem: ListingWithClaims, isMainListing: boolean = false): string => {
    if (isMainListing) return '#ea580c'; // Orange for main listing
    
    switch (listingItem.status) {
      case 'available':
        return '#22c55e'; // Green
      case 'claimed':
        return '#eab308'; // Yellow
      case 'picked_up':
        return '#6b7280'; // Gray
      case 'expired':
        return '#ef4444'; // Red
      default:
        return '#3b82f6'; // Blue
    }
  };

  useEffect(() => {
    // Check if access token is set
    if (!mapboxgl.accessToken || mapboxgl.accessToken.includes('example')) {
      setMapError('Mapbox token not configured. Please set NEXT_PUBLIC_MAPBOX_TOKEN in your .env.local file.');
      return;
    }

    if (!mapContainer.current) return;

    // Initialize map
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: getMapCenter(),
        zoom: displayListings.length > 1 ? 11 : zoom,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add fullscreen control
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      // Wait for map to load before adding markers
      map.current.on('load', () => {
        addMarkers();
      });

      // Cleanup on unmount
      return () => {
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please check your internet connection.');
    }
  }, []);

  // Update markers when listings change
  useEffect(() => {
    if (map.current && map.current.loaded()) {
      addMarkers();
    }
  }, [displayListings, listing]);

  const addMarkers = () => {
    if (!map.current) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for each listing
    displayListings.forEach((listingItem, index) => {
      const isMainListing = listing ? listingItem.id === listing.id : false;
      const color = getMarkerColor(listingItem, isMainListing);

      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.cursor = 'pointer';
      el.style.width = isMainListing ? '40px' : '30px';
      el.style.height = isMainListing ? '40px' : '30px';
      
      // Create marker icon
      el.innerHTML = `
        <svg width="${isMainListing ? '40' : '30'}" height="${isMainListing ? '40' : '30'}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                stroke="white" stroke-width="0.5"/>
        </svg>
      `;

      // Create popup content with claim information and View Details button
      const claimInfo = listingItem.claimInfo;
      const hasActiveClaim = listingItem.status === 'claimed' && claimInfo?.claimerName;
      
      const popupContent = `
        <div class="p-3 max-w-sm">
          <h3 class="font-bold text-lg mb-2 text-black">${listingItem.title}</h3>
          <p class="text-sm text-gray-700 mb-3">${listingItem.description.substring(0, 100)}${listingItem.description.length > 100 ? '...' : ''}</p>
          
          <div class="text-sm space-y-2 text-black mb-3">
            <div class="flex justify-between">
              <span class="font-semibold text-black">Type:</span> 
              <span class="text-gray-700">${listingItem.foodType}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold text-black">Quantity:</span> 
              <span class="text-gray-700">${listingItem.quantity}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold text-black">Status:</span> 
              <span class="capitalize px-2 py-1 rounded text-xs font-medium ${
                listingItem.status === 'available' ? 'bg-green-100 text-green-800' :
                listingItem.status === 'claimed' ? 'bg-yellow-100 text-yellow-800' :
                listingItem.status === 'expired' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }">${listingItem.status}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold text-black">Location:</span> 
              <span class="text-gray-700 text-xs">${listingItem.location.address.substring(0, 30)}${listingItem.location.address.length > 30 ? '...' : ''}</span>
            </div>
          </div>
          
          ${claimInfo && claimInfo.totalClaims > 0 ? `
            <div class="border-t pt-2 mb-3">
              <div class="text-sm font-semibold text-black mb-2">📊 Claim Statistics:</div>
              <div class="grid grid-cols-3 gap-2 text-xs">
                <div class="bg-orange-50 p-2 rounded text-center">
                  <div class="font-bold text-orange-600">${claimInfo.totalClaims}</div>
                  <div class="text-gray-600">Total</div>
                </div>
                <div class="bg-yellow-50 p-2 rounded text-center">
                  <div class="font-bold text-yellow-600">${claimInfo.pendingClaims || 0}</div>
                  <div class="text-gray-600">Pending</div>
                </div>
                <div class="bg-green-50 p-2 rounded text-center">
                  <div class="font-bold text-green-600">${claimInfo.confirmedClaims || 0}</div>
                  <div class="text-gray-600">Confirmed</div>
                </div>
              </div>
            </div>
          ` : ''}
          
          ${hasActiveClaim ? `
            <div class="border-t pt-2 mb-3">
              <div class="text-sm font-semibold text-black mb-2">👤 Claimed By:</div>
              <div class="bg-blue-50 p-2 rounded">
                <div class="text-sm font-medium text-black">${claimInfo?.claimerName || 'Anonymous'}</div>
                ${claimInfo?.claimerPhone ? `<div class="text-xs text-gray-600">📞 ${claimInfo.claimerPhone}</div>` : ''}
              </div>
            </div>
          ` : ''}
          
          <button 
            onclick="window.location.href='/listing/${listingItem.id}'"
            class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm mt-2"
          >
            View Full Details →
          </button>
        </div>
      `;

      // Create popup
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        maxWidth: '350px'
      }).setHTML(popupContent);

      // Create marker
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([listingItem.location.lng, listingItem.location.lat])
        .setPopup(popup)
        .addTo(map.current!);

      // Add click handler
      el.addEventListener('click', () => {
        if (onListingSelect && !isMainListing) {
          onListingSelect(listingItem);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (displayListings.length > 1 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      displayListings.forEach(listingItem => {
        bounds.extend([listingItem.location.lng, listingItem.location.lat]);
      });
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 15 });
    }
  };

  if (mapError) {
    return (
      <div 
        className="flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border-2 border-orange-200"
        style={{ height }}
      >
        <div className="text-center space-y-4 p-6 max-w-md">
          <div className="flex justify-center">
            <MapPin className="w-16 h-16 text-orange-500 opacity-50" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-orange-600 mb-2">Map Configuration Required</h3>
            <p className="text-black text-sm font-medium">{mapError}</p>
            <div className="mt-4 p-3 bg-orange-100 rounded-lg text-left">
              <p className="text-sm text-black font-semibold mb-2">To enable maps:</p>
              <ol className="text-sm text-black space-y-1 list-decimal list-inside">
                <li>Get a free token at <a href="https://www.mapbox.com/" target="_blank" className="text-orange-600 underline font-semibold">mapbox.com</a></li>
                <li>Add to <code className="bg-white px-1 rounded text-black">.env.local</code>:</li>
              </ol>
              <code className="block mt-2 p-2 bg-white rounded text-sm text-black">
                NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
              </code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (displayListings.length === 0) {
    return (
      <div 
        className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300"
        style={{ height }}
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <MapPin className="w-16 h-16 text-gray-400 opacity-50" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-black mb-2">No Listings to Display</h3>
            <p className="text-black text-sm font-medium">There are no food listings available on the map</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <div 
        ref={mapContainer} 
        style={{ height }}
        className="w-full"
      />
      
      {/* Legend - Shows on hover */}
      <div className="absolute bottom-4 left-4 group">
        <div className="bg-white rounded-lg shadow-lg p-2 text-sm cursor-pointer">
          <div className="font-bold text-black">Legend</div>
        </div>
        <div className="hidden group-hover:block absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-3 text-sm w-40">
          <div className="space-y-1">
            {listing && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                <span className="text-black">This Location</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-black">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-black">Claimed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-black">Picked Up</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-black">Expired</span>
            </div>
          </div>
        </div>
      </div>

      {/* Listings count */}
      {displayListings.length > 0 && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-3 py-2 text-sm font-bold text-black">
          {displayListings.length} {displayListings.length === 1 ? 'listing' : 'listings'}
        </div>
      )}
    </div>
  );
}

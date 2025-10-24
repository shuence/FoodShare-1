'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FoodListing } from '@/types';
import { MapPin, Clock, Users } from 'lucide-react';

interface MapComponentProps {
  onListingSelect?: (listing: FoodListing) => void;
  selectedListing?: FoodListing | null;
}

export default function MapComponent({ onListingSelect, selectedListing: _selectedListing }: MapComponentProps) {
  const [listings, setListings] = useState<FoodListing[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Fetch listings from API
    const loadListings = async () => {
      try {
        const response = await fetch('/api/listings?status=available');
        if (response.ok) {
          const data = await response.json();
          setListings(data.listings || []);
        } else {
          console.error('Failed to fetch listings');
          setListings([]);
        }
      } catch (error) {
        console.error('Error loading listings:', error);
        setListings([]);
      }
    };

    loadListings();

    // Initialize location in a separate function to avoid setState in effect
    const initializeLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting location:', error);
            // Default to Mumbai if location access fails
            setUserLocation({ lat: 19.0760, lng: 72.8777 });
          }
        );
      } else {
        // Default to Mumbai
        setUserLocation({ lat: 19.0760, lng: 72.8777 });
      }
    };
    
    initializeLocation();
  }, []);

  const formatTime = (date: Date | string) => {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric',
    }).format(dateObj);
  };

  const getTimeUntilPickup = (pickupTime: Date | string) => {
    const dateObj = new Date(pickupTime);
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }
    const now = new Date();
    const diff = dateObj.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return 'Now';
    }
  };

  if (!userLocation) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {listings.map((listing) => {
        // Validate listing data before rendering
        if (!listing || !listing.location || !listing.pickupTime) {
          return null;
        }
        
        return (
          <Marker
            key={listing.id}
            position={[listing.location.lat, listing.location.lng]}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">{listing.title || 'Untitled'}</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {listing.foodType || 'Unknown'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{listing.description || 'No description available'}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{listing.quantity || 'Unknown'}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Pickup: {formatTime(listing.pickupTime)}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="truncate">{listing.location.address || 'Address not available'}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">
                    Available in {getTimeUntilPickup(listing.pickupTime)}
                  </span>
                  
                  {onListingSelect && (
                    <button
                      onClick={() => onListingSelect(listing)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

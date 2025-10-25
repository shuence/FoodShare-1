'use client';

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { AlertCircle, Loader2, MapPin } from 'lucide-react';

// Address data structure
export interface AddressData {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  lat: number;
  lng: number;
}

interface AddressAutocompleteProps {
  onAddressSelect: (data: AddressData) => void;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
  label?: string;
  apiKey?: string;
  countryRestriction?: string;
}

export interface AddressAutocompleteRef {
  getValue: () => string;
  clearValue: () => void;
}

// Global flags for script loading
let isGoogleMapsLoading = false;
let googleMapsLoadPromise: Promise<void> | null = null;

declare global {
  interface Window {
    google: any;
    initGoogleMapsAutocomplete: () => void;
  }
}

const AddressAutocomplete = forwardRef<AddressAutocompleteRef, AddressAutocompleteProps>(
  (
    {
      onAddressSelect,
      placeholder = 'Start typing your address...',
      disabled = false,
      defaultValue = '',
      label = 'Address',
      apiKey = 'AIzaSyAoRUy66bjv1d0xP8EPW5CwoRf8LOTyYYo',
      countryRestriction = 'in'
    },
    ref
  ) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [scriptError, setScriptError] = useState(false);
    const [inputValue, setInputValue] = useState(defaultValue);
    const addressInputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<any>(null);

    // Load Google Maps script
    useEffect(() => {
      const loadGoogleMaps = async () => {
        // Check if already loaded
        if (window.google?.maps?.places) {
          setIsScriptLoaded(true);
          initializeAutocomplete();
          return;
        }

        // Check if loading in progress
        if (isGoogleMapsLoading && googleMapsLoadPromise) {
          try {
            await googleMapsLoadPromise;
            setIsScriptLoaded(true);
            initializeAutocomplete();
          } catch (error) {
            console.error('Error loading Google Maps:', error);
            setScriptError(true);
          }
          return;
        }

        // Check if script exists in DOM
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
          const checkInterval = setInterval(() => {
            if (window.google?.maps?.places) {
              setIsScriptLoaded(true);
              initializeAutocomplete();
              clearInterval(checkInterval);
            }
          }, 100);
          setTimeout(() => clearInterval(checkInterval), 10000);
          return;
        }

        // Load script
        isGoogleMapsLoading = true;
        googleMapsLoadPromise = new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMapsAutocomplete`;
          script.async = true;
          script.defer = true;

          window.initGoogleMapsAutocomplete = () => {
            isGoogleMapsLoading = false;
            resolve();
          };

          script.onerror = () => {
            isGoogleMapsLoading = false;
            reject(new Error('Failed to load Google Maps'));
          };

          document.head.appendChild(script);
        });

        try {
          await googleMapsLoadPromise;
          setIsScriptLoaded(true);
          initializeAutocomplete();
        } catch (error) {
          console.error('Failed to load Google Maps:', error);
          setScriptError(true);
        }
      };

      loadGoogleMaps();
    }, [apiKey]);

    // Initialize autocomplete
    const initializeAutocomplete = () => {
      try {
        if (!window.google?.maps?.places || !addressInputRef.current) {
          return;
        }

        const autocomplete = new window.google.maps.places.Autocomplete(
          addressInputRef.current,
          {
            types: ['establishment', 'geocode'],
            componentRestrictions: { country: countryRestriction },
            fields: ['formatted_address', 'address_components', 'geometry', 'name']
          }
        );

        autocompleteRef.current = autocomplete;

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();

          if (!place.geometry) {
            console.warn('No geometry for selected place');
            return;
          }

          // Parse address components
          let locality = '';
          let city = '';
          let state = '';
          let postalCode = '';
          let country = '';

          for (const component of place.address_components || []) {
            const type = component.types[0];

            switch (type) {
              case 'locality':
                locality = component.long_name;
                break;
              case 'administrative_area_level_2':
                city = city || component.long_name;
                break;
              case 'administrative_area_level_1':
                state = component.long_name;
                break;
              case 'postal_code':
                postalCode = component.long_name;
                break;
              case 'country':
                country = component.long_name;
                break;
            }
          }

          // Collect all address components
          const allComponents: string[] = [];
          
          // Add place name if available
          if (place.name) {
            allComponents.push(place.name);
          }
          
          for (const component of place.address_components || []) {
            allComponents.push(component.long_name);
          }
          
          // Create address string with all components
          const addressString = allComponents.join(', ');

          const finalCity = locality || city;

          setInputValue(addressString);

          // Callback with parsed data
          onAddressSelect({
            address: addressString,
            city: finalCity,
            state,
            postalCode,
            country: country || 'India',
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });
        });
      } catch (error) {
        console.error('Error initializing autocomplete:', error);
        setScriptError(true);
      }
    };

    useImperativeHandle(ref, () => ({
      getValue: () => inputValue,
      clearValue: () => setInputValue('')
    }));

    return (
      <div className="space-y-2">
        {!isScriptLoaded && !scriptError && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-sm text-blue-700">Loading address autocomplete...</span>
          </div>
        )}

        {scriptError && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-700">
              Failed to load address autocomplete. Please enter manually.
            </span>
          </div>
        )}

        <div>
          {label && <label htmlFor="address-input" className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
          <div className="relative">
            <input
              id="address-input"
              ref={addressInputRef}
              type="text"
              placeholder={placeholder}
              disabled={disabled || !isScriptLoaded}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-black"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          {isScriptLoaded && (
            <p className="text-sm text-gray-500 mt-1">
              Start typing to get suggestions from Google Maps
            </p>
          )}
        </div>
      </div>
    );
  }
);

AddressAutocomplete.displayName = 'AddressAutocomplete';

export default AddressAutocomplete;

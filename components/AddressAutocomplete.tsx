'use client';

import React from 'react';

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string, lat: number, lng: number) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Enter your address",
  className = "",
  required = false
}: AddressAutocompleteProps) {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Use default coordinates for India (Delhi) for manual input
    onChange(inputValue, 28.6139, 77.2090);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        required={required}
        className={`appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-600 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
}
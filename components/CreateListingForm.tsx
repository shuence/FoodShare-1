'use client';

import React, { useState, useRef } from 'react';
import { Clock, Package, FileText, Image as ImageIcon } from 'lucide-react';
import { FoodListing } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import AddressAutocomplete, { AddressData, AddressAutocompleteRef } from '@/components/AddressAutocomplete';

interface CreateListingFormProps {
  onListingCreated?: (listing: FoodListing) => void;
  onClose?: () => void;
}

export default function CreateListingForm({ onListingCreated, onClose }: CreateListingFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    foodType: '',
    quantity: '',
    pickupTime: '',
    expiryTime: '',
    address: user?.location?.address || '',
    lat: user?.location?.lat || 40.7128,
    lng: user?.location?.lng || -74.0060,
    image: null as File | null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = async () => {
          try {
            const base64String = reader.result as string;
            const response = await fetch('/api/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                image: base64String,
                filename: file.name,
              }),
            });

            if (!response.ok) {
              throw new Error('Failed to upload image');
            }

            const data = await response.json();
            resolve(data.imageUrl);
          } catch (error) {
            console.error('Error uploading image:', error);
            reject(error);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.pickupTime || !formData.expiryTime) return;

    setLoading(true);
    try {
      const pickupTime = new Date(formData.pickupTime);
      const expiryTime = new Date(formData.expiryTime);

      // Upload image if provided
      let imageUrl: string | undefined;
      if (formData.image) {
        imageUrl = (await uploadImage(formData.image)) || undefined;
      }

      // Call the API endpoint to create listing
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorId: user.id,
          title: formData.title,
          description: formData.description,
          foodType: formData.foodType,
          quantity: formData.quantity,
          location: {
            lat: formData.lat,
            lng: formData.lng,
            address: formData.address,
          },
          pickupTime: pickupTime.toISOString(),
          expiryTime: expiryTime.toISOString(),
          status: 'available',
          imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create listing');
      }

      const data = await response.json();
      const newListing = data.listing;

      onListingCreated?.(newListing);
      onClose?.();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        foodType: '',
        quantity: '',
        pickupTime: '',
        expiryTime: '',
        address: user?.location?.address || '',
        lat: user?.location?.lat || 40.7128,
        lng: user?.location?.lng || -74.0060,
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Error creating listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressSelect = (addressData: AddressData) => {
    console.log('Address selected:', addressData);
    setFormData(prev => ({
      ...prev,
      address: addressData.address,
      lat: addressData.lat,
      lng: addressData.lng,
    }));
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Minimum 30 minutes from now
    return now.toISOString().slice(0, 16);
  };

  const getMaxDateTime = () => {
    const now = new Date();
    now.setDate(now.getDate() + 7); // Maximum 7 days from now
    return now.toISOString().slice(0, 16);
  };

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Please log in to create a listing.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Create Food Listing</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Package className="inline w-4 h-4 mr-1" />
            Food Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Fresh Vegetables, Bread, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FileText className="inline w-4 h-4 mr-1" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the food items, condition, etc."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <ImageIcon className="inline w-4 h-4 mr-1" />
            Food Image
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Choose Image
            </button>
            {formData.image && (
              <span className="text-sm text-gray-600">{formData.image.name}</span>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {imagePreview && (
            <div className="mt-3 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-40 rounded-md border border-gray-300"
              />
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, image: null }));
                  setImagePreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="mt-1 text-xs text-red-600 hover:text-red-800 underline"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Type
            </label>
            <select
              name="foodType"
              value={formData.foodType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
              required
            >
              <option value="" className="text-gray-900">Select type</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Bakery">Bakery</option>
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Prepared">Prepared Food</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="e.g., 5 lbs, 2 bags"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 placeholder-gray-400"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Clock className="inline w-4 h-4 mr-1" />
            Pickup Time
          </label>
          <input
            type="datetime-local"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleInputChange}
            min={getMinDateTime()}
            max={getMaxDateTime()}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Clock className="inline w-4 h-4 mr-1" />
            Expiry Time
          </label>
          <input
            type="datetime-local"
            name="expiryTime"
            value={formData.expiryTime}
            onChange={handleInputChange}
            min={formData.pickupTime || getMinDateTime()}
            max={getMaxDateTime()}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
            required
          />
        </div>

        <div>
          <label htmlFor="address-autocomplete" className="block text-sm font-medium text-gray-700 mb-1">
            📍 Pickup Address
          </label>
          <AddressAutocomplete
            onAddressSelect={handleAddressSelect}
            placeholder="Enter pickup address"
            label=""
            defaultValue={formData.address}
          />
          {formData.address && (
            <div className="mt-2 p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-xs text-blue-900 font-medium mb-1">Selected Address:</p>
              <p className="text-sm text-blue-800">{formData.address}</p>
              <p className="text-xs text-blue-700 mt-1">Lat: {formData.lat.toFixed(4)}, Lng: {formData.lng.toFixed(4)}</p>
            </div>
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
          
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

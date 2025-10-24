'use client';

import React, { useState } from 'react';
import { Clock, Package, FileText } from 'lucide-react';
import { FoodListing } from '@/types';
import { db } from '@/lib/database-prisma';
import { useAuth } from '@/contexts/AuthContext';
import AddressAutocomplete from '@/components/AddressAutocomplete';

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
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const pickupTime = new Date(formData.pickupTime);
      const expiryTime = new Date(formData.expiryTime);

      const newListing = await db.createListing({
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
        pickupTime,
        expiryTime,
        status: 'available',
      });

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
      });
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

  const handleAddressChange = (address: string, lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      address,
      lat,
      lng,
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-600"
            required
          />
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select type</option>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-600"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <AddressAutocomplete
            value={formData.address}
            onChange={handleAddressChange}
            placeholder="Enter pickup address"
            required
          />
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

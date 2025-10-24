'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardNavbar from '@/components/DashboardNavbar';
import CreateListingForm from '@/components/CreateListingForm';
import { FoodListing } from '@/types';

export default function CreateListingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  // const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const handleListingCreated = (newListing: FoodListing) => {
    console.log('New listing created:', newListing);
    // Redirect to dashboard or listings page
    router.push('/dashboard/listings');
  };

  const handleClose = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardNavbar 
        title="Share Food" 
        subtitle="Create a new food listing" 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Create Food Listing</h2>
            <p className="text-gray-600">
              Share your excess food with the community. Help reduce waste and feed those in need.
            </p>
          </div>

          <CreateListingForm
            onListingCreated={handleListingCreated}
            onClose={handleClose as () => void | undefined}
          />
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}

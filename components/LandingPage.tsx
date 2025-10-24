'use client';

import React from 'react';
import { Map, Package, Heart, Users, Clock, Shield } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-orange-100 p-4 rounded-full">
                <Heart className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Connect Communities Through Food
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Share surplus food with your community or find fresh food near you. 
              Together, we can reduce waste and build stronger communities.
            </p>
            
            <button
              onClick={onGetStarted}
              className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
            >
              Join FoodShare Today
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How FoodShare Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to share food and reduce waste in your community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Package className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Share Food</h3>
              <p className="text-gray-600">
                Have surplus food? List it on our map and help feed your community. 
                Set pickup times and let others know what&apos;s available.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Map className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Find Food</h3>
              <p className="text-gray-600">
                Discover fresh food available near you from local donors and businesses. 
                Browse the interactive map to see what&apos;s available in your area.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Build Community</h3>
              <p className="text-gray-600">
                Connect with neighbors and local organizations. 
                Build relationships while reducing food waste in your community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose FoodShare?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h3>
                    <p className="text-gray-600">
                      Get instant notifications when food becomes available or when someone claims your listing.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Safe & Secure</h3>
                    <p className="text-gray-600">
                      All users are verified and the platform includes safety features to ensure secure food sharing.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Impact</h3>
                    <p className="text-gray-600">
                      Help reduce food waste while supporting local communities and those in need.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Join Thousands of Users</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Food items shared</span>
                  <span className="font-semibold text-green-600">10,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Communities served</span>
                  <span className="font-semibold text-green-600">500+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Waste reduced (lbs)</span>
                  <span className="font-semibold text-green-600">50,000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join FoodShare today and start connecting with your community through food sharing.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}

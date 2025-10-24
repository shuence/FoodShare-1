import { db } from '@/lib/database-prisma';

const mockListings = [
  {
    donorId: 'user-1',
    title: 'Fresh Organic Vegetables',
    description: 'Assorted fresh vegetables from my garden including tomatoes, cucumbers, and lettuce. All organic and pesticide-free.',
    foodType: 'Vegetables',
    quantity: '5 lbs',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '123 Main Street, New York, NY 10001'
    },
    pickupTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    status: 'available'
  },
  {
    donorId: 'user-2',
    title: 'Fresh Bread and Pastries',
    description: 'Freshly baked bread, croissants, and muffins from local bakery. Still warm and delicious!',
    foodType: 'Bakery',
    quantity: '2 bags',
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: '456 Broadway, New York, NY 10013'
    },
    pickupTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
    expiryTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    status: 'available'
  },
  {
    donorId: 'user-3',
    title: 'Mixed Fruits Basket',
    description: 'Fresh seasonal fruits including apples, oranges, bananas, and grapes. Perfect for smoothies or snacking.',
    foodType: 'Fruits',
    quantity: '3 lbs',
    location: {
      lat: 40.7505,
      lng: -73.9934,
      address: '789 5th Avenue, New York, NY 10022'
    },
    pickupTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
    expiryTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
    status: 'available'
  },
  {
    donorId: 'user-4',
    title: 'Dairy Products',
    description: 'Fresh milk, cheese, and yogurt. All within expiration date and properly refrigerated.',
    foodType: 'Dairy',
    quantity: '4 items',
    location: {
      lat: 40.7484,
      lng: -73.9857,
      address: '321 Park Avenue, New York, NY 10010'
    },
    pickupTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    expiryTime: new Date(Date.now() + 36 * 60 * 60 * 1000), // 36 hours from now
    status: 'available'
  },
  {
    donorId: 'user-5',
    title: 'Prepared Meals',
    description: 'Home-cooked meals including pasta, rice dishes, and soups. Perfect for dinner tonight!',
    foodType: 'Prepared',
    quantity: '6 servings',
    location: {
      lat: 40.7505,
      lng: -73.9715,
      address: '654 Lexington Avenue, New York, NY 10022'
    },
    pickupTime: new Date(Date.now() + 1.5 * 60 * 60 * 1000), // 1.5 hours from now
    expiryTime: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
    status: 'available'
  },
  {
    donorId: 'user-6',
    title: 'Fresh Herbs and Spices',
    description: 'Assorted fresh herbs including basil, parsley, cilantro, and various spices. Great for cooking!',
    foodType: 'Other',
    quantity: '1 bag',
    location: {
      lat: 40.7614,
      lng: -73.9776,
      address: '987 Madison Avenue, New York, NY 10075'
    },
    pickupTime: new Date(Date.now() + 2.5 * 60 * 60 * 1000), // 2.5 hours from now
    expiryTime: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours from now
    status: 'available'
  },
  {
    donorId: 'user-7',
    title: 'Sandwiches and Wraps',
    description: 'Fresh sandwiches and wraps from local deli. Various options including vegetarian and meat options.',
    foodType: 'Prepared',
    quantity: '8 pieces',
    location: {
      lat: 40.7282,
      lng: -73.9857,
      address: '147 1st Avenue, New York, NY 10003'
    },
    pickupTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    expiryTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    status: 'available'
  },
  {
    donorId: 'user-8',
    title: 'Fresh Salad Mix',
    description: 'Pre-washed mixed greens, cherry tomatoes, and salad dressing. Ready to eat!',
    foodType: 'Vegetables',
    quantity: '2 containers',
    location: {
      lat: 40.7282,
      lng: -73.9857,
      address: '258 2nd Avenue, New York, NY 10003'
    },
    pickupTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
    expiryTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
    status: 'available'
  },
  {
    donorId: 'user-9',
    title: 'Protein Bars and Snacks',
    description: 'Various protein bars, nuts, and healthy snacks. Perfect for on-the-go nutrition.',
    foodType: 'Other',
    quantity: '12 items',
    location: {
      lat: 40.7505,
      lng: -73.9715,
      address: '369 3rd Avenue, New York, NY 10016'
    },
    pickupTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
    expiryTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    status: 'available'
  },
  {
    donorId: 'user-10',
    title: 'Fresh Juice and Smoothies',
    description: 'Freshly made fruit juices and smoothies. Various flavors available including green smoothies.',
    foodType: 'Other',
    quantity: '6 bottles',
    location: {
      lat: 40.7282,
      lng: -73.9857,
      address: '741 4th Avenue, New York, NY 10003'
    },
    pickupTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    expiryTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    status: 'available'
  }
];

async function addMockListings() {
  try {
    console.log('Adding mock listings...');
    
    for (const listing of mockListings) {
      await db.createListing(listing);
      console.log(`Added listing: ${listing.title}`);
    }
    
    console.log('Successfully added all mock listings!');
  } catch (error) {
    console.error('Error adding mock listings:', error);
  }
}

// Run the script
addMockListings();

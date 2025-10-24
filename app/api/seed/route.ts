import { NextResponse } from 'next/server';
import { db } from '@/lib/database-prisma';

const mockUsers = [
  {
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'donor' as const,
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: '123 Linking Road, Bandra West, Mumbai 400050'
    },
    phone: '+91-98765-43210'
  },
  {
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    role: 'donor' as const,
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: '456 Connaught Place, New Delhi 110001'
    },
    phone: '+91-98765-43211'
  },
  {
    name: 'Anita Patel',
    email: 'anita@example.com',
    role: 'donor' as const,
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: '789 Brigade Road, Bangalore 560001'
    },
    phone: '+91-98765-43212'
  },
  {
    name: 'Suresh Reddy',
    email: 'suresh@example.com',
    role: 'donor' as const,
    location: {
      lat: 17.3850,
      lng: 78.4867,
      address: '321 Banjara Hills, Hyderabad 500034'
    },
    phone: '+91-98765-43213'
  },
  {
    name: 'Kavita Singh',
    email: 'kavita@example.com',
    role: 'donor' as const,
    location: {
      lat: 22.5726,
      lng: 88.3639,
      address: '654 Park Street, Kolkata 700016'
    },
    phone: '+91-98765-43214'
  },
  {
    name: 'Vikram Joshi',
    email: 'vikram@example.com',
    role: 'donor' as const,
    location: {
      lat: 26.9124,
      lng: 75.7873,
      address: '987 C-Scheme, Jaipur 302001'
    },
    phone: '+91-98765-43215'
  },
  {
    name: 'Meera Iyer',
    email: 'meera@example.com',
    role: 'donor' as const,
    location: {
      lat: 13.0827,
      lng: 80.2707,
      address: '147 T. Nagar, Chennai 600017'
    },
    phone: '+91-98765-43216'
  },
  {
    name: 'Arjun Gupta',
    email: 'arjun@example.com',
    role: 'donor' as const,
    location: {
      lat: 18.5204,
      lng: 73.8567,
      address: '258 Koregaon Park, Pune 411001'
    },
    phone: '+91-98765-43217'
  },
  {
    name: 'Sunita Agarwal',
    email: 'sunita@example.com',
    role: 'donor' as const,
    location: {
      lat: 23.0225,
      lng: 72.5714,
      address: '369 CG Road, Ahmedabad 380006'
    },
    phone: '+91-98765-43218'
  },
  {
    name: 'Ravi Nair',
    email: 'ravi@example.com',
    role: 'donor' as const,
    location: {
      lat: 8.5241,
      lng: 76.9366,
      address: '741 MG Road, Kochi 682001'
    },
    phone: '+91-98765-43219'
  },
  {
    name: 'Deepak Sharma',
    email: 'deepak@example.com',
    role: 'receiver' as const,
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: '555 Andheri West, Mumbai 400058'
    },
    phone: '+91-98765-43220'
  },
  {
    name: 'Pooja Mehta',
    email: 'pooja@example.com',
    role: 'receiver' as const,
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: '777 Lajpat Nagar, New Delhi 110024'
    },
    phone: '+91-98765-43221'
  }
];

const mockListings = [
  {
    title: 'Fresh Indian Vegetables',
    description: 'Fresh vegetables from local market including tomatoes, onions, potatoes, and green leafy vegetables. Perfect for Indian cooking.',
    foodType: 'Vegetables',
    quantity: '2 kg',
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: '123 Linking Road, Bandra West, Mumbai 400050'
    },
    pickupTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    status: 'available' as const
  },
  {
    title: 'Fresh Rotis and Parathas',
    description: 'Freshly made rotis, parathas, and naan from home. Still warm and perfect with dal or curry.',
    foodType: 'Bakery',
    quantity: '15 pieces',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: '456 Connaught Place, New Delhi 110001'
    },
    pickupTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
    expiryTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    status: 'available' as const
  },
  {
    title: 'Seasonal Indian Fruits',
    description: 'Fresh seasonal fruits including mangoes, bananas, guavas, and pomegranates. Great for making fruit chaat or smoothies.',
    foodType: 'Fruits',
    quantity: '3 kg',
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: '789 Brigade Road, Bangalore 560001'
    },
    pickupTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
    expiryTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
    status: 'available' as const
  },
  {
    title: 'Fresh Dairy Products',
    description: 'Fresh milk, paneer, and yogurt from local dairy. All within expiration date and properly refrigerated.',
    foodType: 'Dairy',
    quantity: '1 liter milk + 500g paneer',
    location: {
      lat: 17.3850,
      lng: 78.4867,
      address: '321 Banjara Hills, Hyderabad 500034'
    },
    pickupTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    expiryTime: new Date(Date.now() + 36 * 60 * 60 * 1000), // 36 hours from now
    status: 'available' as const
  },
  {
    title: 'Home-cooked Indian Meals',
    description: 'Delicious home-cooked meals including dal, rice, sabzi, and roti. Perfect for lunch or dinner.',
    foodType: 'Prepared',
    quantity: '4 servings',
    location: {
      lat: 22.5726,
      lng: 88.3639,
      address: '654 Park Street, Kolkata 700016'
    },
    pickupTime: new Date(Date.now() + 1.5 * 60 * 60 * 1000), // 1.5 hours from now
    expiryTime: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
    status: 'available' as const
  },
  {
    title: 'Fresh Indian Spices and Herbs',
    description: 'Fresh coriander, mint, curry leaves, and various Indian spices. Perfect for authentic Indian cooking.',
    foodType: 'Other',
    quantity: '1 bunch each',
    location: {
      lat: 26.9124,
      lng: 75.7873,
      address: '987 C-Scheme, Jaipur 302001'
    },
    pickupTime: new Date(Date.now() + 2.5 * 60 * 60 * 1000), // 2.5 hours from now
    expiryTime: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours from now
    status: 'available' as const
  },
  {
    title: 'Fresh Samosas and Pakoras',
    description: 'Freshly made samosas, pakoras, and other Indian snacks. Perfect for evening tea time.',
    foodType: 'Prepared',
    quantity: '20 pieces',
    location: {
      lat: 13.0827,
      lng: 80.2707,
      address: '147 T. Nagar, Chennai 600017'
    },
    pickupTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    expiryTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    status: 'available' as const
  },
  {
    title: 'Fresh Indian Salad',
    description: 'Fresh cucumber, tomato, onion salad with lemon and chaat masala. Ready to eat!',
    foodType: 'Vegetables',
    quantity: '2 bowls',
    location: {
      lat: 18.5204,
      lng: 73.8567,
      address: '258 Koregaon Park, Pune 411001'
    },
    pickupTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
    expiryTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
    status: 'available' as const
  },
  {
    title: 'Indian Dry Snacks',
    description: 'Various Indian dry snacks including namkeen, biscuits, and traditional sweets. Perfect for munching.',
    foodType: 'Other',
    quantity: '500g mixed',
    location: {
      lat: 23.0225,
      lng: 72.5714,
      address: '369 CG Road, Ahmedabad 380006'
    },
    pickupTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
    expiryTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    status: 'available' as const
  },
  {
    title: 'Fresh Indian Juices',
    description: 'Freshly made Indian fruit juices including mango, orange, and mixed fruit. No preservatives added.',
    foodType: 'Other',
    quantity: '6 glasses',
    location: {
      lat: 8.5241,
      lng: 76.9366,
      address: '741 MG Road, Kochi 682001'
    },
    pickupTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    expiryTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    status: 'available' as const
  }
];

export async function POST() {
  try {
    console.log('🌱 Seeding database with mock data...');
    
    // Clear existing data first
    console.log('🧹 Clearing existing data...');
    await db.clearAllData();
    
    // Add users first
    console.log('👥 Adding mock users...');
    const createdUsers = [];
    for (const user of mockUsers) {
      const createdUser = await db.createUser(user);
      createdUsers.push(createdUser);
      console.log(`✅ Added user: ${user.name} (${user.role})`);
    }
    
    // Add listings with proper donor IDs
    console.log('🍎 Adding mock listings...');
    for (let i = 0; i < mockListings.length; i++) {
      const listing = mockListings[i];
      const donorId = createdUsers[i]?.id || `user-${i + 1}`;
      
      const listingData = {
        ...listing,
        donorId: donorId
      };
      
      await db.createListing(listingData);
      console.log(`✅ Added listing: ${listing.title}`);
    }
    
    console.log('🎉 Successfully seeded database!');
    console.log(`📊 Added ${createdUsers.length} users and ${mockListings.length} listings`);
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully added ${createdUsers.length} users and ${mockListings.length} listings`,
      users: createdUsers.length,
      listings: mockListings.length
    });
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

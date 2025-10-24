import { db } from '@/lib/database-prisma';

const mockUsers = [
  {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'donor',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '123 Main Street, New York, NY 10001'
    },
    phone: '+1-555-0101'
  },
  {
    name: 'Mike Chen',
    email: 'mike@example.com',
    role: 'donor',
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: '456 Broadway, New York, NY 10013'
    },
    phone: '+1-555-0102'
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    role: 'donor',
    location: {
      lat: 40.7505,
      lng: -73.9934,
      address: '789 5th Avenue, New York, NY 10022'
    },
    phone: '+1-555-0103'
  },
  {
    name: 'David Kim',
    email: 'david@example.com',
    role: 'donor',
    location: {
      lat: 40.7484,
      lng: -73.9857,
      address: '321 Park Avenue, New York, NY 10010'
    },
    phone: '+1-555-0104'
  },
  {
    name: 'Lisa Thompson',
    email: 'lisa@example.com',
    role: 'donor',
    location: {
      lat: 40.7505,
      lng: -73.9715,
      address: '654 Lexington Avenue, New York, NY 10022'
    },
    phone: '+1-555-0105'
  },
  {
    name: 'James Wilson',
    email: 'james@example.com',
    role: 'donor',
    location: {
      lat: 40.7614,
      lng: -73.9776,
      address: '987 Madison Avenue, New York, NY 10075'
    },
    phone: '+1-555-0106'
  },
  {
    name: 'Maria Garcia',
    email: 'maria@example.com',
    role: 'donor',
    location: {
      lat: 40.7282,
      lng: -73.9857,
      address: '147 1st Avenue, New York, NY 10003'
    },
    phone: '+1-555-0107'
  },
  {
    name: 'Robert Brown',
    email: 'robert@example.com',
    role: 'donor',
    location: {
      lat: 40.7282,
      lng: -73.9857,
      address: '258 2nd Avenue, New York, NY 10003'
    },
    phone: '+1-555-0108'
  },
  {
    name: 'Jennifer Davis',
    email: 'jennifer@example.com',
    role: 'donor',
    location: {
      lat: 40.7505,
      lng: -73.9715,
      address: '369 3rd Avenue, New York, NY 10016'
    },
    phone: '+1-555-0109'
  },
  {
    name: 'Michael Taylor',
    email: 'michael@example.com',
    role: 'donor',
    location: {
      lat: 40.7282,
      lng: -73.9857,
      address: '741 4th Avenue, New York, NY 10003'
    },
    phone: '+1-555-0110'
  },
  {
    name: 'Alex Receiver',
    email: 'alex@example.com',
    role: 'receiver',
    location: {
      lat: 40.7505,
      lng: -73.9715,
      address: '555 Food Street, New York, NY 10016'
    },
    phone: '+1-555-0201'
  },
  {
    name: 'Emma Helper',
    email: 'emma@example.com',
    role: 'receiver',
    location: {
      lat: 40.7282,
      lng: -73.9857,
      address: '777 Help Avenue, New York, NY 10003'
    },
    phone: '+1-555-0202'
  }
];

async function addMockUsers() {
  try {
    console.log('Adding mock users...');
    
    for (const user of mockUsers) {
      await db.createUser(user);
      console.log(`Added user: ${user.name} (${user.role})`);
    }
    
    console.log('Successfully added all mock users!');
  } catch (error) {
    console.error('Error adding mock users:', error);
  }
}

// Run the script
addMockUsers();

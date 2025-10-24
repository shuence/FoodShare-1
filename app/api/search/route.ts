import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database-prisma';

// GET /api/search - Search listings by various criteria
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const foodType = searchParams.get('foodType');
    // const location = searchParams.get('location');
    // const radius = searchParams.get('radius') || '10'; // km

    // For now, we'll get all available listings and filter them
    // In a real app, you'd implement proper search with MongoDB text search or Elasticsearch
    const listings = await db.getAvailableListings();

    let filteredListings = listings;

    // Filter by food type
    if (foodType && foodType !== 'all') {
      filteredListings = filteredListings.filter(listing => 
        listing.foodType.toLowerCase().includes(foodType.toLowerCase())
      );
    }

    // Filter by search query
    if (query) {
      filteredListings = filteredListings.filter(listing => 
        listing.title.toLowerCase().includes(query.toLowerCase()) ||
        listing.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Note: Location-based filtering would require more complex logic
    // For now, we'll return all filtered results

    return NextResponse.json({ 
      listings: filteredListings,
      total: filteredListings.length 
    }, { status: 200 });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

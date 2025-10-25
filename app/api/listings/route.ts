import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database-prisma';
import { FoodListing } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'available';
    const donorId = searchParams.get('donorId');
    const id = searchParams.get('id');
    let listings: FoodListing[] | FoodListing | null = null;
    
    if (id) {
      const singleListing = await db.getListing(id);
      if (singleListing) {
        listings = singleListing;
      } else {
        return NextResponse.json({ listings: null, error: 'Listing not found' }, { status: 404 });
      }
    } else if (donorId) {
      listings = await db.getListingsByDonor(donorId);
    } else if (status === 'available') {
      listings = await db.getAvailableListings();
    } else if (status === 'all') {
      listings = await db.getAllListings();
    } else {
      listings = await db.getAllListings();
    }
    
    return NextResponse.json({ listings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newListing = await db.createListing({
      donorId: body.donorId,
      title: body.title,
      description: body.description,
      foodType: body.foodType,
      quantity: body.quantity,
      location: body.location,
      pickupTime: new Date(body.pickupTime),
      expiryTime: new Date(body.expiryTime),
      status: body.status || 'available',
      imageUrl: body.imageUrl,
    });

    return NextResponse.json({ listing: newListing }, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
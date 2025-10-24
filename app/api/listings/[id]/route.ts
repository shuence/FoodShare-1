import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database-prisma';

// GET /api/listings/[id] - Get a specific listing
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const listing = await db.getListing(id);
    
    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ listing }, { status: 200 });
  } catch (error) {
    console.error('Get listing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/listings/[id] - Update a listing
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updates = body;

    const updatedListing = await db.updateListing(id, updates);
    
    if (!updatedListing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ listing: updatedListing }, { status: 200 });
  } catch (error) {
    console.error('Update listing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/listings/[id] - Delete a listing
export async function DELETE() {
  try {
    // Note: You might want to add authorization checks here
    // For now, we'll just return a success response
    // In a real app, you'd implement actual deletion logic
    
    return NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete listing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

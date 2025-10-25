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

    const listing = await db.getListing(id);
    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    const updatedListing = await db.updateListing(id, updates);
    
    if (!updatedListing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Create notification for the donor about the update
    if (updates.status === 'picked_up') {
      await db.createNotification({
        userId: listing.donorId,
        type: 'claim_completed',
        title: 'Food Picked Up',
        message: `Your listing "${listing.title}" has been marked as picked up.`,
        listingId: id,
        read: false,
      });
      
      // Also notify the receiver
      if (listing.claimedBy) {
        await db.createNotification({
          userId: listing.claimedBy,
          type: 'claim_completed',
          title: 'Pickup Completed',
          message: `Thank you for picking up "${listing.title}". We hope you enjoyed it!`,
          listingId: id,
          read: false,
        });
      }
    } else if (updates.status === 'expired') {
      await db.createNotification({
        userId: listing.donorId,
        type: 'listing_expired',
        title: 'Listing Expired',
        message: `Your listing "${listing.title}" has expired.`,
        listingId: id,
        read: false,
      });
    } else {
      // General update notification
      await db.createNotification({
        userId: listing.donorId,
        type: 'listing_updated',
        title: 'Listing Updated',
        message: `Your listing "${listing.title}" has been updated successfully.`,
        listingId: id,
        read: false,
      });
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
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Get listing before deleting to send notification
    const listing = await db.getListing(id);
    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // For now, mark as deleted/expired instead of actually deleting
    // You can implement actual deletion in the database service later
    await db.updateListing(id, { status: 'expired' });

    // Notify the donor
    await db.createNotification({
      userId: listing.donorId,
      type: 'listing_deleted',
      title: 'Listing Deleted',
      message: `Your listing "${listing.title}" has been deleted.`,
      read: false,
    });

    // If listing was claimed, notify the receiver
    if (listing.claimedBy) {
      await db.createNotification({
        userId: listing.claimedBy,
        type: 'listing_deleted',
        title: 'Listing No Longer Available',
        message: `The listing "${listing.title}" you claimed has been removed by the donor.`,
        read: false,
      });
    }
    
    return NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete listing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

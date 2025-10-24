import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database-prisma';

// GET /api/claims - Get claims
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const listingId = searchParams.get('listingId');
    const receiverId = searchParams.get('receiverId');

    let claims;
    if (listingId) {
      claims = await db.getClaimsByListing(listingId);
    } else if (receiverId) {
      claims = await db.getClaimsByReceiver(receiverId);
    } else {
      return NextResponse.json(
        { error: 'Either listingId or receiverId is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({ claims }, { status: 200 });
  } catch (error) {
    console.error('Get claims error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/claims - Create a new claim
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { listingId, receiverId, message } = body;

    // Validate required fields
    if (!listingId || !receiverId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if listing exists and is available
    const listing = await db.getListing(listingId);
    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    if (listing.status !== 'available') {
      return NextResponse.json(
        { error: 'Listing is no longer available' },
        { status: 400 }
      );
    }

    const newClaim = await db.createClaim({
      listingId,
      receiverId,
      status: 'pending',
      message,
    });

    // Update listing status to claimed
    await db.updateListing(listingId, {
      status: 'claimed',
      claimedBy: receiverId,
      claimedAt: new Date(),
    });

    // Create notification for the donor
    await db.createNotification({
      userId: listing.donorId,
      type: 'claim_request',
      title: 'New Claim Request',
      message: `Someone has claimed your listing: ${listing.title}`,
      listingId,
      claimId: newClaim.id,
      read: false,
    }); 

    // The SSE stream will automatically pick up this new notification
    // and broadcast it to the donor's connected clients

    return NextResponse.json({ claim: newClaim }, { status: 201 });
  } catch (error) {
    console.error('Create claim error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

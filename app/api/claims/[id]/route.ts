import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database-prisma';
import { Notification } from '@/types';

// GET /api/claims/[id] - Get a specific claim
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const claim = await db.getClaim(id);
    
    if (!claim) {
      return NextResponse.json(
        { error: 'Claim not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ claim }, { status: 200 });
  } catch (error) {
    console.error('Get claim error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/claims/[id] - Update a claim (approve/reject)
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['confirmed', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be "confirmed" or "rejected"' },
        { status: 400 }
      );
    }

    const updatedClaim = await db.updateClaim(id, {
      status,
      confirmedAt: status === 'confirmed' ? new Date() : new Date(0),
    });
    
    if (!updatedClaim) {
      return NextResponse.json(
        { error: 'Claim not found' },
        { status: 404 }
      );
    }

    // Create notification for the receiver
    await db.createNotification({
      userId: updatedClaim.receiverId,
      read: false,
      type: status === 'confirmed' ? 'claim_confirmed' : 'claim_rejected',
      title: status === 'confirmed' ? 'Claim Confirmed' : 'Claim Rejected',
      message: status === 'confirmed' 
        ? 'Your claim has been confirmed by the donor'
        : 'Your claim has been rejected by the donor',
      claimId: updatedClaim.id,
    } as Notification);

    return NextResponse.json({ claim: updatedClaim }, { status: 200 });
  } catch (error) {
    console.error('Update claim error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

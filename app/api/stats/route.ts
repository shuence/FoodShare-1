import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database-prisma';

// GET /api/stats - Get application statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let stats = {};

    if (userId) {
      // Get user-specific stats
      const userListings = await db.getListingsByDonor(userId);
      const userClaims = await db.getClaimsByReceiver(userId);
      const userNotifications = await db.getNotificationsByUser(userId);

      stats = {
        user: {
          listings: userListings.length,
          claims: userClaims.length,
          unreadNotifications: userNotifications.filter(n => !n.read).length,
        }
      };
    } else {
      // Get global stats
      const allListings = await db.getAvailableListings();
      
      stats = {
        global: {
          totalListings: allListings.length,
          availableListings: allListings.filter(l => l.status === 'available').length,
          claimedListings: allListings.filter(l => l.status === 'claimed').length,
        }
      };
    }

    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

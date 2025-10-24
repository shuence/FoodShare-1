import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    // Mock activity data for now
    const activity = [
      {
        id: 1,
        type: 'listing',
        title: 'Fresh Vegetables Shared',
        description: 'You shared 5 lbs of organic vegetables',
        time: '2 hours ago',
        status: 'completed',
      },
      {
        id: 2,
        type: 'claim',
        title: 'Bread Claimed',
        description: 'You claimed fresh bread from Sarah',
        time: '1 day ago',
        status: 'completed',
      },
      {
        id: 3,
        type: 'listing',
        title: 'Fruits Available',
        description: 'Your fruit basket is ready for pickup',
        time: '2 days ago',
        status: 'pending',
      },
    ];
    
    return NextResponse.json({ 
      success: true, 
      activity,
      count: activity.length 
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      activity: []
    }, { status: 500 });
  }
}

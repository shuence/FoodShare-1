export type UserRole = 'donor' | 'receiver';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  phone?: string;
  createdAt: Date;
}

export type FoodListingStatus = 'available' | 'claimed' | 'picked_up' | 'expired';

export interface FoodListing {
  id: string;
  donorId: string;
  title: string;
  description: string;
  foodType: string;
  quantity: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  pickupTime: Date;
  expiryTime: Date;
  status: FoodListingStatus;
  claimedBy?: string;
  claimedAt?: Date;
  createdAt: Date;
  imageUrl?: string;
  aiRating?: number;
}

export interface Claim {
  id: string;
  listingId: string;
  receiverId: string;
  status: 'pending' | 'confirmed' | 'rejected';
  message?: string;
  createdAt: Date;
  confirmedAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 
    | 'claim_request' 
    | 'claim_confirmed' 
    | 'claim_rejected' 
    | 'claim_completed'
    | 'listing_expired'
    | 'listing_created'
    | 'listing_updated'
    | 'listing_deleted'
    | 'message_received'
    | 'reminder';
  title: string;
  message: string;
  listingId?: string;
  claimId?: string;
  read: boolean;
  createdAt: Date;
}

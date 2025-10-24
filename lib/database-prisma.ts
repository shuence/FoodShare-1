import { prisma } from './prisma';
import { User, FoodListing, Claim, Notification } from '@/types';

// Database operations using Prisma
export class DatabaseService {
  getAllListings(): FoodListing | FoodListing[] | PromiseLike<FoodListing | FoodListing[] | null> | null {
    throw new Error('Method not implemented.');
  }
  // User operations
  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        location: userData.location,
        phone: userData.phone,
      },
    });
    return user as User;
  }

  async getUser(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user as User | null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user as User | null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = await prisma.user.update({
      where: { id },
      data: updates,
    });
    return user as User;
  }

  // Food listing operations
  async createListing(listingData: Omit<FoodListing, 'id' | 'createdAt'>): Promise<FoodListing> {
    const listing = await prisma.foodListing.create({
      data: {
        donorId: listingData.donorId,
        title: listingData.title,
        description: listingData.description,
        foodType: listingData.foodType,
        quantity: listingData.quantity,
        location: listingData.location,
        pickupTime: listingData.pickupTime,
        expiryTime: listingData.expiryTime,
        status: listingData.status,
        claimedBy: listingData.claimedBy,
        claimedAt: listingData.claimedAt,
        imageUrl: listingData.imageUrl,
      },
    });
    return listing as FoodListing;
  }

  async getListing(id: string): Promise<FoodListing | null> {
    const listing = await prisma.foodListing.findUnique({
      where: { id },
    });
    return listing as FoodListing | null;
  }

  async getListingsByDonor(donorId: string): Promise<FoodListing[]> {
    const listings = await prisma.foodListing.findMany({
      where: { donorId },
      orderBy: { createdAt: 'desc' },
    });
    return listings as FoodListing[];
  }

  async getAvailableListings(): Promise<FoodListing[]> {
    const listings = await prisma.foodListing.findMany({
      where: {
        status: 'available',
        expiryTime: { gt: new Date() },
      },
      orderBy: { pickupTime: 'asc' },
    });
    return listings as FoodListing[];
  }

  async updateListing(id: string, updates: Partial<FoodListing>): Promise<FoodListing | null> {
    const listing = await prisma.foodListing.update({
      where: { id },
      data: updates,
    });
    return listing as FoodListing;
  }

  // Claim operations
  async createClaim(claimData: Omit<Claim, 'id' | 'createdAt'>): Promise<Claim> {
    const claim = await prisma.claim.create({
      data: {
        listingId: claimData.listingId,
        receiverId: claimData.receiverId,
        status: claimData.status,
        message: claimData.message,
        confirmedAt: claimData.confirmedAt,
      },
    });
    return claim as Claim;
  }

  async getClaim(id: string): Promise<Claim | null> {
    const claim = await prisma.claim.findUnique({
      where: { id },
    });
    return claim as Claim | null;
  }

  async getClaimsByListing(listingId: string): Promise<Claim[]> {
    const claims = await prisma.claim.findMany({
      where: { listingId },
      orderBy: { createdAt: 'desc' },
    });
    return claims as Claim[];
  }

  async getClaimsByReceiver(receiverId: string): Promise<Claim[]> {
    const claims = await prisma.claim.findMany({
      where: { receiverId },
      orderBy: { createdAt: 'desc' },
    });
    return claims as Claim[];
  }

  async updateClaim(id: string, updates: Partial<Claim>): Promise<Claim | null> {
    const claim = await prisma.claim.update({
      where: { id },
      data: updates,
    });
    return claim as Claim;
  }

  // Notification operations
  async createNotification(notificationData: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    const notification = await prisma.notification.create({
      data: {
        userId: notificationData.userId,
        type: notificationData.type,
        title: notificationData.title,
        message: notificationData.message,
        listingId: notificationData.listingId,
        claimId: notificationData.claimId,
        read: notificationData.read,
      },
    });
    return notification as Notification;
  }

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return notifications as Notification[];
  }

  async markNotificationAsRead(id: string): Promise<Notification | null> {
    const notification = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });
    return notification as Notification;
  }

  // Clear all data (for seeding)
  async clearAllData(): Promise<void> {
    await prisma.notification.deleteMany();
    await prisma.claim.deleteMany();
    await prisma.foodListing.deleteMany();
    await prisma.user.deleteMany();
  }

}

// Export singleton instance
export const db = new DatabaseService();

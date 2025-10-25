import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles image uploads for food listings
 * Supports base64 encoded images in the request body
 * 
 * Expected request format:
 * {
 *   "image": "base64_encoded_image_string",
 *   "filename": "listing_image.jpg"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, filename } = body;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // For now, we'll use a simple approach: store the base64 image URL
    // In production, you would want to:
    // 1. Upload to a cloud storage service (e.g., AWS S3, Google Cloud Storage, Cloudinary)
    // 2. Or save to a local directory with proper security considerations
    // 3. Return the URL for storing in the database

    // This is a temporary solution using data URLs
    // For production, integrate with a proper storage service
    const imageUrl = `data:image/jpeg;base64,${image.split(',').pop()}`;

    // Alternative: For a production setup with external storage
    // const uploadResult = await uploadToCloudStorage(image, filename);
    // const imageUrl = uploadResult.url;

    return NextResponse.json(
      {
        success: true,
        imageUrl: imageUrl,
        message: 'Image uploaded successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload image' },
      { status: 500 }
    );
  }
}

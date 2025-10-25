import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

interface RatingRequest {
  title: string;
  description: string;
  foodType: string;
  quantity: string;
  imageUrl?: string;
}

/**
 * Generate an AI-based rating for a food listing using Gemini 2.5 Flash
 * Rating is between 0-5 based on:
 * - Food type and freshness indicators
 * - Description quality and completeness
 * - Quantity appropriateness
 * - Image quality (if provided)
 */
export async function generateFoodListingRating(request: RatingRequest): Promise<number> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are a food quality and listing quality evaluator. Based on the following food listing information and image (if provided), provide a quality rating from 0 to 5 (with decimal places allowed, e.g., 4.2).

Food Listing Details:
- Title: ${request.title}
- Food Type: ${request.foodType}
- Description: ${request.description}
- Quantity: ${request.quantity}

Rating Criteria:
1. Food freshness and quality indicators in description (0-5)
2. Completeness and clarity of listing information (0-5)
3. Appropriate quantity for sharing (0-5)
4. Image quality if available (0-5)

Provide your response in the following JSON format:
{
  "rating": <number between 0-5>,
  "reasoning": "<brief explanation of the rating>",
  "categories": {
    "freshness": <0-5>,
    "completeness": <0-5>,
    "quantity": <0-5>,
    "image_quality": <0-5 or null if no image>
  }
}

Consider:
- Positive factors: mentions freshness, today's date, specific preparation details, good quantity, clear allergen info, professional food photography, appetizing presentation
- Negative factors: vague descriptions, unclear quantity, potential safety concerns, poor image quality, food not visible
- Image factors: check clarity, food presentation quality, portion visibility, freshness indicators visible in photo

Return only the JSON object, no additional text.`;

    // Build content array with text and image
    const content: any[] = [{ text: prompt }];

    // If there's an image URL, add it to the content
    if (request.imageUrl) {
      // Check if it's a base64 encoded image
      if (request.imageUrl.startsWith('data:image')) {
        // Parse base64 image
        const matches = request.imageUrl.match(/^data:image\/(\w+);base64,(.+)$/);
        if (matches) {
          const imageType = matches[1];
          const base64Data = matches[2];
          
          // Map image type to MIME type
          const mimeTypeMap: { [key: string]: string } = {
            'jpeg': 'image/jpeg',
            'jpg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'webp': 'image/webp'
          };
          
          const mimeType = mimeTypeMap[imageType] || 'image/jpeg';
          
          content.push({
            inlineData: {
              mimeType,
              data: base64Data
            }
          });
        }
      } else {
        // If it's a URL, try to fetch it
        try {
          const response = await fetch(request.imageUrl);
          const buffer = await response.arrayBuffer();
          const base64 = Buffer.from(buffer).toString('base64');
          const contentType = response.headers.get('content-type') || 'image/jpeg';
          
          content.push({
            inlineData: {
              mimeType: contentType,
              data: base64
            }
          });
        } catch (fetchError) {
          console.warn('Failed to fetch image from URL:', fetchError);
        }
      }
    }

    const result = await model.generateContent(content);
    const responseText = result.response.text();

    // Parse the JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Failed to extract JSON from Gemini response:', responseText);
      return 3.0; // Default middle rating
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);
    const rating = Math.min(5, Math.max(0, parseFloat(parsedResponse.rating)));

    console.log(`Food listing rating generated: ${rating}/5`, parsedResponse.reasoning);
    return rating;
  } catch (error) {
    console.error('Error generating food listing rating:', error);
    // Return a neutral rating if there's an error
    return 3.0;
  }
}

/**
 * Format rating for display
 */
export function formatRating(rating: number | null | undefined): string {
  if (rating === null || rating === undefined) {
    return 'N/A';
  }
  return rating.toFixed(1);
}

/**
 * Get star representation of rating
 */
export function getRatingStars(rating: number | null | undefined): string {
  if (rating === null || rating === undefined) {
    return '☆☆☆☆☆';
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let stars = '⭐'.repeat(fullStars);
  if (hasHalfStar) stars += '⭐';
  stars += '☆'.repeat(emptyStars);

  return stars;
}

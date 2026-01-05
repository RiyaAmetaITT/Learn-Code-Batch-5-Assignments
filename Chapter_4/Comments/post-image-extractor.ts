import { TumblrPost, PostImageResult } from './types';

/**
 * Selects the highest quality image URL available from a photo object.
 * Checks URLs in order of quality (highest to lowest).
 * 
 * @param photo - Photo object with various quality URL options
 * @returns The best quality image URL, or null if no URL is available
 */
function selectBestQualityImageUrl(photo: {
    'photo-url-1280'?: string;
    'photo-url-500'?: string;
    'photo-url-400'?: string;
    'photo-url-250'?: string;
    'photo-url-100'?: string;
    [key: string]: any;
}): string | null {
    if (photo['photo-url-1280']) return photo['photo-url-1280'];
    if (photo['photo-url-500']) return photo['photo-url-500'];
    if (photo['photo-url-400']) return photo['photo-url-400'];
    if (photo['photo-url-250']) return photo['photo-url-250'];
    if (photo['photo-url-100']) return photo['photo-url-100'];
    return null;
}

/**
 * Extracts all image URLs from a single Tumblr post.
 * Only processes photo-type posts. Handles both single photos and photo sets.
 * 
 * @param post - The Tumblr post to extract images from
 * @returns Array of image URLs (empty array if post has no images or is not a photo post)
 */
export function extractImageUrlsFromTumblrPost(post: TumblrPost): string[] {
    const imageUrls: string[] = [];
    
    if (post.type !== 'photo') {
        return imageUrls;
    }
    
    if (post.photos && Array.isArray(post.photos) && post.photos.length > 0) {
        post.photos.forEach(photo => {
            const url = selectBestQualityImageUrl(photo);
            if (url) {
                imageUrls.push(url);
            }
        });
    } else {
        const url = selectBestQualityImageUrl(post);
        if (url) {
            imageUrls.push(url);
        }
    }
    
    return imageUrls;
}

/**
 * Extracts image URLs from multiple posts and returns results with post numbers.
 * Only includes posts that have images. Post numbers are 1-indexed.
 * 
 * @param posts - Array of Tumblr posts to process
 * @param startPostNumber - The starting post number (1-indexed, inclusive)
 * @param endPostNumber - The ending post number (1-indexed, inclusive)
 * @returns Array of PostImageResult objects, one per post that contains images
 */
export function extractImageUrlsFromTumblrPosts(posts: TumblrPost[], startPostNumber: number, endPostNumber: number): PostImageResult[] {
    const results: PostImageResult[] = [];
    let currentPostNumber = startPostNumber;
    
    for (const post of posts) {
        if (currentPostNumber > endPostNumber) {
            break;
        }
        
        const imageUrls = extractImageUrlsFromTumblrPost(post);
        if (imageUrls.length > 0) {
            results.push({
                postNumber: currentPostNumber,
                imageUrls: imageUrls
            });
        }
        
        currentPostNumber++;
    }
    
    return results;
}


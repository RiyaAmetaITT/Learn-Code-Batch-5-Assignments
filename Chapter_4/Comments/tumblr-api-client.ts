import { TumblrApiResponse, TumblrPost } from './types';
import { throwErrorWithContext } from './error-handler';
import { parseTumblrApiResponse } from './tumblr-response-parser';

const TUMBLR_API_BATCH_SIZE = 50;

export async function fetchTumblrBlogData(blogName: string, startIndex: number = 0, count: number = 50): Promise<TumblrApiResponse> {
    const apiUrl = `https://${blogName}.tumblr.com/api/read/json?start=${startIndex}&num=${count}`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseText = await response.text();
        return parseTumblrApiResponse(responseText);
    } catch (error) {
        throwErrorWithContext(error, 'Failed to fetch Tumblr blog data');
    }
}

export async function fetchTumblrPostsInRange(blogName: string, startPost: number, endPost: number): Promise<TumblrPost[]> {
    const apiStartIndex = startPost - 1;
    const totalPostsToFetch = endPost - startPost + 1;
    const allPosts: TumblrPost[] = [];
    
    let currentStartIndex = apiStartIndex;
    let remainingPosts = totalPostsToFetch;
    
    while (remainingPosts > 0) {
        const batchSize = Math.min(remainingPosts, TUMBLR_API_BATCH_SIZE);
        const apiResponse = await fetchTumblrBlogData(blogName, currentStartIndex, batchSize);
        const posts = apiResponse.posts || [];
        
        allPosts.push(...posts);
        
        if (posts.length < batchSize) {
            break;
        }
        
        currentStartIndex += batchSize;
        remainingPosts -= batchSize;
    }
    
    return allPosts;
}


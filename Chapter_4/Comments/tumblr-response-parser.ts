import { TumblrApiResponse } from './types';
import { throwErrorWithContext } from './error-handler';

/**
 * Extracts the JSON string from Tumblr API response.
 * Tumblr API wraps JSON in a JavaScript variable assignment that needs to be extracted.
 * 
 * @param responseText - The raw response text from Tumblr API
 * @returns The extracted JSON string
 * @throws Error if the JSON cannot be extracted from the response
 */
export function extractJsonFromTumblrResponse(responseText: string): string {
    const jsonMatch = responseText.match(/var\s+tumblr_api_read\s*=\s*({[\s\S]*});?\s*$/);
    
    if (!jsonMatch || !jsonMatch[1]) {
        throw new Error('Invalid API response format - could not extract JSON');
    }
    
    return jsonMatch[1];
}

export function validateTumblrApiResponse(parsed: any): TumblrApiResponse {
    if (!parsed.tumblelog || !Array.isArray(parsed.posts)) {
        throw new Error('Invalid response structure: expected object with tumblelog and posts');
    }
    
    return parsed as TumblrApiResponse;
}

export function parseTumblrApiResponse(responseText: string): TumblrApiResponse {
    try {
        const jsonString = extractJsonFromTumblrResponse(responseText);
        const parsed = JSON.parse(jsonString);
        return validateTumblrApiResponse(parsed);
    } catch (error) {
        throwErrorWithContext(error, 'Failed to parse Tumblr API response');
    }
}


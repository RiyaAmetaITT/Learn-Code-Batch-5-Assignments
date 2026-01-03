import * as readline from 'readline';

interface TumblrTumblelog {
    title: string;
    description: string;
    name: string;
    'total-posts'?: number;
    [key: string]: any;
}

interface TumblrPost {
    'id': string;
    'url': string;
    'type': string;
    'photo-url-1280'?: string;
    'photo-url-500'?: string;
    'photo-url-400'?: string;
    'photo-url-250'?: string;
    'photo-url-100'?: string;
    'photo-url-75sq'?: string;
    'photos'?: Array<{
        'photo-url-1280'?: string;
        'photo-url-500'?: string;
        'photo-url-400'?: string;
        'photo-url-250'?: string;
        'photo-url-100'?: string;
        'photo-url-75sq'?: string;
        [key: string]: any;
    }>;
    [key: string]: any;
}

interface TumblrApiResponse {
    tumblelog: TumblrTumblelog;
    'posts-start': number;
    'posts-total': number;
    'posts-type': boolean;
    posts: TumblrPost[];
    [key: string]: any;
}

interface PostImageResult {
    postNumber: number;
    imageUrls: string[];
}

interface PostRange {
    start: number;
    end: number;
}

const API_BATCH_SIZE = 50;

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}

function handleError(error: unknown, context?: string): never {
    const message = context 
        ? `${context}: ${getErrorMessage(error)}`
        : getErrorMessage(error);
    throw new Error(message);
}

function logAndExit(error: unknown): never {
    console.error(`Error: ${getErrorMessage(error)}`);
    process.exit(1);
}

function extractJsonFromResponse(responseText: string): string {
    const jsonMatch = responseText.match(/var\s+tumblr_api_read\s*=\s*({[\s\S]*});?\s*$/);
    
    if (!jsonMatch || !jsonMatch[1]) {
        throw new Error('Invalid API response format - could not extract JSON');
    }
    
    return jsonMatch[1];
}

function validateApiResponse(parsed: any): TumblrApiResponse {
    if (!parsed.tumblelog || !Array.isArray(parsed.posts)) {
        throw new Error('Invalid response structure: expected object with tumblelog and posts');
    }
    
    return parsed as TumblrApiResponse;
}

function parseTumblrResponse(responseText: string): TumblrApiResponse {
    try {
        const jsonString = extractJsonFromResponse(responseText);
        const parsed = JSON.parse(jsonString);
        return validateApiResponse(parsed);
    } catch (error) {
        handleError(error, 'Failed to parse JSON');
    }
}

async function fetchBlogData(blogName: string, startIndex: number = 0, count: number = 50): Promise<TumblrApiResponse> {
    const apiUrl = `https://${blogName}.tumblr.com/api/read/json?start=${startIndex}&num=${count}`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseText = await response.text();
        return parseTumblrResponse(responseText);
    } catch (error) {
        handleError(error, 'Failed to fetch blog data');
    }
}

function getBestQualityImageUrl(photo: {
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

function extractImageUrlsFromPost(post: TumblrPost): string[] {
    const imageUrls: string[] = [];
    
    if (post.type !== 'photo') {
        return imageUrls;
    }
    
    if (post.photos && Array.isArray(post.photos) && post.photos.length > 0) {
        post.photos.forEach(photo => {
            const url = getBestQualityImageUrl(photo);
            if (url) {
                imageUrls.push(url);
            }
        });
    } else {
        const url = getBestQualityImageUrl(post);
        if (url) {
            imageUrls.push(url);
        }
    }
    
    return imageUrls;
}

function extractImagesFromPosts(posts: TumblrPost[], startPostNumber: number, endPostNumber: number): PostImageResult[] {
    const results: PostImageResult[] = [];
    let currentPostNumber = startPostNumber;
    
    for (const post of posts) {
        if (currentPostNumber > endPostNumber) {
            break;
        }
        
        const imageUrls = extractImageUrlsFromPost(post);
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

async function fetchPostsInRange(blogName: string, startPost: number, endPost: number): Promise<TumblrPost[]> {
    const apiStartIndex = startPost - 1;
    const totalPostsToFetch = endPost - startPost + 1;
    const allPosts: TumblrPost[] = [];
    
    let currentStartIndex = apiStartIndex;
    let remainingPosts = totalPostsToFetch;
    
    while (remainingPosts > 0) {
        const batchSize = Math.min(remainingPosts, API_BATCH_SIZE);
        const apiResponse = await fetchBlogData(blogName, currentStartIndex, batchSize);
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

async function fetchPostImages(blogName: string, startPost: number, endPost: number): Promise<PostImageResult[]> {
    const posts = await fetchPostsInRange(blogName, startPost, endPost);
    return extractImagesFromPosts(posts, startPost, endPost);
}

function createReadlineInterface(): readline.Interface {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function promptUser(rl: readline.Interface, question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

function parsePostRange(rangeInput: string): PostRange {
    const parts = rangeInput.split('-');
    if (parts.length !== 2) {
        throw new Error('Invalid range format. Please use format: start-end (e.g., 1-5)');
    }
    
    const start = parseInt(parts[0].trim(), 10);
    const end = parseInt(parts[1].trim(), 10);
    
    if (isNaN(start) || isNaN(end)) {
        throw new Error('Range must contain valid numbers');
    }
    
    if (start < 1) {
        throw new Error('Start post number must be at least 1');
    }
    
    if (end < start) {
        throw new Error('End post number must be greater than or equal to start post number');
    }
    
    return { start, end };
}

function getTotalPosts(blogData: TumblrApiResponse): number {
    return blogData['posts-total'] || blogData.tumblelog['total-posts'] || 0;
}

function displayBlogInfo(blogInfo: TumblrTumblelog, totalPosts: number): void {
    console.log(`title: ${blogInfo.title || ''}`);
    console.log(`name: ${blogInfo.name}`);
    console.log(`description: ${blogInfo.description || ''}`);
    console.log(`no of post: ${totalPosts}`);
    console.log();
}

function displayImageUrls(postImages: PostImageResult[]): void {
    for (const { postNumber, imageUrls } of postImages) {
        imageUrls.forEach((url, index) => {
            if (index === 0) {
                console.log(`${postNumber}. ${url}`);
            } else {
                console.log(`   ${url}`);
            }
        });
    }
}

async function main(): Promise<void> {
    const readLineInterface = createReadlineInterface();
    
    try {
        const blogName = await promptUser(readLineInterface, 'enter the Tumblr blog name: ');
        
        if (!blogName) {
            throw new Error('Blog name cannot be empty');
        }
        
        console.log();
        
        const rangeInput = await promptUser(readLineInterface, 'enter the range: ');
        console.log();
        
        const { start, end } = parsePostRange(rangeInput);
        
        console.log('Fetching blog information...');
        const blogData = await fetchBlogData(blogName, 0, 1);
        const blogInfo = blogData.tumblelog;
        const totalPosts = getTotalPosts(blogData);
        
        if (end > totalPosts) {
            throw new Error(`End post number (${end}) exceeds total posts (${totalPosts})`);
        }
        
        displayBlogInfo(blogInfo, totalPosts);
        
        console.log('Fetching post images...');
        const postImages = await fetchPostImages(blogName, start, end);
        displayImageUrls(postImages);
        
    } catch (error) {
        logAndExit(error);
    } finally {
        readLineInterface.close();
    }
}

if (require.main === module) {
    main().catch(logAndExit);
}


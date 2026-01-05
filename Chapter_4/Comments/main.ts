import { TumblrApiResponse, PostImageResult } from './types';
import { logErrorAndExit } from './error-handler';
import { fetchTumblrBlogData, fetchTumblrPostsInRange } from './tumblr-api-client';
import { extractImageUrlsFromTumblrPosts } from './post-image-extractor';
import { createReadlineInterface, promptUserInput, parsePostRangeInput, displayTumblrBlogInfo, displayPostImageUrls } from './cli-interface';

function getTotalPostCount(blogData: TumblrApiResponse): number {
    return blogData['posts-total'] || blogData.tumblelog['total-posts'] || 0;
}

async function fetchTumblrPostImageUrls(blogName: string, startPost: number, endPost: number): Promise<PostImageResult[]> {
    const posts = await fetchTumblrPostsInRange(blogName, startPost, endPost);
    return extractImageUrlsFromTumblrPosts(posts, startPost, endPost);
}

async function main(): Promise<void> {
    const readLineInterface = createReadlineInterface();
    
    try {
        const blogName = await promptUserInput(readLineInterface, 'enter the Tumblr blog name: ');
        
        if (!blogName) {
            throw new Error('Blog name cannot be empty');
        }
        
        console.log();
        
        const rangeInput = await promptUserInput(readLineInterface, 'enter the range: ');
        console.log();
        
        const { start, end } = parsePostRangeInput(rangeInput);
        
        console.log('Fetching blog information...');
        const blogData = await fetchTumblrBlogData(blogName, 0, 1);
        const blogInfo = blogData.tumblelog;
        const totalPosts = getTotalPostCount(blogData);
        
        if (end > totalPosts) {
            throw new Error(`End post number (${end}) exceeds total posts (${totalPosts})`);
        }
        
        displayTumblrBlogInfo(blogInfo, totalPosts);
        
        console.log('Fetching post images...');
        const postImages = await fetchTumblrPostImageUrls(blogName, start, end);
        displayPostImageUrls(postImages);
        
    } catch (error) {
        logErrorAndExit(error);
    } finally {
        readLineInterface.close();
    }
}

if (require.main === module) {
    main().catch(logErrorAndExit);
}


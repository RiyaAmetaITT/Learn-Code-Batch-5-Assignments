/**
 * Command-line interface utilities for user interaction and output display.
 * 
 * Handles reading user input from stdin and formatting output to stdout.
 */

import * as readline from 'readline';
import { TumblrTumblelog, PostImageResult, PostRange } from './types';

/**
 * Creates a readline interface for reading user input from the command line.
 * 
 * @returns Configured readline interface connected to stdin/stdout
 */
export function createReadlineInterface(): readline.Interface {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

export function promptUserInput(rl: readline.Interface, question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

export function parsePostRangeInput(rangeInput: string): PostRange {
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

export function displayTumblrBlogInfo(blogInfo: TumblrTumblelog, totalPosts: number): void {
    console.log(`title: ${blogInfo.title || ''}`);
    console.log(`name: ${blogInfo.name}`);
    console.log(`description: ${blogInfo.description || ''}`);
    console.log(`no of post: ${totalPosts}`);
    console.log();
}

export function displayPostImageUrls(postImages: PostImageResult[]): void {
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


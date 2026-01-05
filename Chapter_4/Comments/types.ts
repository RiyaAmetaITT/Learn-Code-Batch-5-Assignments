export interface TumblrTumblelog {
    title: string;
    description: string;
    name: string;
    'total-posts'?: number;
    [key: string]: any;
}

export interface TumblrPost {
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

export interface TumblrApiResponse {
    tumblelog: TumblrTumblelog;
    'posts-start': number;
    'posts-total': number;
    'posts-type': boolean;
    posts: TumblrPost[];
    [key: string]: any;
}

export interface PostImageResult {
    postNumber: number;
    imageUrls: string[];
}

export interface PostRange {
    start: number;
    end: number;
}


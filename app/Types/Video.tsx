export interface YouTubeSearchListResponse {
	kind: string;
	etag: string;
	nextPageToken: string;
	regionCode: string;
	pageInfo: PageInfo;
	items: YouTubeSearchResult[];
}

export interface PageInfo {
	totalResults: number;
	resultsPerPage: number;
}

export interface YouTubeSearchResult {
	kind: string;
	etag: string;
	id: VideoId;
	snippet: Snippet;
}

export interface VideoId {
	kind: string;
	videoId: string;
}

export interface Snippet {
	publishedAt: string;
	channelId: string;
	title: string;
	description: string;
	thumbnails: Thumbnails;
	channelTitle: string;
	liveBroadcastContent: string;
	publishTime: string;
}

export interface Thumbnails {
	default: Thumbnail;
	medium: Thumbnail;
	high: Thumbnail;
}

export interface Thumbnail {
	url: string;
	width: number;
	height: number;
}

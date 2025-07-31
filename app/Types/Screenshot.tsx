export interface ScreenshotResponse {
	count: number;
	next: null;
	previous: null;
	results: Screenshot[];
}

export interface Screenshot {
	id: number;
	image: string;
	width: number;
	height: number;
	is_deleted: boolean;
}

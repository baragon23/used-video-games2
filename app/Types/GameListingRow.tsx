export type GameListingRow = {
	id: string;
	price: string; // e.g. "$12.00"
	priceNum: number; // numeric value for sorting
	feedback: string;
	title: string;
	location: string;
	url: string;
};

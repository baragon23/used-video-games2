export default interface EbayListing {
	itemId: string;
	title: string;

	leafCategoryIds: string[];
	categories: {
		categoryId: string;
		categoryName: string;
	}[];

	image?: {
		imageUrl: string;
	};

	price: {
		value: string; // eBay returns prices as strings
		currency: string;
	};

	marketingPrice?: {
		originalPrice: {
			value: string;
			currency: string;
		};
		discountPercentage?: string;
		discountAmount?: {
			value: string;
			currency: string;
		};
		priceTreatment?: string;
	};

	itemHref: string;
	itemGroupHref?: string;
	itemGroupType?: string;

	seller: {
		username: string;
		feedbackPercentage: string;
		feedbackScore: number;
	};

	condition?: string;
	conditionId?: string;

	thumbnailImages?: {
		imageUrl: string;
	}[];

	additionalImages?: {
		imageUrl: string;
	}[];

	shippingOptions?: {
		shippingCostType: 'FIXED' | 'CALCULATED';
		shippingCost?: {
			value: string;
			currency: string;
		};
		minEstimatedDeliveryDate?: string;
		maxEstimatedDeliveryDate?: string;
	}[];

	pickupOptions?: {
		pickupLocationType: string;
	}[];

	buyingOptions: Array<'FIXED_PRICE' | 'BEST_OFFER'>;

	epid?: string;

	itemAffiliateWebUrl: string;
	itemWebUrl: string;

	itemLocation: {
		postalCode: string;
		country: string;
	};

	adultOnly: boolean;
	legacyItemId: string;
	availableCoupons: boolean;

	itemOriginDate: string;
	itemCreationDate: string;

	topRatedBuyingExperience: boolean;
	priorityListing: boolean;
	listingMarketplaceId: string;
}

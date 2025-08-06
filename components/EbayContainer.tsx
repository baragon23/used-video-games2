'use client';

import { useEffect, useState } from 'react';
import EbayConditionTable from './EbayConditionTable';
import LoadingSpinner from './LoadingSpinner';
import { GameListingRow } from '@/app/Types/GameListingRow';

interface EbayContainerProps {
	game: string;
	platform: string;
}

type ListingsMap = Record<string, GameListingRow[]>;

const conditionOrder = [
	'Brand New',
	'Like New',
	'Like New - Refurbished',
	'Very Good',
	'Very Good - Refurbished',
	'Good',
	'Good - Refurbished',
	'Acceptable',
	'Acceptable - Refurbished',
];

const EbayContainer = ({ game, platform }: EbayContainerProps) => {
	const [listings, setListings] = useState<ListingsMap>({});
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		fetch(`/api/ebay/browse?q=${encodeURIComponent(game)}%20${platform}`)
			.then((response) => response.json())
			.then((data) => setListings(groupListings(data.itemSummaries || [])))
			.catch(console.error)
			.finally(() => setLoading(false));
	}, [game, platform]);

	const groupListings = (listings): Record<string, GameListingRow[]> => {
		const grouped: Record<string, GameListingRow[]> = {};

		listings.forEach((item) => {
			// if (item.itemLocation.country !== 'US') return;

			const price =
				parseFloat(item.price.value) +
				parseFloat(item.shippingOptions?.[0]?.shippingCost?.value || '0');

			const formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});

			const totalPrice = formatter.format(price);

			const row: GameListingRow = {
				id: item.itemId,
				price: totalPrice,
				priceNum: price, // user created property used for ordering listings ascending
				feedback: `${item.seller.feedbackPercentage}% (${item.seller.feedbackScore})`,
				title: item.title,
				location: item.itemLocation.country,
				url: item.itemAffiliateWebUrl,
			};

			const condition = item.condition || 'Unknown';
			if (!grouped[condition]) grouped[condition] = [];
			grouped[condition].push(row);
		});

		// now sort each array by priceNum ascending
		for (const cond of Object.keys(grouped)) {
			grouped[cond].sort((a, b) => a.priceNum - b.priceNum);
		}
		console.log(grouped);
		return grouped;
	};

	if (loading) return <LoadingSpinner />;

	return (
		<>
			{conditionOrder.map((condition) => {
				const rows = listings[condition];

				return <EbayConditionTable key={condition} condition={condition} listings={rows} />;
			})}
		</>
	);
};

export default EbayContainer;

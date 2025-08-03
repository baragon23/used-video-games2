'use client';

import { useEffect, useState } from 'react';
import EbayConditionTable from './EbayConditionTable';
import LoadingSpinner from './LoadingSpinner';

interface EbayContainerProps {
	game: string;
	platform: string;
}

const EbayContainer = ({ game, platform }: EbayContainerProps) => {
	const grouped: Record<string, any[]> = {};
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		fetch(`/api/ebay/browse?q=${encodeURIComponent(game)}%20${platform}`)
			.then((response) => response.json())
			.then((data) => setListings(groupListings(data.itemSummaries)))
			.catch(console.error)
			.finally(() => setLoading(false));
	}, [game, platform]);

	useEffect(() => {
		console.log(listings);
	}, [listings]);

	const groupListings = (listings) => {
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

			const row = {
				id: item.itemId,
				price: totalPrice,
				feedback: `${item.seller.feedbackPercentage}% (${item.seller.feedbackScore})`,
				title: item.title,
				location: item.itemLocation.country,
				url: item.itemWebUrl,
			};

			const condition = item.condition || 'Unknown';
			if (!grouped[condition]) grouped[condition] = [];
			grouped[condition].push(row);
		});
		return grouped;
	};

	if (loading) return <LoadingSpinner />;

	return (
		<>
			{Object.keys(listings).map((key, i) => {
				return (
					<EbayConditionTable
						condition={key}
						key={`${i}ConditionTable`}
						listings={listings[key]}
					/>
				);
			})}
		</>
	);
};

export default EbayContainer;

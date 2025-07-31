'use client';

import { Typography, Container, Box, Grid, Divider } from '@mui/material';
import { ebayMockListings } from '../../../lib/mockData';
import EbayConditionTable from '../../../components/EbayConditionTable';
import { useSearchParams } from 'next/navigation';
import TitleShadow from '@/components/styled/TitleShadow';
import { useEffect, useMemo, useState } from 'react';
import CallApi from '@/app/utils/callApi';
import Details from '@/components/gameDetailPage/Details';
import Screenshots from '@/components/gameDetailPage/Screenshots';

const GameDetailPage = () => {
	const searchParams = useSearchParams();
	const platform = searchParams.get('platform');
	const gameId = searchParams.get('id');
	const gameName = searchParams.get('name');

	const grouped: Record<string, any[]> = {};

	useEffect(() => {
		console.log(grouped);
	}, [grouped]);

	ebayMockListings.forEach((item) => {
		if (item.itemLocation.country !== 'US') return;

		const totalPrice =
			parseFloat(item.price.value) +
			parseFloat(item.shippingOptions?.[0]?.shippingCost?.value || '0');

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

	return (
		<Grid container>
			<Grid
				size={12}
				sx={{ display: 'flex', marginBottom: '2rem' }}
				justifyContent={'center'}
				alignItems={'center'}
			>
				<Typography variant="h1" display="flex" justifyContent="center">
					<TitleShadow>
						{gameName} - {platform}
					</TitleShadow>
				</Typography>
			</Grid>
			<Grid size={{ lg: 9, md: 9, sm: 12, xs: 12 }}>
				{Object.keys(grouped).map((key, i) => {
					return <EbayConditionTable condition={key} key={i} listings={grouped[key]} />;
				})}
			</Grid>
			<Grid
				size={{ lg: 3, md: 3, sm: 12, xs: 12 }}
				sx={{ border: '1px solid grey', padding: '1rem' }}
			>
				<Details id={gameId} name={gameName} />
				<Divider variant="middle" sx={{ margin: '1rem 0' }} />
				<Screenshots id={gameId} name={gameName} />
			</Grid>
			<Grid size={12}></Grid>
		</Grid>
	);
};

export default GameDetailPage;

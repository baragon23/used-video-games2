'use client';

import { Typography, Grid, Divider } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import TitleShadow from '@/components/styled/TitleShadow';
import Details from '@/components/gameDetailPage/Details';
import Screenshots from '@/components/gameDetailPage/Screenshots';
import EbayContainer from '@/components/EbayContainer';
import Link from 'next/link';
import Videos from '@/components/gameDetailPage/Videos';

const GameDetailPage = () => {
	const searchParams = useSearchParams();
	const platform = searchParams.get('platform');
	const gameId = searchParams.get('id');
	const gameName = searchParams.get('name');

	return (
		<Grid container spacing={2}>
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
			<Grid size={12}>
				<Typography variant="h6">
					Used Video Game listings from <strong>ebay</strong>
				</Typography>
			</Grid>
			<Grid size={{ lg: 9, md: 9, sm: 12, xs: 12 }}>
				<EbayContainer game={gameName} platform={platform} />
			</Grid>
			<Grid
				size={{ lg: 3, md: 3, sm: 12, xs: 12 }}
				sx={{ border: '1px solid grey', padding: '1rem' }}
			>
				<Details id={gameId} name={gameName} />
				<Divider variant="middle" sx={{ margin: '1rem 0' }} />
				<Screenshots id={gameId} name={gameName} />
				<Divider variant="middle" sx={{ margin: '1rem 0' }} />
				<Videos name={gameName} platform={platform} />
				<Divider variant="middle" sx={{ margin: '1rem 0' }} />
				<Typography sx={{ fontSize: '0.7rem' }}>
					<Link href="https://rawg.io/">
						{gameName} screenshots and description from RAWG Video Games Database
					</Link>
				</Typography>
			</Grid>
			<Grid size={12}></Grid>
		</Grid>
	);
};

export default GameDetailPage;

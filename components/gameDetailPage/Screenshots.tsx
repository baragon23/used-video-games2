'use client';
import { Screenshot, ScreenshotResponse } from '@/app/Types/Screenshot';
import CallApi from '@/utils/callApi';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useMemo } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import PaperSubTitle from '../styled/PaperSubTitle';

interface ScreenshotsProps {
	id: string | null;
	name: string;
}

const Screenshots = ({ id, name }: ScreenshotsProps) => {
	const gameConfig = useMemo(
		() => ({
			method: 'get',
			url: `https://api.rawg.io/api/games/${id}/screenshots`,
			params: {
				key: process.env.NEXT_PUBLIC_RAWG_KEY,
			},
		}),
		[id],
	);

	const { data, loading, error } = CallApi<ScreenshotResponse>(gameConfig);

	if (error) {
		console.log('Screenshots error: ', error);
		return '';
	}

	return (
		<Grid container>
			<Grid size={12}>
				<PaperSubTitle>
					<Typography variant="h6">{name} Screenshots</Typography>
				</PaperSubTitle>
			</Grid>
			<Grid size={12} display="flex" alignItems="center" flexDirection="column">
				{loading ? (
					<LoadingSpinner />
				) : !data?.results || data.results.length === 0 ? (
					<Typography variant="body1" sx={{ mt: 2 }}>
						No screenshots available
					</Typography>
				) : (
					data.results.map((s: Screenshot, i: number) => (
						<Image
							key={s.id}
							src={s.image}
							width={256}
							height={224}
							alt={`screenshot ${i}`}
							style={{
								height: 'auto',
								margin: '0.5rem 0',
								maxWidth: '100%',
							}}
						/>
					))
				)}
			</Grid>
		</Grid>
	);
};

export default Screenshots;

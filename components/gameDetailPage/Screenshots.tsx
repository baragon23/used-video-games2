'use client';
import { Screenshot, ScreenshotResponse } from '@/app/Types/Screenshot';
import CallApi from '@/utils/callApi';
import { Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';
import { useMemo } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import PaperSubTitle from '../styled/PaperSubTitle';

interface ScreenshotsProps {
	id: string | null;
	name: string;
}

const Screenshots = ({ id, name }: ScreenshotsProps) => {
	// If there's no id, don't attempt to fetch
	if (!id) return null;

	const apiKey = process.env.NEXT_PUBLIC_RAWG_KEY;

	if (!apiKey) {
		return (
			<Typography color="error" sx={{ mt: 2 }}>
				Missing RAWG API key.
			</Typography>
		);
	}

	const gameConfig = useMemo(
		() => ({
			method: 'get',
			url: `https://api.rawg.io/api/games/${id}/screenshots`,
			params: {
				key: apiKey,
			},
		}),
		[id, apiKey],
	);

	const { data, loading, error } = CallApi<ScreenshotResponse>(gameConfig);

	if (error) {
		return (
			<Typography color="error" sx={{ mt: 2 }}>
				Failed to load screenshots: {String(error)}
			</Typography>
		);
	}

	const results = data?.results ?? [];

	return (
		<Grid container spacing={2}>
			<Grid size={12}>
				<PaperSubTitle>
					<Typography variant="h6">{name} Screenshots</Typography>
				</PaperSubTitle>
			</Grid>

			<Grid size={12}>
				{loading ? (
					<LoadingSpinner />
				) : results.length === 0 ? (
					<Typography variant="body1" sx={{ mt: 2 }}>
						No screenshots available
					</Typography>
				) : (
					<Box display="flex" flexDirection="column" alignItems="center">
						{results.map((s: Screenshot, i: number) => (
							<Box key={s.id} sx={{ width: '100%', maxWidth: 512, my: 1 }}>
								<Image
									src={s.image}
									width={512}
									height={360}
									alt={`${name} screenshot ${i + 1}`}
									style={{ width: '100%', height: 'auto', display: 'block' }}
								/>
							</Box>
						))}
					</Box>
				)}
			</Grid>
		</Grid>
	);
};

export default Screenshots;

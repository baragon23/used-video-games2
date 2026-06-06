'use client';
import GameDetail from '@/app/Types/GameDetail';
import CallApi from '@/utils/callApi';
import { Grid, Typography } from '@mui/material';
import { useMemo } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import PaperSubTitle from '@/components/styled/PaperSubTitle';

interface DetailsProps {
	id: string | null;
	name: string;
}

const Details = ({ id, name }: DetailsProps) => {
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
			url: `https://api.rawg.io/api/games/${id}`,
			params: {
				key: apiKey,
			},
		}),
		[id, apiKey],
	);

	const { data, loading, error } = CallApi<GameDetail>(gameConfig);

	if (error)
		return (
			<Typography color="error">Failed to load game details: {String(error)}</Typography>
		);

	return (
		<Grid container>
			<Grid size={12}>
				<PaperSubTitle>
					<Typography variant="h6">{name} Description:</Typography>
				</PaperSubTitle>
				{loading ? (
					<LoadingSpinner />
				) : data ? (
					<Typography
						variant="subtitle2"
						component="div"
						dangerouslySetInnerHTML={{ __html: data.description }}
					/>
				) : (
					<Typography>No description available.</Typography>
				)}
			</Grid>
		</Grid>
	);
};

export default Details;

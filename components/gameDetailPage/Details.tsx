'use client';
import GameDetail from '@/app/Types/GameDetail';
import CallApi from '@/utils/callApi';
import { Grid, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import LoadingSpinner from '../LoadingSpinner';

interface DetailsProps {
	id: string | null;
	name: string;
}

const Details = ({ id, name }: DetailsProps) => {
	const gameConfig = useMemo(
		() => ({
			method: 'get',
			url: `https://api.rawg.io/api/games/${id}`,
			params: {
				key: process.env.NEXT_PUBLIC_RAWG_KEY,
			},
		}),
		[id],
	);

	const { data, loading, error } = CallApi<GameDetail>(gameConfig);

	if (error) return <div>There was an error.</div>;

	return (
		<Grid container>
			<Grid size={12}>
				<Typography variant="h6">{name} Description:</Typography>
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

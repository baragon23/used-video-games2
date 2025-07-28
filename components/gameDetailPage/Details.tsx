'use client';
import CallApi from '@/app/utils/callApi';
import { Grid } from '@mui/material';
import { useEffect, useMemo } from 'react';

interface DetailsProps {
	id: string | null;
}

const Details = ({ id }: DetailsProps) => {
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

	const { data, loading, error } = CallApi(gameConfig);

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<Grid container>
			<Grid size={12}>
				{loading ? 'Loading...' : <div dangerouslySetInnerHTML={{ __html: data.description }} />}
			</Grid>
		</Grid>
	);
};

export default Details;

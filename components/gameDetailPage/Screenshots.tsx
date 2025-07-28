'use client';
import CallApi from '@/app/utils/callApi';
import { Grid } from '@mui/material';
import { useEffect, useMemo } from 'react';

interface ScreenshotsProps {
	id: string | null;
}

const Screenshots = ({ id }: ScreenshotsProps) => {
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

	const { data, loading, error } = CallApi(gameConfig);

	useEffect(() => {
		console.log(data.results);
	}, [data]);

	return (
		<Grid container>
			<Grid size={12}>{loading ? 'Loading...' : 'screenshots loaded'}</Grid>
		</Grid>
	);
};

export default Screenshots;

'use client';

import { Autocomplete, TextField, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { allGames } from '../lib/mockData';

export default function SearchBar() {
	const router = useRouter();

	return (
		<Box sx={{ maxWidth: 400 }}>
			{/*<Autocomplete
				freeSolo
				options={allGames}
				getOptionLabel={(option) => `${option.title} (${option.platform})`}
				renderInput={(params) => <TextField {...params} label="Search Games" variant="outlined" size="small" />}
				onChange={(e, value) => {
					if (value?.slug && value?.platformSlug) {
						router.push(`/${value.platformSlug}/${value.slug}`);
					}
				}}
			/>*/}
		</Box>
	);
}

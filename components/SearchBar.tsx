'use client';

import { Box } from '@mui/material';

export default function SearchBar() {
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

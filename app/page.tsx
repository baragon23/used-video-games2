'use client';

import { Typography, Container, Box, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import platforms from '@/lib/platforms';
import Link from 'next/link';
import TitleShadow from '@/components/styled/TitleShadow';

function slugify(name: string): string {
	return name
		.toLowerCase()
		.replace(/[()']/g, '') // remove any parentheses or apostrophes
		.replace(/[^a-z0-9]+/g, '-') // replace any sequence of characters that are NOT a–z or 0–9 with a single hyphen
		.replace(/^-+|-+$/g, ''); // trim hyphens from the start or end of the string
}

const TitleGrid = styled(Grid)(() => ({
	display: 'flex',
	alignItems: 'center',
	'& svg': {
		height: '3em',
		marginRight: '1em',
		filter: 'drop-shadow(5px 5px 0px #585d5d)',
		width: '3em',
	},
	'& h1': {
		margin: '0',
		textShadow: '4px 3px 0 #585d5d, 7px 5px 0 rgba(0, 0, 0, 0.15)',
	},
}));

const PlatformTitleColor = '#ffffff';

const HomePage = () => {
	return (
		<Container maxWidth="md">
			<Box py={4}>
				<TitleGrid>
					<SportsEsportsIcon />
					<Typography variant="h1" gutterBottom sx={{ fontSize: '3rem' }}>
						Used Video Games on Ebay
					</Typography>
				</TitleGrid>
				<Divider sx={{ my: 3 }} />
				<Grid container spacing={4}>
					{platforms.map((platform) => (
						<Grid size={{ xs: 12, md: 4 }} key={platform.slug}>
							<Typography variant="h6" gutterBottom>
								<Link
									href={{
										pathname: `/${platform.slug}`,
										query: {
											id: platform.id,
											name: platform.name,
										},
									}}
								>
									<TitleShadow sx={{ color: PlatformTitleColor }}>
										{platform.name}
									</TitleShadow>
								</Link>
							</Typography>
							<ul style={{ paddingLeft: 16, marginTop: 4 }}>
								{platform.games.map((game: string, index: number) => (
									<li key={index}>
										<Link href={`/${platform.slug}/${slugify(game)}`}>{game}</Link>
									</li>
								))}
							</ul>
							<Link
								href={{
									pathname: `/${platform.slug}`,
									query: {
										id: platform.id,
										name: platform.name,
									},
								}}
							>
								<Typography variant="caption">&gt; all {platform.name} games</Typography>
							</Link>
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
};

export default HomePage;

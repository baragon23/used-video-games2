'use client';

import { Typography, Container, Box, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import platforms from '@/lib/platforms';
import Link from 'next/link';
import TitleShadow from '@/components/styled/TitleShadow';
import { Game } from '@/lib/platforms';

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
					<Grid size={12}>
						<Typography>
							Discover the ultimate destination for used video games, where finding the
							best deals on used video games has never been easier. Our site aggregates
							thousands of used video games listings from US sellers only and organizes
							them by condition—Brand New, Like New, Very Good, Good, Acceptable—and price,
							so you can quickly spot the cheapest or the highest-quality used video games
							available. Each listing shows the seller’s feedback score and percentage,
							giving you confidence when buying used video games online. Whether you’re
							hunting for classic cartridges, modern discs, or rare collector’s editions,
							our comprehensive catalog covers all game systems, making us your go-to
							resource for used video games on eBay. Start browsing now and experience a
							seamless way to shop used video games by condition, price, and seller
							reputation.
						</Typography>
					</Grid>
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
							<Box component="ul" sx={{ pl: 2, mt: 1 }}>
								{platform.games.map((game: Game) => (
									<li key={game.id}>
										<Link
											href={{
												pathname: `/${platform.slug}/${slugify(game.name)}`,
												query: {
													id: game.id,
													name: game.name,
													platform: platform.name,
												},
											}}
										>
											{game.name}
										</Link>
									</li>
								))}
							</Box>
							<Link
								href={{
									pathname: `/${platform.slug}`,
									query: {
										id: platform.id,
										name: platform.name,
									},
								}}
							>
								<Typography sx={{ color: '#baa3a3' }} variant="subtitle1">
									<i>&gt; all {platform.name} games</i>
								</Typography>
							</Link>
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
};

export default HomePage;

'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Game from '../Types/Game';
import Link from 'next/link';
import { Grid, Tab, Tabs, Typography } from '@mui/material';
import TitleShadow from '@/components/styled/TitleShadow';

export default function ConsolePage() {
	const searchParams = useSearchParams();
	const gameConsole = useParams().console; // the name of the slug
	const platformId = searchParams.get('id');
	const platformName = searchParams.get('name');
	const [games, setGames] = useState<Game[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<string>('123');

	useEffect(() => {
		if (!platformId) return;

		fetch(`/games/${platformId}.json`)
			.then((res) => {
				if (!res.ok) throw new Error(`Failed to load /data/${platformId}.json`);
				return res.json();
			})
			.then((data: { platform: number; games: Game[] }) => {
				// Optionally verify data.id === Number(platformId)
				setGames(data.games);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [platformId]);

	if (!platformId) {
		return (
			<p>
				No platform selected. Please pass ?id=&lt;platformId&gt; in the URL or return{' '}
				<Link href="/">home</Link>.
			</p>
		);
	}

	// Build the sub-nav groups: "123", "A"…"Z"
	const groups = ['123', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

	// Handle tab (group) change
	const handleGroupChange = (_: React.SyntheticEvent, newValue: string) => {
		setSelectedGroup(newValue);
	};

	// Filter games by selected group
	const filtered = games.filter((game) => {
		const first = game.name.charAt(0).toUpperCase();
		if (selectedGroup === '123') {
			// any non-A–Z first character
			return !/^[A-Z]$/.test(first);
		}
		return first === selectedGroup;
	});

	return (
		<Grid container spacing={2}>
			<Grid size={12}>
				<Typography variant="h1" display="flex" justifyContent="center">
					<TitleShadow>{platformName}</TitleShadow>
				</Typography>
			</Grid>
			<Grid size={12} sx={{ marginBottom: '2rem' }}>
				<Tabs
					value={selectedGroup}
					onChange={handleGroupChange}
					variant="scrollable"
					scrollButtons="auto"
					aria-label="Game letter filter"
				>
					{groups.map((group) => (
						<Tab key={group} label={group} value={group} sx={{ minWidth: 0 }} />
					))}
				</Tabs>
			</Grid>
			{filtered.map((game) => (
				<Grid key={game.id} size={{ xs: 12, sm: 6, md: 4 }}>
					<Link
						href={{
							pathname: `/${gameConsole}/${game.slug}`,
							query: {
								id: game.id,
								name: game.name,
								platform: platformName,
							},
						}}
					>
						<Typography variant="body1" sx={{ textDecoration: 'none' }}>
							{game.name}
						</Typography>
					</Link>
				</Grid>
			))}
		</Grid>
	);
}

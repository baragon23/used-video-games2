'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Tooltip,
	Typography,
} from '@mui/material';

interface GameListingRow {
	id: string;
	price: number;
	feedback: string;
	title: string;
	location: string;
	url: string;
}

interface Props {
	condition: string;
	listings: GameListingRow[];
}

export default function EbayConditionTable({ condition, listings }: Props) {
	const handleRowClick = (url: string) => window.open(url, '_blank');

	return (
		<TableContainer component={Paper} sx={{ mb: 4 }}>
			<Typography variant="h6" sx={{ m: 2 }}>
				{condition}
			</Typography>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>
							Price (includes shipping{' '}
							<Tooltip title="Sometimes eBay does not provide shipping cost for specific items.">
								<span>*</span>
							</Tooltip>
							)
						</TableCell>
						<TableCell>Seller Feedback</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Ships From</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{listings.map((game) => (
						<TableRow
							key={game.id}
							hover
							onClick={() => handleRowClick(game.url)}
							sx={{ cursor: 'pointer' }}
						>
							<TableCell>{game.price}</TableCell>
							<TableCell>{game.feedback}</TableCell>
							<TableCell>{game.title}</TableCell>
							<TableCell>{game.location}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

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
	styled,
	useTheme,
} from '@mui/material';
import { useEffect } from 'react';

interface GameListingRow {
	id: number;
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
}));

export default function EbayConditionTable({ condition, listings }: Props) {
	const handleRowClick = (url: string) => window.open(url, '_blank');
	const theme = useTheme();

	useEffect(() => {
		console.log(condition);
		console.log(listings);
	}, [condition, listings]);

	return (
		<TableContainer
			component={Paper}
			sx={{ backgroundColor: theme.palette.primary.main, maxHeight: 440, mb: 4 }}
		>
			<Typography variant="h5" sx={{ m: 1 }}>
				{condition} Condition
			</Typography>
			<Table size="small" sx={{ minWidth: '650px' }}>
				<TableHead>
					<TableRow>
						<StyledTableCell>
							Total Price
							<Typography sx={{ fontSize: '0.6rem' }}>Includes Shipping</Typography>
						</StyledTableCell>
						<StyledTableCell>Seller Feedback</StyledTableCell>
						<StyledTableCell>Description</StyledTableCell>
						<StyledTableCell>Ships From</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{listings.map((game) => (
						<TableRow
							key={game.id * Math.random()}
							hover
							onClick={() => handleRowClick(game.url)}
							sx={{ backgroundColor: '#616161', cursor: 'pointer' }}
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

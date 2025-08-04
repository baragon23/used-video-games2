'use client';

import { GameListingRow } from '@/app/Types/GameListingRow';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	styled,
	useTheme,
} from '@mui/material';

interface Props {
	condition: string;
	listings: GameListingRow[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
}));

const EbayConditionTable = ({ condition, listings }: Props) => {
	const handleRowClick = (url: string) => window.open(url, '_blank');
	const theme = useTheme();

	return (
		<TableContainer
			component={Paper}
			sx={{ backgroundColor: theme.palette.primary.main, maxHeight: 440, mb: 4 }}
		>
			<Typography variant="h5" sx={{ margin: '1rem 1rem 0 1rem' }}>
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
					{listings && listings.length > 0 ? (
						listings.map((game) => (
							<TableRow
								key={game.id}
								hover
								onClick={() => handleRowClick(game.url)}
								sx={{ backgroundColor: '#616161', cursor: 'pointer' }}
							>
								<TableCell>{game.price}</TableCell>
								<TableCell>{game.feedback}</TableCell>
								<TableCell>{game.title}</TableCell>
								<TableCell>{game.location}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow sx={{ backgroundColor: '#616161' }}>
							<TableCell colSpan={4} align="center">
								<Typography variant="body2">
									No for-sale listings for this condition.
								</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default EbayConditionTable;

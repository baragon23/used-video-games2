'use client';
import { Box, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { ReactNode } from 'react';

const SubLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Container maxWidth="lg">
			<Grid container>
				<Grid size={12}>
					<Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
						<Link href="/">Home - Used Video Games</Link>
					</Typography>
				</Grid>
			</Grid>
			<Box py={2}>{children}</Box>
		</Container>
	);
};

export default SubLayout;

import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

const SubLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Container maxWidth="lg">
			<Box py={4}>{children}</Box>
		</Container>
	);
};

export default SubLayout;

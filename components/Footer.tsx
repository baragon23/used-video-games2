import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

const year = new Date().getFullYear();

const Footer = () => {
	return (
		<Grid container sx={{ marginTop: 'auto', padding: '1rem 0' }}>
			<Grid size={12} display="flex" justifyContent="center" alignItems="center">
				<Typography>
					<Link href="/">©{`${year} UsedVideo.Games`}</Link>
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Footer;

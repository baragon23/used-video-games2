import { Grid, Typography } from '@mui/material';

const year = new Date().getFullYear();

const Footer = () => {
	return (
		<Grid container>
			<Grid size={12} display="flex" justifyContent="center" alignItems="center">
				<Typography>©{`${year} UsedVideo.Games`}</Typography>
			</Grid>
		</Grid>
	);
};

export default Footer;

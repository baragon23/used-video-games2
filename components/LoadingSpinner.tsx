import { CircularProgress, Grid } from '@mui/material';

const LoadingSpinner = () => {
	return (
		<Grid container sx={{ margin: '2rem' }}>
			<Grid size={12}>
				<CircularProgress size="5rem" />
			</Grid>
		</Grid>
	);
};

export default LoadingSpinner;

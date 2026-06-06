import { CircularProgress, Grid } from '@mui/material';

const LoadingSpinner = () => {
	return (
		<Grid container sx={{ margin: '2rem' }} justifyContent="center">
			<Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}> 
				<CircularProgress size="5rem" />
			</Grid>
		</Grid>
	);
};

export default LoadingSpinner;

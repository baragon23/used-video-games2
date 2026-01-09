import { useScrollTrigger, Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const BackToTop = () => {
	const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });
	const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

	return (
		<Zoom in={trigger}>
			<Fab
				color="secondary"
				size="large"
				onClick={handleClick}
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
				aria-label="scroll back to top"
			>
				<KeyboardArrowUpIcon />
			</Fab>
		</Zoom>
	);
};

export default BackToTop;

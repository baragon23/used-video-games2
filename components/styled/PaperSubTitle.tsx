import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const PaperSubTitle = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	borderRadius: '4px 4px 0 0',
	marginBottom: '1rem',
	padding: '0.7rem',
}));

export default PaperSubTitle;

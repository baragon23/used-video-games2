import { createTheme } from '@mui/material/styles';
import { cyan } from '@mui/material/colors';

export const getTheme = (mode: 'light' | 'dark') => {
	const baseTheme = createTheme({
		palette: {
			mode: mode,
			primary: {
				main: cyan[800],
			},
			secondary: {
				main: cyan[200],
			},
			background: {
				default: '#303030' /* grey background for site */,
			},
		},
		components: {
			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundImage: 'none',
					},
				},
			},
		},
	});

	const theme = createTheme(baseTheme, {
		typography: {
			h1: {
				fontSize: '4rem',
				// this first media query is a hard-coded min-width
				'@media (max-width: 600px)': {
					fontSize: '2rem',
				},
				// this uses the baseTheme's breakpoints
				[baseTheme.breakpoints.up('md')]: {
					fontSize: '2.75rem',
				},
			},
		},
	});

	return theme;
};

'use client';

import { ReactNode, useMemo, useState, useEffect, createContext } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from '../styles/theme';
import SearchBar from '@/components/SearchBar';
import './globals.css';
import Footer from '@/components/Footer';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function RootLayout({ children }: { children: ReactNode }) {
	const [mode, setMode] = useState<'light' | 'dark'>('dark');

	useEffect(() => {
		const savedMode = localStorage.getItem('theme');
		if (savedMode === 'light' || savedMode === 'dark') {
			setMode(savedMode);
		}
	}, []);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prev) => {
					const next = prev === 'light' ? 'dark' : 'light';
					localStorage.setItem('theme', next);
					return next;
				});
			},
		}),
		[],
	);

	const theme = useMemo(() => getTheme(mode), [mode]);

	return (
		<html lang="en">
			<body>
				<ColorModeContext.Provider value={colorMode}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<header>
							<SearchBar />
						</header>
						<main>{children}</main>
						<footer>
							<Footer />
						</footer>
					</ThemeProvider>
				</ColorModeContext.Provider>
			</body>
		</html>
	);
}

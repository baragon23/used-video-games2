'use client';

import { ReactNode, useMemo, useState, useEffect, createContext } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { getTheme } from '../styles/theme';
import SearchBar from '@/components/SearchBar';
import './globals.css';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import Script from 'next/script';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
const GoogleTagId = 'G-TGVRVK2LSH';

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
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=${GoogleTagId}`}
					strategy="afterInteractive"
				/>
				<Script id="ga4-init" strategy="afterInteractive">
					{`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        window.gtag = window.gtag || gtag;
                        gtag('js', new Date());
                        gtag('config', '${GoogleTagId}', { send_page_view: false });
                    `}
				</Script>
				<ColorModeContext.Provider value={colorMode}>
					<ThemeProvider theme={theme}>
						<Box display="flex" flexDirection="column" minHeight="100vh">
							<CssBaseline />
							<header>
								<SearchBar />
							</header>
							<main>{children}</main>
							<Footer />
							<BackToTop />
						</Box>
					</ThemeProvider>
				</ColorModeContext.Provider>
			</body>
		</html>
	);
}

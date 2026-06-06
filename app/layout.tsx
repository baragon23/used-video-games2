'use client';

import { ReactNode, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { getTheme } from '../styles/theme';
import './globals.css';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import Script from 'next/script';

const GoogleTagId = 'G-TGVRVK2LSH';

export default function RootLayout({ children }: { children: ReactNode }) {
	const [mode, setMode] = useState<'light' | 'dark'>('dark');

	useEffect(() => {
		const savedMode = localStorage.getItem('theme');
		if (savedMode === 'light' || savedMode === 'dark') {
			setMode(savedMode);
		}
	}, []);

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
				<ThemeProvider theme={theme}>
					<Box display="flex" flexDirection="column" minHeight="100vh">
						<CssBaseline />

						<main>{children}</main>
						<Footer />
						<BackToTop />
					</Box>
				</ThemeProvider>
			</body>
		</html>
	);
}

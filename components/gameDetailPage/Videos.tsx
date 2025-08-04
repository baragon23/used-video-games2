'use client';

import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Typography,
	useTheme,
} from '@mui/material';
import LoadingSpinner from '../LoadingSpinner';
import { useMemo, useState } from 'react';
import CallApi from '@/utils/callApi';
import { YouTubeSearchListResponse, YouTubeSearchResult } from '@/app/Types/Video';
import CloseIcon from '@mui/icons-material/Close';
import decodeHTML from '@/utils/decodeHTML';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import PaperSubTitle from '../styled/PaperSubTitle';

interface VideosProps {
	name: string;
	platform: string;
}

const Videos = ({ name, platform }: VideosProps) => {
	const theme = useTheme();
	const [open, setOpen] = useState<boolean>(false);
	const [videoId, setVideoId] = useState<string | null>(null);

	const gameConfig = useMemo(
		() => ({
			method: 'get',
			url: `https://www.googleapis.com/youtube/v3/search`,
			params: {
				key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
				part: 'snippet',
				q: `${name} ${platform}`,
				type: 'video',
			},
		}),
		[name, platform],
	);

	const { data, loading, error } = CallApi<YouTubeSearchListResponse>(gameConfig);

	const handleOpen = (id: string) => {
		setVideoId(id);
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		setVideoId(null);
	};

	if (error) {
		console.log('Youtube video error: ', error);
		return '';
	}
	return (
		<>
			<Grid container>
				<Grid size={12}>
					<PaperSubTitle>
						<Typography variant="h6">{name} Videos</Typography>
					</PaperSubTitle>
				</Grid>
				<Grid size={12} display="flex" alignItems="center" flexDirection="column">
					{loading ? (
						<LoadingSpinner />
					) : !data?.items || data.items.length === 0 ? (
						<Typography variant="body1" sx={{ mt: 2 }}>
							No videos available
						</Typography>
					) : (
						<Grid container spacing={2} justifyContent="center">
							{data.items.slice(0, 5).map((video: YouTubeSearchResult) => (
								<Grid key={video.id.videoId} size={12}>
									<Card
										sx={{ cursor: 'pointer', position: 'relative' }}
										onClick={() => handleOpen(video.id.videoId)}
									>
										<CardMedia
											component="img"
											height="140"
											image={video.snippet.thumbnails.medium.url}
											alt={video.snippet.title}
										/>
										<Box
											sx={{
												position: 'absolute',
												top: '32%',
												left: '50%',
												transform: 'translate(-50%, -50%)',
												bgcolor: 'white',
												width: '27px',
												height: '22px',
												display: 'inline-flex', // <-- inline-flex so it only wraps the icon
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											<SmartDisplayIcon sx={{ color: 'red', fontSize: '3rem' }} />
										</Box>
										<CardContent
											sx={{
												backgroundColor: theme.palette.lightGray,
												padding: '0.8rem',
											}}
										>
											<Typography variant="subtitle2">
												{decodeHTML(video.snippet.title)}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					)}
				</Grid>
			</Grid>
			<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
				<DialogTitle sx={{ m: 0, p: 1 }}>
					<IconButton
						aria-label="close"
						onClick={handleClose}
						sx={{ position: 'absolute', right: 8, top: 8 }}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent sx={{ p: 0 }}>
					{videoId && (
						<Box
							component="iframe"
							width="100%"
							height={400}
							src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
							allowFullScreen
							sx={{ border: 0 }}
						/>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};

export default Videos;

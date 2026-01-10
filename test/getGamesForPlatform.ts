/*import Game from "@/app/Types/Game";
import { useEffect, useState } from "react";

	const [allGames, setAllGames] = useState<Game[]>([]);
	const API_KEY = process.env.NEXT_PUBLIC_RAWG_KEY;
	const id = 106; // platform id

	useEffect(() => {
		// 1) define an async fetcher
		async function fetchAllGames() {
			let page = 1;
			let hasNextPage = true;
			const gamesAccumulator: Game[] = [];

			try {
				while (hasNextPage) {
					const res = await fetch(
						`https://api.rawg.io/api/games?platforms=${id}` +
							`&page=${page}&page_size=40&key=${API_KEY}`,
					);
					if (!res.ok) {
						console.error('RAWG fetch failed', res.status);
						break;
					}

					const data = await res.json();
					gamesAccumulator.push(...data.results);
					hasNextPage = Boolean(data.next);
					page++;
				}

				// 2) update state once
				setAllGames(gamesAccumulator);
			} catch (err) {
				console.error('Error fetching RAWG games:', err);
			}
		}

		// 3) call it
		fetchAllGames();
	}, [API_KEY, id]);

	const copyToClipboard = () => {
		const text = JSON.stringify(allGames, null, 2);
		navigator.clipboard.writeText(text).then(() => {
			alert('Copied JSON to clipboard!');
		});
	};

    <Button variant="outlined" onClick={copyToClipboard} sx={{ mr: 1 }}>
        Copy JSON
    </Button>*/

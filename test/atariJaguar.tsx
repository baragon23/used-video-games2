export async function getStaticProps() {
	const API_KEY = process.env.RAWG_API_KEY;
	const platformId = 112; // Atari Jaguar

	let allGames: any[] = [];
	let page = 1;
	let hasNextPage = true;

	while (hasNextPage) {
		const res = await fetch(
			`https://api.rawg.io/api/games?platforms=${platformId}&page=${page}&page_size=40&key=${API_KEY}`,
		);
		const data = await res.json();
		allGames = allGames.concat(data.results);
		hasNextPage = !!data.next;
		page++;
	}

	return {
		props: {
			games: allGames,
		},
		revalidate: 60 * 60 * 24, // re-fetch once every 24 hours
	};
}

export default function AtariJaguarPage({ games }) {
	return (
		<div>
			<h1>Atari Jaguar Games</h1>
			<ul>
				{games.map((game) => (
					<li key={game.id}>{game.name}</li>
				))}
			</ul>
		</div>
	);
}

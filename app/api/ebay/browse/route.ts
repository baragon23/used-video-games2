import { getEbayToken } from '@/lib/getEbayToken';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const q = searchParams.get('q');
	try {
		const token = await getEbayToken();

		const response = await fetch(
			`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(q)}&category_ids=139973&filter=itemLocationCountry:US`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'X-EBAY-C-ENDUSERCTX': `affiliateCampaignId=5338707380`,
				},
			},
		);
		if (!response.ok) {
			const text = await response.text();
			return NextResponse.json({ error: text }, { status: response.status });
		}
		const data = await response.json();
		return NextResponse.json(data);
	} catch (err: unknown) {
		if (err instanceof Error) {
			return NextResponse.json({ error: err.message }, { status: 500 });
		}

		return NextResponse.json({ error: 'Unknown server error' }, { status: 500 });
	}
}

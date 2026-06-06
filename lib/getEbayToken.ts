let cachedToken = '';
let expiresAt = 0;

export async function getEbayToken(): Promise<string> {
	// If we have a token and it hasn’t expired yet, just return it
	if (cachedToken && Date.now() < expiresAt) {
		return cachedToken;
	}

	// Otherwise fetch a new one
	const { EBAY_CLIENT_ID, EBAY_CLIENT_SECRET } = process.env;
	if (!EBAY_CLIENT_ID || !EBAY_CLIENT_SECRET) {
		throw new Error('Missing EBAY_CLIENT_ID or EBAY_CLIENT_SECRET env vars');
	}

	const basicAuth = Buffer.from(`${EBAY_CLIENT_ID}:${EBAY_CLIENT_SECRET}`).toString('base64');

	const params = new URLSearchParams({
		grant_type: 'client_credentials',
		scope: 'https://api.ebay.com/oauth/api_scope',
	});

	const response = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${basicAuth}`,
		},
		body: params.toString(),
	});
	if (!response.ok) {
		const text = await response.text();
		throw new Error(`eBay token fetch failed: ${response.status} ${text}`);
	}
	const data = await response.json();
	// cache it for slightly less than its lifetime
	expiresAt = Date.now() + data.expires_in * 1000 - 60_000;
	cachedToken = data.access_token;
	return cachedToken;
}

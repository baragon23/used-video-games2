let cachedToken = '';
let expiresAt = 0;

export async function getEbayToken(): Promise<string> {
	console.log('inside getEbayToken');

	// If we have a token and it hasn’t expired yet, just return it
	if (cachedToken && Date.now() < expiresAt) {
		console.log('returning cached token');
		return cachedToken;
	}

	// Otherwise fetch a new one
	const { EBAY_CLIENT_ID, EBAY_CLIENT_SECRET } = process.env;
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
	const data = await response.json();
	console.log('ebay token', data);
	// cache it for slightly less than its lifetime
	expiresAt = Date.now() + data.expires_in * 1000 - 60_000;
	cachedToken = data.access_token;
	return cachedToken;
}

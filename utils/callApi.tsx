import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

function CallApi<T>(config: AxiosRequestConfig) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.request<T>(config);
				setData(response.data);
			} catch (e: unknown) {
				if (axios.isAxiosError(e)) {
					setError(e.response?.data?.message ?? e.message);
				} else if (e instanceof Error) {
					setError(e.message);
				} else {
					setError('Unknown CallApi error');
				}
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [config]); // re-run when config changes

	return { data, loading, error };
}

export default CallApi;

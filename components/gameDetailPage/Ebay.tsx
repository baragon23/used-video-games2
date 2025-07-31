// ── eBay state ──
/*
  const [ebayData, setEbayData] = useState<EbayData | null>(null);
  const [ebayLoading, setEbayLoading] = useState(true);
  const [ebayError, setEbayError] = useState<string | null>(null);
*/

/*useEffect(() => {
    axios
      .get<EbayData>('https://api.ebay.com/buy/browse/v1/item_summary/search', {
        params: {
          q: 'used video games',
          limit: 10,
          // Authorization header if needed:
          // headers: { Authorization: `Bearer ${process.env.EBAY_TOKEN}` }
        },
      })
      .then((res) => setEbayData(res.data))
      .catch((err) => setEbayError(err.message))
      .finally(() => setEbayLoading(false));
  }, []);
*/
{
	/*
      <Grid item xs={12}>
        <Typography variant="h4">eBay Listings</Typography>
        {ebayLoading ? (
          <CircularProgress />
        ) : ebayError ? (
          <Typography color="error">{ebayError}</Typography>
        ) : (
          <EbayComponent data={ebayData!} />
        )}
      </Grid>
      */
}

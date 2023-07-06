import usePolling from "../hooks/usePolling";

function LatestNews() {
  const API_URL = process.env.REACT_APP_NEWS_URL;
  const INTERVAL = 5000;
  const INITIAL_DATA = [];

  const [{ data: news, loading }] = usePolling(API_URL, INTERVAL, INITIAL_DATA);

  return (
    <>
      <h2>Latest News</h2>
      {loading && '...Loading'}
      <ul>
        {news.map(o => <li key={o.id}>{o.content}</li>)}
      </ul>
    </>
  )
}

export default LatestNews;

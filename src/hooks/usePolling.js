import { useEffect, useState } from "react";

function usePolling(url, interval, initialData) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let abortController;

    const stop = () => {
      if (abortController) {
        abortController.abort();
      }
    }

    const fetchData = async () => {
      try {
        stop();
        abortController = new AbortController();

        setLoading(true);

        const response = await fetch(url, {
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        setData(data);

        setError(null);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, interval);
    return () => {
      stop();
      clearInterval(intervalId)
    };
  }, [url, interval]);

  return [{data, loading, error}];
}

export default usePolling;

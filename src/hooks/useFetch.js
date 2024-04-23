import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        setIsPending(true);

        const fetchData = async () => {
            try {
                const response = await fetch(url, { signal: abortCont.signal });
                if (!response.ok) {
                    throw new Error(`Could not fetch the data for that resource (Status code: ${response.status})`);
                }
                const data = await response.json();
                setData(data);
                setError(null);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Failed to fetch data:', error);
                    setError(error.message);
                }
            }
            setIsPending(false);
        };

        fetchData();

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;
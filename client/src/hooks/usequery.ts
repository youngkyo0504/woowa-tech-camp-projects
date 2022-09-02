import { useState, useEffect } from 'react';
const useQuery = <TResponse, TError extends Error>(requestFunc: () => Promise<TResponse>) => {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<TError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const query = async () => {
    try {
      const response = await requestFunc();
      setData(response);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    query();
  }, []);

  return { data, error, isLoading, query };
};

export default useQuery;

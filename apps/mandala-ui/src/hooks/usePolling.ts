import { useCallback, useEffect, useState } from "react";

export function usePolling<T>(fn: () => Promise<T>, intervalMs: number) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const r = await fn();
      setData(r);
      setError(null);
    } catch (e) {
      setError(e as Error);
    }
  }, [fn]);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, intervalMs);
    return () => clearInterval(id);
  }, [fetchData, intervalMs]);

  return { data, error, refresh: fetchData };
}

import { useEffect, useState } from "react";

interface UseDebounceParams {
  value: string;
  delay: number;
}

export default function useDebounce(props: UseDebounceParams) {
  const { value, delay } = props;

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return debouncedValue;
}

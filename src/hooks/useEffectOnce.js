import { useEffect, useRef } from 'react';

// Run the callback only once, even in React 18 StrictMode (which double-invokes effects in dev)
export default function useEffectOnce(effect) {
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

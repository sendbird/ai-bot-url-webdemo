import {useEffect, useState} from "react";

export function useGetHashedKey(): string {
  const [hashedKey, setHashedKey] = useState<string>('');

  useEffect(() => {
    window.addEventListener('locationchange', function () {
      // FIXME
      const foundHashedKey: string = new URLSearchParams(window.location.search.substring(pageHref.indexOf('?')));
      setHashedKey(foundHashedKey);
    });
    return () => {
      // FIXME
      // window.removeEventListener('locationchange', );
    };
  }, []);
  return hashedKey;
}
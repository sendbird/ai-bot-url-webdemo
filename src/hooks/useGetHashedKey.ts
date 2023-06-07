import {useEffect, useState} from "react";
import {HASHED_KEY_QUERY_PARAMETER_NAME, TEST_HASHED_KEY} from "../const";

export function useGetHashedKey(): string {
  const [hashedKey, setHashedKey] = useState<string>('');

  function setHashedKeyFromCurrentUrl(): void {
    const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    const parsedHashedKey: string | null = urlParams.get(HASHED_KEY_QUERY_PARAMETER_NAME);
    console.log('## parsedHashedKey: ', parsedHashedKey);

    setHashedKey(parsedHashedKey);
  }
  useEffect(() => {
    // window.addEventListener('locationchange', setHashedKeyFromCurrentUrl);
    // return () => {
    //   window.removeEventListener('locationchange', setHashedKeyFromCurrentUrl);
    // };
    if (!hashedKey) {
      setHashedKeyFromCurrentUrl();
    }
  }, []);
  return hashedKey;
}
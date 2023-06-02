import {useEffect, useState} from "react";

export function useGetBotUserId(hashedKey: string): string {
  const [botUserId, setBotUserId] = useState<string>('');

  useEffect(() => {
    // Make request to GET Request /v3/users?show_bot=true&user_ids=<hash_key>
    // setBotUserId();
  }, [hashedKey]);
  return botUserId;
}
import {useEffect, useState} from "react";
import {GroupChannel} from "@sendbird/chat/groupChannel";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";

export function useCreateGroupChannel(hashedKey: string): GroupChannel {
  const [channel, setChannel] = useState<GroupChannel>();
  const store = useSendbirdStateContext();
  const sdk = store.stores.sdkStore.sdk;

  useEffect(() => {
    // Make request to GET Request /v3/users?show_bot=true&user_ids=<hash_key>
    // setBotUserId();
  }, [hashedKey]);
  return channel;
}
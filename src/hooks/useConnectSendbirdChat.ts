import {useEffect, useState} from "react";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import SendbirdChat, {User} from "@sendbird/chat";

export function useConnectSendbirdChat(userId: string): User {
  const [user, setUser] = useState<User>(null);
  const store = useSendbirdStateContext();
  const sb: SendbirdChat = store.stores.sdkStore.sdk;

  console.log('## sb: ', sb);

  // useEffect(() => {
  //   sb.connect(userId).then((user: User) => {
  //     setUser(user);
  //   });
  // }, [sb]);
  return user;
}
import {useEffect, useState} from "react";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import SendbirdChat, {ApplicationUserListQuery, User} from "@sendbird/chat";

export function useGetBotUser(currentUser: User, hashedKey: string): User {
  const [botUser, setBotUser] = useState<User>(null);
  const store = useSendbirdStateContext();
  const sb: SendbirdChat = store.stores.sdkStore.sdk;

  useEffect(() => {
    if (currentUser && hashedKey) {
      const query: ApplicationUserListQuery = sb.createApplicationUserListQuery({
        userIdsFilter: [hashedKey],
      });
      query.next().then((users: User[]) => {
        if (users.length <= 0) {
          console.log('## useGetBotUserId fetched 0 users!');
        } else {
          setBotUser(users[0]);
        }
      })
    }
  }, [currentUser, hashedKey]);
  return botUser;
}
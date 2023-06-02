import {useEffect, useState} from "react";
import {GroupChannel, SendbirdGroupChat} from "@sendbird/chat/groupChannel";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import {User} from "@sendbird/chat";
import {GroupChannelCreateParams} from "@sendbird/chat/lib/__definition";

export function useCreateGroupChannel(currentUser: User, botUser: User): GroupChannel {
  const [channel, setChannel] = useState<GroupChannel>(null);
  const store = useSendbirdStateContext();
  const sb: SendbirdGroupChat = store.stores.sdkStore.sdk as SendbirdGroupChat;

  useEffect(() => {
    if (currentUser && botUser) {
      const params: GroupChannelCreateParams = {
        name: 'AI Assistant',
        invitedUserIds: [currentUser.userId, botUser.userId],
        isDistinct: false,
        coverUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      };
      sb.groupChannel.createChannel(params)
        .then((channel: GroupChannel) => {
          setChannel(channel);
        });
    }
  }, [currentUser, botUser]);
  return channel;
}
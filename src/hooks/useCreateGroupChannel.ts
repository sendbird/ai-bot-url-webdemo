import {useEffect, useState} from "react";
import {GroupChannel, SendbirdGroupChat} from "@sendbird/chat/groupChannel";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import {User} from "@sendbird/chat";
import {GroupChannelCreateParams} from "@sendbird/chat/lib/__definition";
import {CREATE_GROUP_CHANNEL_PARAMS} from "../const";

export function useCreateGroupChannel(currentUser: User, botUser: User): GroupChannel | null {
  const [channel, setChannel] = useState<GroupChannel | null>(null);
  const store = useSendbirdStateContext();
  const sb: SendbirdGroupChat = store.stores.sdkStore.sdk as SendbirdGroupChat;

  useEffect(() => {
    if (currentUser && botUser) {
      const params: GroupChannelCreateParams = {
        name: CREATE_GROUP_CHANNEL_PARAMS.name,
        invitedUserIds: [currentUser.userId, botUser.userId],
        isDistinct: false,
        coverUrl: CREATE_GROUP_CHANNEL_PARAMS.coverUrl,
      };
      sb.groupChannel.createChannel(params)
        .then((channel: GroupChannel) => {
          setChannel(channel);
        });
    }
  }, [currentUser, botUser, sb]);
  return channel;
}

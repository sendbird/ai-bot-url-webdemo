import {useCallback, useContext, useEffect, useState} from "react";
import {GroupChannel, SendbirdGroupChat} from "@sendbird/chat/groupChannel";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import {User} from "@sendbird/chat";
import {GroupChannelCreateParams} from "@sendbird/chat/lib/__definition";
import {DemoConstant} from "../const";
import {DemoStatesContext} from "../context/DemoStatesContext";

export function useCreateGroupChannel(currentUser: User, botUser: User): [GroupChannel | null, () => void, boolean] {
  const [channel, setChannel] = useState<GroupChannel | null>(null);
  const [creating, setCreating] = useState<boolean>(false);
  const store = useSendbirdStateContext();
  const sb: SendbirdGroupChat = store.stores.sdkStore.sdk as SendbirdGroupChat;
  const demoStates = useContext<DemoConstant>(DemoStatesContext);
  console.log('## demoStates: ', demoStates);

  const params = demoStates.createGroupChannelParams;
  const { name, coverUrl } = params;

  const createAndSetNewChannel = useCallback(() => {
    if (currentUser && botUser) {
      setCreating(true);
      console.log('## createAndSetNewChannel: ', channel);

      const params: GroupChannelCreateParams = {
        name,
        invitedUserIds: [currentUser.userId, botUser.userId],
        isDistinct: false,
        coverUrl,
      };
      sb.groupChannel.createChannel(params)
        .then((channel: GroupChannel) => {
          setChannel(channel);
        }).finally(() => {
          setCreating(false);
        });
    }
  }, [currentUser?.userId, botUser?.userId]);

  useEffect(() => {
    if (currentUser && botUser && sb) {
      createAndSetNewChannel();
    }
  }, [currentUser, botUser, sb]);

  return [channel, createAndSetNewChannel, creating];
}

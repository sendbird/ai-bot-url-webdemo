import {useCallback, useContext, useEffect, useState} from "react";
import {GroupChannel, SendbirdGroupChat} from "@sendbird/chat/groupChannel";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import {User} from "@sendbird/chat";
import {GroupChannelCreateParams} from "@sendbird/chat/groupChannel";
import {DemoConstant} from "../const";
import {DemoStatesContext} from "../context/DemoStatesContext";

export function useCreateGroupChannel(currentUser: User, botUser: User): [GroupChannel | null, () => void, boolean] {
  const [channel, setChannel] = useState<GroupChannel | null>(null);
  const [creating, setCreating] = useState<boolean>(false);
  const store = useSendbirdStateContext();
  const sb: SendbirdGroupChat = store.stores.sdkStore.sdk as SendbirdGroupChat;
  const demoStates = useContext<DemoConstant>(DemoStatesContext);
  // console.log('## demoStates: ', demoStates);

  const params = demoStates.createGroupChannelParams;
  const { name, coverUrl } = params;

  const createAndSetNewChannel = useCallback(() => {
    if (currentUser && botUser) {
      setCreating(true);
      // console.log('## createAndSetNewChannel: ', channel);

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
  // we dont want to watchout for change of whole objects
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.userId, botUser?.userId]);

  useEffect(() => {
    // console.log('## useCreateGroupChannel: ', currentUser, botUser, sb);
    if (currentUser && botUser && sb) {
      // fixme: dont need to move this to an outer function,
      // it causes scope snapshot issues
      // this case is okay because there are only setters inside createAndSetNewChannel
      createAndSetNewChannel();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.userId, botUser?.userId]);

  return [channel, createAndSetNewChannel, creating];
}

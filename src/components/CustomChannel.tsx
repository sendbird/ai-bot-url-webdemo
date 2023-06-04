import Channel from '@sendbird/uikit-react/Channel';
import {GroupChannel, SendbirdGroupChat} from "@sendbird/chat/groupChannel";
import {useCreateGroupChannel, useCreateGroupChannelTemp} from "../hooks/useCreateGroupChannel";
import {User} from "@sendbird/chat";
import {useGetBotUser} from "../hooks/useGetBotUser";
import LoadingScreen from "./LoadingScreen";
import {useConnectSendbirdChat} from "../hooks/useConnectSendbirdChat";
import {uuid} from "../utils";
import ChannelHeader from "@sendbird/uikit-react/Channel/components/ChannelHeader";
import {useEffect} from "react";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";

type Props = {
  hashedKey: string;
}

export default function CustomChannel(props: Props) {
  const { hashedKey } = props;
  const store = useSendbirdStateContext();
  const sb: SendbirdGroupChat = store.stores.sdkStore.sdk as SendbirdGroupChat;
  // const currentUser: User = useConnectSendbirdChat(currentUserId);
  const botUser: User = useGetBotUser(sb.currentUser, hashedKey);
  const channel: GroupChannel = useCreateGroupChannel(sb.currentUser, botUser);
  console.log('## currentUser: ', sb.currentUser);

  console.log('## botUser: ', botUser);

  console.log('## channel: ', channel);

  if (!channel) return <LoadingScreen/>;
  return <Channel
    channelUrl={channel.url}
    renderChannelHeader={
      <ChannelHeader></ChannelHeader>
    }
    // renderMessageInput={} // TODO
    // renderMessage={} // TODO
  />;
}
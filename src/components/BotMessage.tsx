import Channel from '@sendbird/uikit-react/Channel';
import {GroupChannel} from "@sendbird/chat/groupChannel";
import {useCreateGroupChannelTemp} from "../hooks/useCreateGroupChannel";
import {User} from "@sendbird/chat";
import {useGetBotUser} from "../hooks/useGetBotUser";
import LoadingScreen from "./LoadingScreen";
import {useConnectSendbirdChat} from "../hooks/useConnectSendbirdChat";
import {uuid} from "../utils";
import ChannelHeader from "@sendbird/uikit-react/Channel/components/ChannelHeader";

type Props = {
  hashedKey: string;
}

export default function BotMessage(props: Props) {
  const { hashedKey } = props;

  const currentUserId: string = uuid();
  const currentUser: User = useConnectSendbirdChat(currentUserId);
  // const botUser: User = useGetBotUser(currentUser, hashedKey);
  const channel: GroupChannel = useCreateGroupChannelTemp(currentUser);

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
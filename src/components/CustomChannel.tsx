import Channel from '@sendbird/uikit-react/Channel';
import {GroupChannel} from "@sendbird/chat/groupChannel";
import {useCreateGroupChannel} from "../hooks/useCreateGroupChannel";
import {User} from "@sendbird/chat";
import {useGetBotUser} from "../hooks/useGetBotUser";
import LoadingScreen from "./LoadingScreen";
import {useConnectSendbirdChat} from "../hooks/useConnectSendbirdChat";
import {uuid} from "../utils";

type Props = {
  hashedKey: string;
}

export default function CustomChannel(props: Props) {
  const { hashedKey } = props;

  const currentUserId: string = uuid();
  const currentUser: User = useConnectSendbirdChat(currentUserId);
  const botUser: User = useGetBotUser(currentUser, hashedKey);
  const channel: GroupChannel = useCreateGroupChannel(currentUser, botUser);

  if (!channel) return <LoadingScreen/>;
  return <Channel
    channelUrl={channel.url}
    renderChannelHeader={} // TODO
    renderMessageInput={} // TODO
    renderMessage={} // TODO
  />;
}
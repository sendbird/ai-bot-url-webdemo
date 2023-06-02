import Channel from '@sendbird/uikit-react/Channel';
import {GroupChannel} from "@sendbird/chat/groupChannel";
import {useCreateGroupChannel} from "../hooks/useCreateGroupChannel";

type Props = {
  hashedKey: string;
}

export default function CustomChannel(props: Props) {
  const { hashedKey } = props;

  const channel: GroupChannel = useCreateGroupChannel(hashedKey);

  return channel ? <>
    <Channel
      channelUrl={channel.url}
      renderChannelHeader={}
      renderMessageInput={}
      renderMessage={}
    />
  </>
    : null;

}
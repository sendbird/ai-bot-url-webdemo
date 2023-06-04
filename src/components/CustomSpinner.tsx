import {useChannelContext} from '@sendbird/uikit-react/Channel/context';
import {ClientUserMessage} from 'SendbirdUIKitGlobal';
import {useEffect} from 'react'
import {SendingStatus} from "@sendbird/chat/message";
import {USER_ID} from "../const";
import {scrollUtil} from "../utils";

type Props = {
  setActiveSpinnerId: React.Dispatch<React.SetStateAction<number>>;
  isMessageSent: boolean;
}

export default function CustomSpinner(props: Props) {
  const {
    setActiveSpinnerId,
    isMessageSent,
  } = props;

  const { allMessages } = useChannelContext();
  const lastMessage: ClientUserMessage = allMessages?.[allMessages?.length - 1] as ClientUserMessage;

  useEffect(() => {
    if(isMessageSent
      && lastMessage
      && lastMessage.sender?.userId === USER_ID
      && (lastMessage.sendingStatus === SendingStatus.SUCCEEDED
        || lastMessage.sendingStatus === SendingStatus.FAILED)
    ) {
      setActiveSpinnerId(lastMessage.messageId);
      scrollUtil();
    } else {
      setActiveSpinnerId(-1);
    }
  }, [lastMessage?.messageId]);

  return <></>;
}
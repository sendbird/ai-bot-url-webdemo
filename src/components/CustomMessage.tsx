import Message from '@sendbird/uikit-react/Channel/components/Message';
import {EveryMessage} from 'SendbirdUIKitGlobal';
import typingIndicatorLogo from '../icons/message-typing-indicator.gif';
import {LOCAL_MESSAGE_CUSTOM_TYPE} from "../const";
import BotMessageWithBodyInput from "./BotMessageWithBodyInput";
import {MessageType} from "@sendbird/chat/message";

type Props = {
  message: EveryMessage;
  activeSpinnerId: number;
}

export default function CustomMessage(props: Props) {
  const {
    message,
    activeSpinnerId,
  } = props;

  return (
    <div>
      {
        message.messageType === MessageType.USER
        && message.customType
        && message.customType === LOCAL_MESSAGE_CUSTOM_TYPE.linkSuggestion
          ? <BotMessageWithBodyInput message={message}/>
          : <Message message={message}/>
      }
      {
        activeSpinnerId === message.messageId &&
        <div style={{
          height: '60px',
          // marginTop: '24px',
        }}>
          <img src={typingIndicatorLogo} alt="pending..." style={{
            marginLeft: '40px',
            height: "inherit"
          }}/>
        </div>
      }
    </div>
  )
}
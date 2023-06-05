import {EveryMessage} from 'SendbirdUIKitGlobal';
import typingIndicatorLogo from '../icons/message-typing-indicator.gif';
import {LOCAL_MESSAGE_CUSTOM_TYPE} from "../const";
import BotMessageWithBodyInput from "./BotMessageWithBodyInput";
import {MessageType, UserMessage} from "@sendbird/chat/message";
import PendingMessage from "./PendingMessage";
import {MessageTextParser, Token, TokenType} from "../utils";
import SuggestedReplyMessageBody from "./SuggestedReplyMessageBody";
import ParsedBotMessageBody from "./ParsedBotMessageBody";
import Message from "@sendbird/uikit-react/Channel/components/Message";
import {User} from "@sendbird/chat";

type Props = {
  message: EveryMessage;
  activeSpinnerId: number;
  botUser: User;
}

export default function CustomMessage(props: Props) {
  const {
    message,
    activeSpinnerId,
    botUser,
  } = props;

  if ((message as UserMessage).sender.userId === botUser.userId) {
    if (message.customType && message.customType === LOCAL_MESSAGE_CUSTOM_TYPE.linkSuggestion) {
      return <BotMessageWithBodyInput
        message={message}
        bodyComponent={<SuggestedReplyMessageBody message={message}/>}
      />;
    }
    const tokens: Token[] = MessageTextParser((message as UserMessage).message);
    console.log('## tokens: ', tokens);
    if (tokens.length >= 2) {
      return <BotMessageWithBodyInput
        message={message}
        bodyComponent={<ParsedBotMessageBody
          message={message}
          tokens={tokens}
        />}
      />;
    }
  }
  return <div>
    {
      <Message message={message}/>
    }
    {
      activeSpinnerId === message.messageId &&
      <PendingMessage/>
    }
  </div>;
}
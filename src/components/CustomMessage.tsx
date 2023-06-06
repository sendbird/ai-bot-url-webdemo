import {EveryMessage} from 'SendbirdUIKitGlobal';
import typingIndicatorLogo from '../icons/message-typing-indicator.gif';
import {LOCAL_MESSAGE_CUSTOM_TYPE} from "../const";
import BotMessageWithBodyInput from "./BotMessageWithBodyInput";
import {MessageType, UserMessage} from "@sendbird/chat/message";
import PendingMessage from "./PendingMessage";
import {isNotLocalMessageCustomType, MessageTextParser, Token, TokenType} from "../utils";
import SuggestedReplyMessageBody from "./SuggestedReplyMessageBody";
import ParsedBotMessageBody from "./ParsedBotMessageBody";
import Message from "@sendbird/uikit-react/Channel/components/Message";
import {User} from "@sendbird/chat";
import ConfirmationMessageBody from "./ConfirmationMessageBody";

type Props = {
  message: EveryMessage;
  activeSpinnerId: number;
  botUser: User;
  messagesCount: number;
}

export default function CustomMessage(props: Props) {
  const {
    message,
    activeSpinnerId,
    botUser,
    messagesCount,
  } = props;

  if (messagesCount === 1) {
    return <Message message={message}/>;
  }

  if ((message as UserMessage).sender.userId !== botUser.userId) {
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
  if (!isNotLocalMessageCustomType(message.customType)) {
    if (message.customType === LOCAL_MESSAGE_CUSTOM_TYPE.linkSuggestion) {
      return <BotMessageWithBodyInput
        message={message}
        bodyComponent={<SuggestedReplyMessageBody message={message}/>}
      />;
    }
  }
  const tokens: Token[] = MessageTextParser((message as UserMessage).message);
  console.log('## tokens: ', tokens);
    return <div>
      <BotMessageWithBodyInput
        message={message}
        bodyComponent={<ParsedBotMessageBody
          message={message}
          tokens={tokens}
        />}
      />
      <BotMessageWithBodyInput
        message={message}
        bodyComponent={<ConfirmationMessageBody/>}
      />
    </div>;
}
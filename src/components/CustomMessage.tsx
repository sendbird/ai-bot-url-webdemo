import {EveryMessage} from 'SendbirdUIKitGlobal';
import typingIndicatorLogo from '../icons/message-typing-indicator.gif';
import {FIRST_MESSAGE_TEXT, LOCAL_MESSAGE_CUSTOM_TYPE} from "../const";
import BotMessageWithBodyInput from "./BotMessageWithBodyInput";
import {MessageType, UserMessage} from "@sendbird/chat/message";
import PendingMessage from "./PendingMessage";
import {isNotLocalMessageCustomType, MessageTextParser, Token, TokenType} from "../utils";
import SuggestedReplyMessageBody from "./SuggestedReplyMessageBody";
import ParsedBotMessageBody from "./ParsedBotMessageBody";
import Message from "@sendbird/uikit-react/Channel/components/Message";
import {User} from "@sendbird/chat";
import CustomMessageBody from "./CustomMessageBody";
import CurrentUserMessage from "./CurrentUserMessage";
import {useChannelContext} from "@sendbird/uikit-react/Channel/context";
import {StartingPageAnimatorProps} from "./CustomChannelComponent";
import styled from "styled-components";

type Props = {
  message: EveryMessage;
  activeSpinnerId: number;
  botUser: User;
}

const StartingBlock = styled.div`
  height: ${(props: StartingPageAnimatorProps) => (props.isStartingPage ? '98px' : '0')};
  width: 100%;
  transition: height 0.5s ease;
`;

export default function CustomMessage(props: Props) {
  const {
    message,
    activeSpinnerId,
    botUser,
  } = props;

  const {allMessages} = useChannelContext();
  const firstMessage: UserMessage = allMessages[0] as UserMessage;
  const firstMessageId = firstMessage?.messageId ?? -1;

  // Sent by current user
  if ((message as UserMessage).sender.userId !== botUser.userId) {
    return <div>
      {
        <CurrentUserMessage message={message}/>
      }
      {
        activeSpinnerId === message.messageId &&
        <PendingMessage/>
      }
    </div>;
  }

  if (message.messageId === firstMessageId) {
    return <div>
      <StartingBlock isStartingPage={allMessages.length === 1}/>
      <BotMessageWithBodyInput
        message={message}
        bodyComponent={
          <CustomMessageBody style={{ maxWidth: '270px' }} message={(message as UserMessage).message}/>
        }
        messageCount={allMessages.length}
      />
    </div>;
  }

  // Sent by bot
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
        bodyComponent={<CustomMessageBody message={'Did that answer your question?'}/>}
      />
    </div>;
}
import styled from "styled-components";
import { ReactComponent as BotMessageImage } from '../icons/bot-message-image.svg';
import {formatCreatedAtToAMPM} from "../utils";
import {UserMessage} from "@sendbird/chat/message";
import SuggestedReplyMessageBody from "./SuggestedReplyMessageBody";

const Root = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 6px;
`;

const Sender = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  color: rgba(0, 0, 0, 0.5);
  margin: 0 0 4px 12px;
`;

const BodyContainer = styled.div`
  max-width: 760px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  width: fit-content;
`;


const SentTime = styled.div`
  width: 70px;
  margin-left: 4px;
  color: rgba(0, 0, 0, 0.50);
  font-size: 12px;
  line-height: 1;
  margin-bottom: 6px;
`;

type Props = {
  message: UserMessage;
}

const ImageContainer = styled.div`
  min-width: 40px;
`;

export default function BotMessageWithBodyInput(props: Props) {
  const { message } = props;

  return <Root>
    <ImageContainer>
      <BotMessageImage height={'28px'} width={'28px'}/>
    </ImageContainer>
    <BodyContainer>
      <Sender>{message.sender.nickname}</Sender>
      <div>
        <SuggestedReplyMessageBody message={message}/>
      </div>
    </BodyContainer>
    <SentTime>
      {formatCreatedAtToAMPM(message.createdAt)}
    </SentTime>
  </Root>;
}
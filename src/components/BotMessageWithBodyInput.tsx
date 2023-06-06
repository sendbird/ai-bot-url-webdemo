import styled from "styled-components";
import botMessageImage from '../icons/bot-message-image.png';
import {formatCreatedAtToAMPM} from "../utils";
import {UserMessage} from "@sendbird/chat/message";
import {ReactNode} from "react";
import {StartingPageAnimatorProps} from "./CustomChannelComponent";

const Root = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 6px;
  flex-wrap: wrap;
  gap: 8px;
  z-index: 30;
  position: relative;
`;

const Sender = styled.div<StartingPageAnimatorProps>`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  color: ${(props: StartingPageAnimatorProps) => (props.isStartingPage ? '#FFFFFF' : 'rgba(0, 0, 0, 0.5)')};
  transition: color 0.5s;
  transition-timing-function: ease;
  margin: 0 0 4px 12px;
`;

const BodyContainer = styled.div`
  max-width: 300px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  width: fit-content;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
`;

const SentTime = styled.div`
  width: 70px;
  color: rgba(0, 0, 0, 0.50);
  font-size: 12px;
  line-height: 1;
  margin-bottom: 6px;
`;

type Props = {
  message: UserMessage;
  bodyComponent: ReactNode;
  messageCount: number;
}

const ImageContainer = styled.div`
`;

export default function BotMessageWithBodyInput(props: Props) {
  const { message, bodyComponent, messageCount } = props;

  return <Root>
    <ImageContainer>
      <img src={botMessageImage} alt="botProfileImage" style={{
        height: "28px"
      }}/>
    </ImageContainer>
    <BodyContainer>
      <Sender isStartingPage={messageCount === 1}>{message.sender.nickname}</Sender>
      {bodyComponent}
    </BodyContainer>
    <SentTime>
      {formatCreatedAtToAMPM(message.createdAt)}
    </SentTime>
  </Root>;
}
import styled from "styled-components";
import BotMessageImage from '../icons/bot-message-image.svg';
import {ReactNode} from "react";
import {formatCreatedAtToAMPM} from "../utils";

const Root = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
`;

const Sender = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  color: rgba(0, 0, 0, 0.5);
`;

const SentTime = styled.div`
  color: rgba(255, 255, 255, 0.88);
`;

const Body = styled.div`
  background-color: #eeeeee;
  &:hover {
    background-color: #e0e0e0;
  }
`;

type Props = {
  senderName: string;
  createdAt: number;
  bodyComponent: ReactNode;
}

export default function BotMessageWithBodyInput(props: Props) {
  const { senderName, createdAt, bodyComponent } = props;

  return <Root>
    <BotMessageImage/>
    <div>
      <Sender>{senderName}</Sender>
      <Body>{bodyComponent}</Body>
    </div>
    <SentTime>
      {formatCreatedAtToAMPM(createdAt)}
    </SentTime>
  </Root>;
}
import {SuggestedReply} from "../const";
import styled from "styled-components";
import {UserMessage} from "@sendbird/chat/message";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 12px;
  gap: 8px;
  border-radius: 16px;
  background-color: #eeeeee;
  &:hover {
    background-color: #e0e0e0;
  }
  max-width: 480px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LinkButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
  width: 220px;
  height: 32px;
  background: #6210CC;
  border-radius: 16px;
  color: white;
  cursor: pointer;
  margin: 4px 0;
`;

const Text = styled.div`
  width: 100%;
  text-align: left;
  white-space: pre-line;
  word-break: break-word;
  line-height: 1.43;
`;

type Props = {
  message: UserMessage;
}

export default function SuggestedReplyMessageBody(props: Props) {
  const { message } = props;
  const data: SuggestedReply = JSON.parse(message.data ?? '');
  return <Root>
    <Text>{data.text}</Text>
    <ButtonContainer>
      <LinkButton
        href={data.link}
        id={data.buttonText}
        target="_blank"
      >
        {data.buttonText}
      </LinkButton>
    </ButtonContainer>
  </Root>;
}
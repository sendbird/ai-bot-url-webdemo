import {SuggestedReply} from "../const";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 6px 12px 12px;
  gap: 8px;

  width: 100%;
  background: #EEEEEE;
  border-radius: 16px;
`;

const LinkButton = styled.a`
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
`;

const Text = styled.div`
  width: 100%;
  text-align: left;
`;

type Props = {
  suggestedReply: SuggestedReply;
}

export default function SuggestedReplyMessageBody(props: Props) {
  const { suggestedReply } = props;
  return <Root>
    <Text>{suggestedReply.text}</Text>
    <LinkButton
      href={suggestedReply.link}
      id={suggestedReply.buttonText}
      target="_blank"
    >
      {suggestedReply.buttonText}
    </LinkButton>
  </Root>;
}
import styled from "styled-components";
// Ref: https://github.com/rajinwonderland/react-code-blocks#-demo
import {CopyBlock, irBlack } from "react-code-blocks";
import { ReactComponent as CopyIcon } from '../icons/copy-icon.svg';
import BotMessageBottom from "./BotMessageBottom";
import {MessageTextParser, Token, TokenType} from "../utils";
import {UserMessage} from "@sendbird/chat/message";
import SourceContainer, {Source} from "./SourceContainer";

const Root = styled.div`
  background-color: #eeeeee;
  &:hover {
    background-color: #e0e0e0;
  }
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 12px;
  gap: 12px;
  border-radius: 16px;
  white-space: pre-wrap;
`;

const Text = styled.div`
  width: 100%;
  text-align: left;
`;

type Props = {
  message: UserMessage;
  tokens: Token[];
}

/**
 * Parses bot message text to process code snippets within the text.
 * @param props
 * @constructor
 */
export default function ParsedBotMessageBody(props: Props) {
  const { message, tokens } = props;
  const sources: Source[] = JSON.parse((message as UserMessage).data);

  console.log('## tokens11: ', tokens);
  if (tokens.length > 0) {
    return <Root>
        {
          tokens.map((token: Token, i) => {
            if (token.type === TokenType.string) {
              return <div key={'token' + i}>{token.value}</div>;
            }
            return (
              <CopyBlock
                key={'token' + i}
                text={token.value}
                language={token.type}
                theme={irBlack}
                showLineNumbers={true}
              />
            )
          })
        }
      data ? <SourceContainer sources={sources}/>
      <BotMessageBottom/>
    </Root>;
  }
  return <Text>{message.message}</Text>;
}
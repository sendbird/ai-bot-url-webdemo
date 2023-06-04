import styled from "styled-components";
// Ref: https://github.com/rajinwonderland/react-code-blocks#-demo
import {CopyBlock} from "react-code-blocks";
import {MessageTextParser, Token, TokenType} from "./MessageTextParser";
import CopyIcon from '../icons/copy-icon.svg';
import BotMessageBottom from "./BotMessageBottom";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
  background: #ECECEC;
  border-radius: 8px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px 0px 16px;
  width: 100%;
  color: #5E5E5E;
`;

const Text = styled.div`
  width: 100%;
  text-align: left;
`;

type Props = {
  text: string;
}

/**
 * Parses bot message text to process code snippets within the text.
 * @param props
 * @constructor
 */
export default function ParsedBotMessageBody(props: Props) {
  const { text } = props;
  const tokens: Token[] = MessageTextParser(text);
  const codeSnippetTokens: Token[] = tokens.filter((token: Token) => {
    return token.type === TokenType.codeSnippet;
  });

  if (tokens.length > 0) {
    return <Root>
      <TitleContainer>
        <div>Code snippet</div>
        <div onClick={() => {
          navigator.clipboard.writeText(codeSnippetTokens.join('\n\n'));
        }}>
          <CopyIcon/>
        </div>
      </TitleContainer>
      <Text>
        {
          tokens.map((token: Token) => {
            if (token.type === TokenType.string) {
              return <div>{token.value}</div>;
            }
            return (
              <CopyBlock
                text={token.value}
                language={token.type}
              />
            )
          })
        }
      </Text>
      <BotMessageBottom/>
    </Root>;
  }
  return <Text>{text}</Text>;
}
import styled from "styled-components";
// Ref: https://github.com/rajinwonderland/react-code-blocks#-demo
import {CopyBlock} from "react-code-blocks";
import {Token, tokenizer, TokenType} from "./MessageFragment/tokenizer";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
  background: #ECECEC;
  border-radius: 8px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
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
export default function ParsedBotMessageText(props: Props) {
  const { text } = props;
  const tokens: Token[] = tokenizer(text);

  return <Root>
    <Title>Code snippet</Title>
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
  </Root>;
}
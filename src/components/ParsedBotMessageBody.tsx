import styled from "styled-components";
import Highlight from 'react-highlight'

// themes are in node_modules/highlight.js/styles
// see: https://highlightjs.org/static/demo/
import 'highlight.js/styles/atom-one-dark.css';

// Ref: https://github.com/rajinwonderland/react-code-blocks#-demo
// import {CopyBlock, irBlack } from "react-code-blocks";
import BotMessageBottom from "./BotMessageBottom";
import {Token, TokenType} from "../utils";
import {UserMessage} from "@sendbird/chat/message";
import SourceContainer, {Source} from "./SourceContainer";

const Root = styled.div`
  display: flex;
  background-color: #eeeeee;
  &:hover {
    background-color: #e0e0e0;
  }
  max-width: 600px;
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

const TextComponent = styled.div`
  white-space: pre-line;
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
  const data: object = JSON.parse((message as UserMessage).data);
  const sources: Source[] = Array.isArray(data) ? data as Source[] : [];

  console.log('## sources: ', sources);
  if (tokens.length > 0) {
    return <Root>
        {
          tokens.map((token: Token, i) => {
            if (token.type === TokenType.string) {
              return <TextComponent key={'token' + i}>{token.value}</TextComponent>;
            }
            // move to seperate component and add copy feature
            // add numbering to code blocks https://github.com/wcoder/highlightjs-line-numbers.js/
            return (
              <div key={'token' + i} style={{ width: '100%', overflowX: 'scroll' }}>
                <Highlight
                  // must be correct language name such as 'javascript' or 'python'
                  // https://highlightjs.org/static/demo/
                  // className='language-name-of-snippet'
                >
                  { token.value }
                </Highlight>
              </div>

            )
          })
        }
      {
        sources.length > 0
          ? <SourceContainer sources={sources}/>
          : null
      }
      <BotMessageBottom/>
    </Root>;
  }
  return <Text>{message.message}</Text>;
}
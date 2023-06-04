import styled from "styled-components";
// Ref: https://github.com/rajinwonderland/react-code-blocks#-demo
import { CopyBlock } from "react-code-blocks";

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

export default function CodeSnippetMessageBody(props: Props) {
  const { text } = props;
  const language = '';
  const code = '';

  return <Root>
    <Title>Code snippet</Title>
    <Text>
      <CopyBlock
        text={code}
        language={language}
      />
    </Text>
  </Root>;
}
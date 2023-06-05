import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F7F7F7;
  color: rgba(255, 255, 255, 0.88);
`;

const Highlighter = styled.div`
  text-decoration: underline;
  color: white;
`;

export default function BottomTextContainer() {
  return <Container>
    <div>Add an </div><Highlighter>AI chatbot</Highlighter> to your product by Sendbird
  </Container>;
};
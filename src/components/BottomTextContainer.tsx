import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F7F7F7;
`;

export default function BottomTextContainer() {
  return <Container>
    <div style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
      Add an <div style={{ color: '#742DDD' }}>AI chatbot</div> to your product by Sendbird
    </div>
  </Container>;
};
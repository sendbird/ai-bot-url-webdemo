import styled from "styled-components";
import typingIndicatorLogo from '../icons/message-typing-indicator.gif';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoadingScreen() {
  return <Container>
    <img
      src={typingIndicatorLogo}
      alt="pending..."
      style={{
        height: '60px',
        marginLeft: '40px',
      }}
    />
  </Container>;
};
import styled from "styled-components";
import typingIndicatorLogo from '../assets/message-typing-indicator.gif';

const Container = styled.div`
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
import styled from "styled-components";
import { ReactComponent as SendbirdLogo } from '../icons/sendbird-logo-widget.svg';

const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(273.73deg, #4DCD90 -0.83%, #6210CC 48.04%, #6210CC 75.45%);
  color: rgba(255, 255, 255, 0.88);
  flex-wrap: wrap;
  font-size: 14px;
`;

const Highlighter = styled.div`
  text-decoration: underline;
  color: white;
`;

export default function ChatBottom() {
  return <Container>
    Add an &nbsp;<Highlighter>AI chatbot</Highlighter> &nbsp;to your product by &nbsp;<SendbirdLogo width={'80px'}/>
  </Container>;
}
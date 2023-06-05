import styled from "styled-components";
import {TYPE_FACE} from "../const";
import { ReactComponent as SendbirdLogo } from '../icons/sendbird-logo-widget.svg';

const StyledWidgetTopWrapper = styled.div`
  background: linear-gradient(
    180deg,
    #6210cc 39.06%,
    rgba(98, 16, 204, 0) 100%
  );
  height: 238px;
  padding: 32px;
  > div {
    color: #ffffff;
    font-family: ${TYPE_FACE.gellix};
    font-size: 36px;
    line-height: 48px;
    font-weight: 700;
    margin-top: 16px;
    div:first-child {
      font-size: 30px;
      line-height: 38px;
      font-weight: 600;
      opacity: 0.8;
    }
  }
`;

export function ChatBeginPage() {
  return (
    <StyledWidgetTopWrapper>
      <SendbirdLogo />
      <div>
        <div>I'm Docs AI assistant.</div>
        <div>How can I help you?</div>
      </div>
    </StyledWidgetTopWrapper>
  );
};
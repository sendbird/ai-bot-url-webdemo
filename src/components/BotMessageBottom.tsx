import styled from "styled-components";
import { ReactComponent as InfoIcon } from '../icons/info-icon.svg';
import {useState} from "react";

const Text = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`;

const TheRealRoot = styled.div`
  position: relative;
  width: 100%;
`;

const Root = styled.div`
  //border-radius: 0 0 16px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 0;
`;

const Delimiter = styled.div`
  position: absolute;
  width: calc(100% + 24px);
  transform: translateX(-12px);
  border-top: 1px solid rgba(0, 0, 0, 0.12);
`;

const InfoIconButton = styled.div`
  cursor: pointer;
`;

const InfoBox = styled.div`
  padding: 8px 12px;
  position: absolute;
  width: 326px;
  left: calc(50% - 326px/2);
  top: -100%;
  background: #000000;
  opacity: 0.8;
  border-radius: 8px;
`;

export interface Source {
  title: string;
  link: string;
}


export default function BotMessageBottom() {

  const [showInfoBox, setShowInfoBox] = useState(false);

  return <TheRealRoot>
    <Delimiter/>
    <Root>
      <Text>AI-generated answer</Text>
      <InfoIconButton
        onMouseEnter={() => setShowInfoBox(true)}
        onMouseLeave={() => setShowInfoBox(false)}
      >
        <InfoIcon height={'28px'} width={'28px'}/>
      </InfoIconButton>
    </Root>
    showInfoBox && <InfoBox>
      This answer is based only on content
      specified by Docs assistant. It is AI generated so
      may not be fully correct.
    </InfoBox>
  </TheRealRoot>
}
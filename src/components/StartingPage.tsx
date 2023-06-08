import styled from "styled-components";
import { ReactComponent as BackgroundImage } from '../icons/starting-page-background.svg';
import { ReactComponent as SendbirdLogo } from '../icons/sendbird-logo-starting-page.svg';
import {StartingPageAnimatorProps} from "./CustomChannelComponent";
import {useContext} from "react";
import {DemoConstant} from "../const";
import {DemoStatesContext} from "../context/DemoStatesContext";

const BackgroundContainer = styled.div<StartingPageAnimatorProps>`
  position: absolute;
`;

const TitleContainer = styled.div`
  position: absolute;
  padding: 24px;
`;

const Root = styled.div<StartingPageAnimatorProps>`
  position: relative;
  top: ${(props: StartingPageAnimatorProps) => (props.isStartingPage ? '0' : '-250px')};
  opacity: ${(props: StartingPageAnimatorProps) => (props.isStartingPage ? '1' : '0')};
  z-index: 20;
  width: 100%;
  transition: ${(props: StartingPageAnimatorProps) => (props.isStartingPage ? 'none' : 'all 0.5s ease')};
`;

const HeaderOne = styled.div`
  //font-weight: 600;
  padding-top: 16px;

  font-size: 24px;
  line-height: 36px;
  color: #FFFFFF;
  opacity: 0.8;
  margin-top: 24px;
`;

const HeaderTwo = styled.div`
  font-weight: 700;
  font-size: 27px;
  margin-top: 8px;
  color: #FFFFFF;
  //margin-top: 8px;
`;

interface Props {
  isStartingPage: boolean;
}

export function StartingPage(props: Props) {
  const { isStartingPage } = props;
  const demoStates = useContext<DemoConstant>(DemoStatesContext);

  return (
    <Root isStartingPage={isStartingPage}>
      <BackgroundContainer>
        <BackgroundImage width={'400px'}/>
      </BackgroundContainer>
      <TitleContainer>
        <SendbirdLogo width={'100px'}/>
        <HeaderOne>{demoStates.startingPageContent.headerOne}</HeaderOne>
        <HeaderTwo>{demoStates.startingPageContent.headerTwo}</HeaderTwo>
      </TitleContainer>
    </Root>
  );
};
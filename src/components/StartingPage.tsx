import styled from "styled-components";
import { ReactComponent as SendbirdLogo } from '../icons/sendbird-logo-starting-page.svg';
import {StartingPageAnimatorProps} from "./CustomChannelComponent";
import {useContext, useEffect} from "react";
import {DemoConstant} from "../const";
import {DemoStatesContext} from "../context/DemoStatesContext";
import backgroundImageWebp from '../icons/starting-page-bg-image.webp';

import {useImageLoadingState} from "../context/ImageLoadingStateContext";



const BackgroundContainer = styled.div`
  position: absolute;
`;

const TitleContainer = styled.div`
  width: calc(100% - 64px);
  position: absolute;
  padding: 32px;
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
  //font-size: 24px;
  //line-height: 36px;
  color: #FFFFFF;
  opacity: 0.8;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  font-family: 'Gellix', sans-serif;
`;

const HeaderTwo = styled.div`
  font-weight: 700;
  //font-size: 27px;
  margin-top: 2px;
  font-family: 'Gellix', sans-serif;
  color: #FFFFFF;
  //margin-top: 8px;
  font-size: 32px;
  line-height: 40px;
`;

export const BetaLogo = styled.div`
  padding: 4px;
  background: #C8D9FA;
  border-radius: 2px;
  font-weight: 500;
  font-size: 11px;
  line-height: 12px;
  color: #30308F;
  font-family: 'SF Pro Display', sans-serif;
  letter-spacing: 0.8px;
`;

export const HeaderOneContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 14px 0 0;
`;


interface Props {
  isStartingPage: boolean;
}

export function StartingPage(props: Props) {
  const { isStartingPage } = props;
  const demoStates = useContext<DemoConstant>(DemoStatesContext);
  const isWebDemo: boolean = demoStates.name === 'webDemo';
  // console.log('## isWebDemo: ', isWebDemo);
  const { setShowImageLoading } = useImageLoadingState();

  useEffect(() => {
    setShowImageLoading(false);
    // setTimeout(() => {
    //   setShowImageLoading(false);
    // }, 500);
  }, []);

  return (
    <Root isStartingPage={isStartingPage}>
      <BackgroundContainer>
        <img src={backgroundImageWebp} alt="backgroundImage" style={{
          height: '240px',
        }}/>
        {/*<BackgroundImage width='743px' height='240px'/>*/}
      </BackgroundContainer>
      {
        isWebDemo
          ? <TitleContainer>
            <SendbirdLogo width={'100px'}/>
            <HeaderOneContainer>
              <HeaderOne>{demoStates.startingPageContent.headerOne}</HeaderOne>
              <BetaLogo>{ isWebDemo ? 'DEMO' : 'BETA' }</BetaLogo>
            </HeaderOneContainer>
            <HeaderTwo>{demoStates.startingPageContent.headerTwo}</HeaderTwo>
          </TitleContainer>
          : <TitleContainer>
            <SendbirdLogo width={'100px'}/>
            <HeaderOneContainer style={{ alignItems: 'flex-end' }}>
              <HeaderOne>{demoStates.startingPageContent.headerOne}</HeaderOne>
              <BetaLogo style={{ marginBottom: '3px' }}>{ isWebDemo ? 'DEMO' : 'BETA' }</BetaLogo>
            </HeaderOneContainer>
            <HeaderTwo>{demoStates.startingPageContent.headerTwo}</HeaderTwo>
          </TitleContainer>
      }
    </Root>
  );
}
import styled, {keyframes} from "styled-components";
import { ReactComponent as BackgroundImage } from '../icons/starting-page-background.svg';
import { ReactComponent as SendbirdLogo } from '../icons/sendbird-logo-starting-page.svg';

interface RootProps {
  isStartingPage: boolean;
}

const moveUp = keyframes`
0%{
  transform: translateY(0%);
}
50%{
  transform: translateY(-50%);
}
100%{
  transform: translateY(-100%);
}
`;

const BackgroundContainer = styled.div<RootProps>`
  position: absolute;
  z-index: 10;
  //transform: translateY(-100%);
  // opacity: 
  //transition: transform 0.5s;
  //transition-timing-function: ease;
  ${(props: RootProps) => (props.isStartingPage ? '' : 'animation: ${moveUp} 1s ease;')};
`;

const TitleContainer = styled.div`
  position: absolute;
  z-index: 20;
  padding: 24px;

`;

const Root = styled.div<RootProps>`
  position: relative;
  z-index: 0;
  // opacity: ${(props: RootProps) => (props.isStartingPage ? 1 : 0)};
  // transition: opacity 0.5s;
  // transition-timing-function: ease;
  overflow-y: hidden;
`;

const HeaderOne = styled.div`
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: #FFFFFF;
  opacity: 0.8;
  margin-top: 24px;
`;

const HeaderTwo = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  color: #FFFFFF;
  margin-top: 8px;
`;

interface Props {
  isStartingPage: boolean;
}

export function StartingPage(props: Props) {
  return (
    <Root isStartingPage={props.isStartingPage}>
      <BackgroundContainer>
        <BackgroundImage width={'400px'}/>
      </BackgroundContainer>
      <TitleContainer>
        <SendbirdLogo width={'100px'}/>
        <HeaderOne>I'm Docs AI assistant.</HeaderOne>
        <HeaderTwo>How can I help you?</HeaderTwo>
      </TitleContainer>
    </Root>
  );
};
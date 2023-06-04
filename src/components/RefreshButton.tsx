import styled from "styled-components";
import RefreshIcon from '../icons/refresh-icon.svg';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 2px;
  cursor: pointer;
`;

const Text = styled.div`
  color: #6210CC;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
`;

export default function RefreshButton() {
  return <Root>
    <Text>Renew</Text>
    <RefreshIcon/>
  </Root>;
}
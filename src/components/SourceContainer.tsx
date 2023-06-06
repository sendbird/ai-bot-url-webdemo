import styled from "styled-components";
import { ReactComponent as OpenLinkIcon } from '../icons/open-link-icon.svg';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 100%;
`;

const RootTitle = styled.div`
  color: rgba(0, 0, 0, 0.5);
`;

const SourceTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.1px;
  text-decoration-line: underline;
  color: rgba(0, 0, 0, 0.88);
`;

const SourceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 4px 0;
`;


const IconLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`;

export interface Source {
  source: string
  title: string;
  description: string;
  language: string;
}

type Props = {
  sources: Source[];
}

export default function SourceContainer(props: Props) {
  const { sources } = props;

  return <Root>
    <RootTitle>Source</RootTitle>
    {
      sources.map((source: Source) => {
        return <>
          <SourceItem>
            <a href={source.source} id="openLinkText" target="_blank">
              <SourceTitle>{source.title}</SourceTitle>
            </a>
            <IconLink>
              <a href={source.source} id="openLinkIcon" target="_blank">
                <OpenLinkIcon width={'100%'} height={'100%'}/>
              </a>
            </IconLink>
          </SourceItem>
        </>
      })
    }
  </Root>
}
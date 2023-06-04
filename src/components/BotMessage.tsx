import {EveryMessage} from "SendbirdUIKitGlobal";
import Message from "@sendbird/uikit-react/Channel/components/Message";
import styled from "styled-components";

type Props = {
  message: EveryMessage;
}

export default function BotMessage(props: Props) {
  const { message } = props;

  return <>
    <Message
      message={message}
      // will remove this in next release
      handleScroll={() => {
        // if you have issue with last message not scrolling to bottom
        // use scrollRef?.scrollIntoView()
        // scrollRef is from channel ctxt
      }}
    />

  </>
}
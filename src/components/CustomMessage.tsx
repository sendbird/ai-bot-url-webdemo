import Message from '@sendbird/uikit-react/Channel/components/Message';
import { EveryMessage } from 'SendbirdUIKitGlobal';
import typingIndicatorLogo from '../assets/message-typing-indicator.gif';

type Props = {
  message: EveryMessage;
  activeSpinnerId: number;
}

export default function CustomMessage(props: Props) {
  const {
    message,
    activeSpinnerId,
  } = props;

  return (
    <div>
      <Message
        message={message}
        // will remove this in next release
        handleScroll={() => {
          // if you have issue with last message not scrolling to bottom
          // use scrollRef?.scrollIntoView()
          // scrollRef is from channel ctxt
        }}
      />
      {
        activeSpinnerId === message.messageId &&
        <div style={{
          height: '60px',
          // marginTop: '24px',
        }}>
          <img src={typingIndicatorLogo} alt="pending..." style={{
            marginLeft: '40px',
            height: "inherit"
          }}/>
        </div>
      }
    </div>
  )
}
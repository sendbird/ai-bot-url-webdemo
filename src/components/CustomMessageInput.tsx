import { useRef, useState } from "react";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import { useChannelContext } from "@sendbird/uikit-react/Channel/context";
import { UserMessageCreateParams } from "@sendbird/chat/message";

export default function CustomMessageInput() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showSendButton, setShowSendButton] = useState<boolean>(false);
  const store = useSendbirdStateContext();
  const sendUserMessage = sendbirdSelectors.getSendUserMessage(store);
  const { currentGroupChannel } = useChannelContext();
  return (
    <div>
      <textarea
        onKeyDown={(e) => {
          // TODO: handle enter key
          console.log('## onKeyDown', e);
          if (e.keyCode==13) {
            // send message, same as onClick on  button
          }
        }}
        ref={inputRef}
        onChange={(e) => {
          console.log('## onChange', e);
          const element = inputRef.current;
          if (element) {
            const value = element.value;
            if (value.length > 0) {
              setShowSendButton(true);
            } else {
              setShowSendButton(false);
            }
          }
        }}
      />
      {
        showSendButton && (
          <button onClick={() => {
            console.log('## onClick');
            const element = inputRef.current;
            if (element && currentGroupChannel) {
              const message = element.value;
              const params: UserMessageCreateParams = {
                message,
                // add more custom params here if you need
              };
              sendUserMessage(currentGroupChannel, params)
                .onPending((p) => {
                  // TODO: show spinner
                  console.log('## onPending', p);
                  element.value = '';
                })
                .onSucceeded((m) => {
                  console.log('## onSucceeded', m);
                })
                .onFailed((f) => {
                  console.log('## onFailed', f);
                })
            }
          }}>Send</button>
        )
      }
    </div>
  )
}

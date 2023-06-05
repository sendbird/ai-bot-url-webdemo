/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@sendbird/chat";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { UserMessage } from "@sendbird/chat/message";
import { useChannelContext } from "@sendbird/uikit-react/Channel/context"
import { useCallback } from "react";

type OnMessageRecivedPayload = {
  channel: GroupChannel;
  message: UserMessage;
}

type OnMessageRecivedDispatcher = ({
  type,
  payload,
}: {
  type: 'ON_MESSAGE_RECEIVED',
  payload: OnMessageRecivedPayload,
}) => void;

export function useSendLocalMessage() {
  const channelStore = useChannelContext();
  const currentGroupChannel = channelStore.currentGroupChannel;
  // this is the magic function that adds the message to channelStore
  // @ts-expect-error no-unused-vars
  const messagesDispatcher = channelStore.messagesDispatcher as OnMessageRecivedDispatcher;
  const useSendLocalMessage = useCallback((message: UserMessage) => {
    if (currentGroupChannel) {
      messagesDispatcher({
        type: 'ON_MESSAGE_RECEIVED',
        payload: {
          channel: currentGroupChannel,
          message,
        },
      });
    }
  } , [currentGroupChannel, messagesDispatcher]);
  return useSendLocalMessage;
}

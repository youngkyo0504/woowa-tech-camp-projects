import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled, { css } from 'styled-components';

import { useUser } from '@queries/useUser';
import { IMessage } from '@customTypes/chat';
import { getHourAndMinite } from '@utils/common';

interface ChatDisplayProps {
  messages?: IMessage[];
}

export default function ChatDisplay({ messages = [] }: ChatDisplayProps) {
  const { user } = useUser();

  const isSameTimeWithPrevMessage = (currentMessage: IMessage, prevMessage: IMessage) => {
    if (!prevMessage) return false;
    if (currentMessage.senderId !== prevMessage.senderId) return false;
    const currentMessageMinute = new Date(currentMessage.createdAt).getMinutes();
    const nextMessageMinute = new Date(prevMessage.createdAt).getMinutes();
    return currentMessageMinute === nextMessageMinute;
  };

  return (
    <ChatDisplayContainer>
      {messages.map((message, idx) => {
        const { id, senderId, content, createdAt } = message;
        const prevMessage = messages[idx - 1];
        return (
          <ChatContainer key={id} isUser={senderId === user.id}>
            <Chat isUser={senderId === user.id}>{content}</Chat>
            {!isSameTimeWithPrevMessage(message, prevMessage) && (
              <ChatTime>{getHourAndMinite(createdAt)}</ChatTime>
            )}
          </ChatContainer>
        );
      })}
    </ChatDisplayContainer>
  );
}

const ChatDisplayContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background-color: ${colors.white};
  ${mixin.flexMixin({ direction: 'column-reverse' })};
  flex: 1;
`;

const Chat = styled.div<{ isUser: boolean }>`
  margin: 10px;
  ${mixin.flexMixin({ align: 'flex-end' })}
  padding: 12px;
  font-size: 14px;
  max-width: 50%;
  line-height: 16px;

  ${({ isUser }) =>
    isUser
      ? css`
          background: #2ac1bc;
          border-radius: 8px 0px 8px 8px;
          color: ${colors.white};
        `
      : css`
          background: #ffffff;
          border: 1px solid #2ac1bc;
          border-radius: 0px 8px 8px 8px;
          color: ${colors.black};
        `}
`;

const ChatTime = styled.span`
  color: ${colors.grey1};
  margin-bottom: 1rem;
  font-size: 0.75rem;
`;

const ChatContainer = styled.div<{ isUser: boolean }>`
  width: 100%;
  ${({ isUser }) =>
    mixin.flexMixin({ direction: isUser ? 'row-reverse' : 'row', align: 'flex-end' })};
`;

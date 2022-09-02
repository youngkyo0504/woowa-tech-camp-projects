import colors from '@constants/colors';
import { IChatRoom } from '@customTypes/chat';
import useChat from '@hooks/chat/useChat';
import mixin from '@style/mixin';
import styled from 'styled-components';
// import useChat from '@hooks/chat/useChat';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';

interface ChattingProps {
  chatRoom?: IChatRoom;
}

export default function Chatting({ chatRoom }: ChattingProps) {
  const { messages, sendMessage } = useChat(Number(chatRoom?.id), chatRoom?.messages || []);
  return (
    <Container>
      <ChatDisplay messages={messages} />
      <ChatInput sendMessage={sendMessage} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  flex: 2;
  height: 100px;
  box-shadow: inset 0px -1px 0px ${colors.grey3};
  ${mixin.flexMixin({ direction: 'column' })};
`;

import Chatting from '@components/ChattingRoom/Chatting';
import ChattingProductInfo from '@components/ChattingRoom/ChattingProductInfo';
import LoadingIndicator from '@components/common/LoadingIndicator';
import NavigationBar from '@components/common/NavigationBar';
import TransitionPage from '@components/TransitionPage';
import { useChatRoom } from '@queries/useChatRoom';
import { useParams } from 'react-router-dom';

export default function ChattingPage() {
  const { chatRoomId } = useParams();
  const { chatRoom, isLoading } = useChatRoom(Number(chatRoomId));
  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <TransitionPage depth={4}>
      <NavigationBar title="채팅" />
      <ChattingProductInfo productId={chatRoom?.productId || 0} />
      <Chatting chatRoom={chatRoom} />
    </TransitionPage>
  );
}

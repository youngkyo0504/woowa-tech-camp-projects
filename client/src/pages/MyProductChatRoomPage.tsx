import NavigationBar from '@components/common/NavigationBar';
import ChattingRoom from '@components/MyTab/ChattingRoom';
import TransitionPage from '@components/TransitionPage';
import { padding } from '@constants/padding';
import { useMyProductChatRooms } from '@queries/useChatRoom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function MyProductChatRoomPage() {
  const { productId } = useParams();

  const { myProductChatRooms } = useMyProductChatRooms(Number(productId));

  return (
    <TransitionPage depth={3}>
      <NavigationBar title="채팅하기" />
      <Container>
        <ChattingRoom chattingRoomsInfo={myProductChatRooms || []} />
      </Container>
    </TransitionPage>
  );
}

const Container = styled.div`
  padding-top: ${padding.pageTop};
`;

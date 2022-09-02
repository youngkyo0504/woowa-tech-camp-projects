import EmptyIndicator from '@components/common/EmptyIndicator';
import { IChatRoom } from '@customTypes/chat';
import ChattingList from './ChattingList';

interface ChattingRoomInfoProps {
  chattingRoomsInfo: IChatRoom[];
}
export default function ChattingRoom({ chattingRoomsInfo }: ChattingRoomInfoProps) {
  const filteredChatRooms = chattingRoomsInfo.filter((chatRoom) => chatRoom.messages.length);
  return filteredChatRooms.length ? (
    <ul>
      {filteredChatRooms.map((chatRoomInfo) => {
        const { productId, id, peer, messages } = chatRoomInfo;
        const latestMessage = messages[0];
        const latestMessageTime = new Date(latestMessage?.createdAt);
        return (
          <ChattingList key={id} {...{ id, peer, latestMessage, latestMessageTime, productId }} />
        );
      })}
    </ul>
  ) : (
    <EmptyIndicator message="아직 문의를 주신 분이 없네요" />
  );
}

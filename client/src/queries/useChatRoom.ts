import { useUser } from '@queries/useUser';
import { getAllChatRoom, getChatRoom, getMyProductChatRoom } from '@apis/chatRoom';
import { IChatRoom, IChatRoomResponse } from '@customTypes/chat';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useChatRoom(chatRoomId: number) {
  const { user } = useUser();
  const { data: chatRoom, isLoading } = useQuery<IChatRoomResponse, AxiosError, IChatRoom>(
    ['chatRoom', chatRoomId],
    () => getChatRoom(chatRoomId),
    {
      select: (originalChatRoom) => selectPeer(user.id, originalChatRoom),
    },
  );
  return { chatRoom, isLoading };
}

export function useChatRooms() {
  const { user } = useUser();
  const { data: chatRooms, refetch: refetchChatRooms } = useQuery<
    IChatRoomResponse[],
    AxiosError,
    IChatRoom[]
  >(['chatRooms'], getAllChatRoom, {
    select: (originalChatRooms) =>
      originalChatRooms.map((originalChatRoom) => selectPeer(user.id, originalChatRoom)),
  });
  return { chatRooms, refetchChatRooms };
}

export function useMyProductChatRooms(productId: number) {
  const { user } = useUser();

  const { data: myProductChatRooms } = useQuery<IChatRoomResponse[], AxiosError, IChatRoom[]>(
    ['chatRooms', 'myProduct', productId],
    () => getMyProductChatRoom(productId),
    {
      select: (originalChatRooms) =>
        originalChatRooms.map((originalChatRoom) => selectPeer(user.id, originalChatRoom)),
    },
  );
  return { myProductChatRooms };
}

function selectPeer(userId: number, originalChatRoom: IChatRoomResponse) {
  const { buyer, seller, ...restData } = originalChatRoom;
  const peer = buyer.id === userId ? seller : buyer;
  return { ...restData, peer };
}

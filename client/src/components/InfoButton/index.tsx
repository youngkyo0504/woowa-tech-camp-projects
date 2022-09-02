import Button from '@components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@queries/useUser';
import { IProductChatRoom } from '@customTypes/product';
import { createNewChatRoom } from '@apis/chatRoom';

interface InfoButtonProps {
  numberOfBuyer?: number;
  chattingRooms?: IProductChatRoom[];
  productId: number;
}

export default function InfoButton({ chattingRooms, numberOfBuyer, productId }: InfoButtonProps) {
  const navigate = useNavigate();
  const { user } = useUser();
  const enterChatRoom = async () => {
    const existedRoom = chattingRooms?.find((chattingRoom) => chattingRoom.buyer.id === user.id);
    if (existedRoom) {
      navigate(`/chatting-room/${existedRoom.id}`);
    } else {
      const newChattingId = await createNewChatRoom(productId);
      navigate(`/chatting-room/${newChattingId}`);
    }
  };

  return (
    <Button onClick={enterChatRoom} size="medium">
      문의하기 {numberOfBuyer ? `(${numberOfBuyer})` : ''}
    </Button>
  );
}

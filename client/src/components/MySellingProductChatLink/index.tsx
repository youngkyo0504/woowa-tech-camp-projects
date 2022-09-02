import Button from '@components/common/Button';
import { IProductChatRoom } from '@customTypes/product';
import { useNavigate } from 'react-router-dom';

interface ChatButtonProps {
  chattingRooms: IProductChatRoom[];
  productId: number;
}

export default function ChatButton({ chattingRooms, productId }: ChatButtonProps) {
  const numberOfChattingRooms = chattingRooms.length;
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/product/chatting-room/${productId}`);
  };

  return (
    <Button onClick={onClick} size="medium">
      채팅 목록 보기 {numberOfChattingRooms ? `(${numberOfChattingRooms})` : ''}{' '}
    </Button>
  );
}

import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import { IMessage } from '@customTypes/chat';
import { IUser } from '@customTypes/user';
import useProduct from '@queries/useProduct';
import mixin from '@style/mixin';
import { calculatePassedTime } from '@utils/common';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ChattingListProps {
  productId: number;
  id: number;
  latestMessage: IMessage;
  latestMessageTime: Date;
  peer: IUser;
}

export default function ChattingList({
  productId,
  id,
  latestMessage,
  latestMessageTime,
  peer,
}: ChattingListProps) {
  const navigate = useNavigate();
  const { product } = useProduct(productId);

  return (
    <ChattingRoomContainer key={id} onClick={() => navigate(`/chatting-room/${id}`)}>
      <BorderBox>
        <FlexColumnContainer>
          <Text size="small" weight="bold">
            {peer.name}
          </Text>
          <Text size="small" color={colors.grey1}>
            {latestMessage && latestMessage.content}
          </Text>
        </FlexColumnContainer>

        <FlexRowContainer>
          <FlexColumnContainer>
            <Text color={colors.grey1} size="xSmall">
              {latestMessage && `${calculatePassedTime(latestMessageTime)}전`}
            </Text>
            {/* <Notification>
            <Text size="xSmall" color={colors.white}>
              {countOfUnreadMessage}
            </Text>
          </Notification> */}
          </FlexColumnContainer>
          <FlexColumnContainer>
            <img src={product?.thumbnails[0] || ''} alt="" />
          </FlexColumnContainer>
        </FlexRowContainer>
      </BorderBox>
    </ChattingRoomContainer>
  );
}

const BorderBox = styled.div`
  ${mixin.flexMixin({ justify: 'space-between' })};
  width: 100%;
  height: 100px;
  border-bottom: 0.4px solid #d7d7d7;
`;
const ChattingRoomContainer = styled.li`
  width: 100%;
  height: 100px;
  padding: 0 1.4rem;
  /* border: 0.4px solid #d7d7d7; */
  :hover {
    background-color: ${colors.offWhite};
  }
  position: relative;
  img {
    height: 60px;
    width: 60px;
    border: 1px solid ${colors.grey3};
    border-radius: 6px;
  }
`;

const FlexColumnContainer = styled.div`
  ${mixin.flexMixin({ direction: 'column', justify: 'center' })};
  gap: 6px;
  height: 100%;
`;

const FlexRowContainer = styled.div`
  ${mixin.flexMixin({ direction: 'row' })};
  gap: 1rem;
  height: 100%;
`;

const Notification = styled.div`
  background: ${colors.primary};
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
`;

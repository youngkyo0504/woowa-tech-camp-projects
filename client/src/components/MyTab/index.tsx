import colors from '@constants/colors';
import { componentSize } from '@constants/componentSize';
import mixin from '@style/mixin';
import { useState } from 'react';
import styled from 'styled-components';
import { useChatRooms } from '@queries/useChatRoom';
import ChattingRoom from './ChattingRoom';
import LikedProductList from './LikedProductList';
import MySalesProductLis from './MySalesProductList';

export default function MyTab() {
  const tabInfos = [
    { id: 1, name: '판매목록', component: MySalesProductLis },
    { id: 2, name: '채팅목록', component: ChattingRoom },
    { id: 3, name: '관심목록', component: LikedProductList },
  ];
  const { chatRooms } = useChatRooms();
  const [selectedTabId, setSelectedTabId] = useState(1);
  const SelectedTabComponent = tabInfos.find(({ id }) => id === selectedTabId)?.component;

  return (
    <Container>
      <TabHeader>
        {tabInfos.map(({ name, id }) => (
          <TabHeaderItem
            key={id}
            isActive={selectedTabId === id}
            onClick={() => setSelectedTabId(id)}
          >
            {name}
          </TabHeaderItem>
        ))}
      </TabHeader>
      <TabContent>
        {SelectedTabComponent && <SelectedTabComponent chattingRoomsInfo={chatRooms || []} />}
      </TabContent>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  ${mixin.flexMixin({ direction: 'column' })}
`;

const TabHeader = styled.nav<{ backgroundColor?: string; shadowColor?: string }>`
  margin-top: ${componentSize.navigationHeader.height};
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  width: 100%;
  height: 48px;
  padding: 0 1.5rem;
  background-color: ${({ backgroundColor }) => backgroundColor || colors.offWhite};
  box-shadow: inset 0px -1px 0px ${({ shadowColor }) => shadowColor || colors.grey3};
  gap: 10px;
`;

const TabHeaderItem = styled.div<{ isActive?: boolean }>`
  width: 30%;
  padding: 1rem 0;
  text-align: center;
  position: relative;
  color: ${({ isActive }) => (isActive ? colors.primary : colors.black)};
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ isActive }) => (isActive ? colors.primary : 'transparent')};
  }
`;

const TabContent = styled.div`
  overflow-y: auto;
  height: 100%;
  width: 100%;
`;

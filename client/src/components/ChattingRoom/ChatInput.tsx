import colors from '@constants/colors';
import mixin from '@style/mixin';
import { useRef, useState } from 'react';
import styled from 'styled-components';

import { useUser } from '@queries/useUser';
import { SendChatDto } from '@customTypes/chat';

interface ChatInputProps {
  sendMessage: (message: Omit<SendChatDto, 'chatRoomId'>) => void;
}

export default function ChatInput({ sendMessage }: ChatInputProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const { user } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      style={{ width: '100%' }}
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage({ content: inputValue, senderId: user.id });
        setInputValue('');
      }}
    >
      <InputContainer>
        <CustomInput
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          placeholder="메세지를 입력해주세요"
        />
        <SubmitBtn>보내기</SubmitBtn>
      </InputContainer>
    </form>
  );
}

const CustomInput = styled.input`
  background: ${colors.white};
  border: 1px solid ${colors.grey3};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 12px;
  width: 100%;
  height: 44px;
`;

const SubmitBtn = styled.button`
  width: 50px;
`;

const InputContainer = styled.div`
  background: ${colors.offWhite};
  box-shadow: inset 0px 1px 0px ${colors.grey3};
  ${mixin.flexMixin({ direction: 'row', align: 'center' })};
  padding: 0 12px;
  height: 72px;
  gap: 12px;
  width: 100%;
`;

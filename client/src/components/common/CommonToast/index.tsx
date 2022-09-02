import colors from '@constants/colors';
import styled, { css } from 'styled-components';
import { ToastType, useToastState } from './ToastContext';

export default function Toast() {
  const { isOpened, message } = useToastState();
  return (
    <Container isOpened={isOpened} toastType={message?.toastType}>
      {message?.content || '테스트 에러 메세지'}
    </Container>
  );
}

const Container = styled.div<{ isOpened: boolean; toastType?: ToastType }>`
  position: absolute;
  z-index: 999;
  left: 50%;
  width: 240px;
  bottom: 0;
  transform: translateX(-50%);
  text-align: center;
  max-width: 75%;
  border-radius: 8px;
  background-color: ${({ toastType }) => (toastType === 'SUCCESS' ? colors.primary : colors.red)};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  opacity: 0;
  ${({ isOpened }) =>
    isOpened &&
    css`
      animation: up 2s ease-in-out;
    `};

  @keyframes up {
    0% {
      opacity: 0;
      transform: translate(-50%, 15px);
    }

    33% {
      opacity: 1;
      transform: translate(-50%, -15px);
    }

    66% {
      opacity: 1;
      transform: translate(-50%, -15px);
    }

    100% {
      opacity: 0;
      transform: translate(-50%, 15px);
    }
  }
`;

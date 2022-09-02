import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import AnimatedComponent from '../../lib/animation/animationComponent';

interface ModalProps {
  toggleModal?: () => void;
  children?: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ toggleModal, children }) => {
  const modalRoot = document.querySelector('#modal-root');

  if (!modalRoot) {
    throw new Error('there is no Portal Root');
  }

  return ReactDOM.createPortal(
    <>
      <ModalWrapper
        onEnter={[{}, { backgroundColor: 'rgba(0,0,0,0.3)' }]}
        keyframeOption={{ duration: 300, fill: 'forwards' }}
        onClick={toggleModal}
      ></ModalWrapper>
      <ModalContainer>{children}</ModalContainer>
    </>,
    modalRoot
  );
};

export default Modal;

const animatedDiv = AnimatedComponent('div');

const ModalWrapper = styled(animatedDiv)`
  width: var(--screen-width);
  height: var(--screen-height);

  backdrop-filter: blur(1px);
  border-radius: calc(var(--screen-width) / (20));
  position: relative;
  color: white;
  z-index: 300;
`;

const ModalContainer = styled.div`
  width: var(--screen-width);
  height: var(--screen-height);
  background-color: transparent;
  border-radius: calc(var(--screen-width) / (20));
  position: absolute;
`;

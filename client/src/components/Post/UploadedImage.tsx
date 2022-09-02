import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import React from 'react';
import styled from 'styled-components';
import CircleXButton from './CircleXButton';

interface UploadedImageProps {
  imgUrl: string;
  onClick: () => void;
}

export default function UploadedImage({ onClick, imgUrl }: UploadedImageProps) {
  return (
    <Container>
      <img src={imgUrl} alt="product" />
      <CircleXButton onClick={onClick} />
    </Container>
  );
}

const Container = styled.div`
  --size: 6rem;
  flex: 0 0 6rem;
  position: relative;
  background-color: ${colors.offWhite};
  width: var(--size);
  height: var(--size);
  border-radius: 8px;
  border: 1px solid ${colors.grey3};

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    animation: appear 0.5s ease-in-out 0s 1 normal forwards;
  }

  button {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

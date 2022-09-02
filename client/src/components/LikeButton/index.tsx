import HeartIcon from '@assets/icons/HeartIcon';
import colors from '@constants/colors';
import React from 'react';
import styled, { css } from 'styled-components';
import { useUser } from '@queries/useUser';
import useProduct from '@queries/useProduct';
import useLikeButton from './useLikeButton';

interface LikeButtonProps {
  productId: number;
}
export default function LikeButton({ productId }: LikeButtonProps) {
  const { user } = useUser();
  const { product } = useProduct(productId);

  const likedUsers = product?.likedUsers || [];
  const isUserPick = likedUsers.some((likedUser) => likedUser.userId === user.id);
  const mutateLikeButton = useLikeButton({ productId });

  const handleLikeButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    mutateLikeButton();
  };

  return (
    <LikeButtonWrapper isUserPick={isUserPick} onClick={handleLikeButtonClick}>
      <HeartIcon />
    </LikeButtonWrapper>
  );
}

const LikeButtonWrapper = styled.button<{ isUserPick: boolean }>`
  svg {
    scale: 1;
    stroke-width: 2;
    stroke: ${colors.grey1};
    transition: 0.4s ease-in-out;
    ${({ isUserPick }) =>
      isUserPick &&
      css`
        fill: ${colors.primary};
        stroke: transparent;
      `}
  }
`;

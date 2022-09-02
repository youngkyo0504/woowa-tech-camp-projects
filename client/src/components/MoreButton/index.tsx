import MoreIcon from '@assets/icons/MoreIcon';
import DropDown from '@components/common/DropDown';
import colors from '@constants/colors';
import { useDeleteProduct } from '@queries/useProduct';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface MoreButtonProps {
  color?: string;
  productId: number;
  goBackAfterDelete?: boolean;
}

export default function MoreButton({ color, productId, goBackAfterDelete }: MoreButtonProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { deleteProduct } = useDeleteProduct();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleClickEditButton = () => {
    navigate(`/product/edit/${productId}`);
  };

  const handleDeletButtonClick = () => {
    deleteProduct(Number(productId));
    if (goBackAfterDelete) {
      queryClient.removeQueries(['product', String(productId)]);
      navigate(-1);
    }
  };

  const moreUtils = [
    {
      name: '수정하기',
      onClick: handleClickEditButton,
    },
    {
      name: '삭제하기',
      onClick: handleDeletButtonClick,
      color: colors.red,
    },
  ];
  return (
    <Container
      color={color}
      onClick={(e) => {
        e.stopPropagation();
        setIsDropDownOpen((prev) => !prev);
      }}
    >
      <MoreIcon />
      {isDropDownOpen && <DropDown dropDownItems={moreUtils} top="2rem" right="0" />}
    </Container>
  );
}

const Container = styled.button<{ color?: string }>`
  svg {
    width: 1.5rem;
    height: 1.5rem;
    stroke: ${({ color }) => color};
  }
`;

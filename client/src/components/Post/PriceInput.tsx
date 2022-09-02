import { ValidationMessage } from '@components/common/ValidationMessage';
import { useForm } from '@components/CustomForm/useForm';
import colors from '@constants/colors';
import { fontSize } from '@constants/fonts';
import { formatPrice, getNumber } from '@utils/format';
import React from 'react';
import styled from 'styled-components';

const MAX_PRICE_LENGTH = 8;

interface PriceInputProps {
  price?: number;
}

export default function PriceInput({ price: initialPrice }: PriceInputProps) {
  const validator = {
    max: {
      validate: (value: string) => value.length < MAX_PRICE_LENGTH,
      errorMessage: '천만원 이상의 물품은 황금마켓 프로를 이용하세요',
    },
  };

  const initialValue = initialPrice ? formatPrice(String(initialPrice)) : '';
  const { validate, inputValue, setInputValue, errorMessage } = useForm(
    'price',
    initialValue,
    validator,
    {
      isInitialValid: true,
    },
  );

  const changeInputValue = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    const { value } = currentTarget;
    const price = getNumber(value);

    if (validate({ value: price, canChangeValidState: false })) {
      const formattedPrice = formatPrice(price);
      setInputValue(formattedPrice);
    }
  };

  return (
    <>
      <Container>
        <CustomInput
          type="text"
          id="price"
          name="price"
          placeholder="₩ 가격 (선택 사항)"
          value={inputValue || ''}
          onChange={changeInputValue}
        />
        <ValidationMessage as="p">{errorMessage}</ValidationMessage>
      </Container>
      <div />
    </>
  );
}

const Container = styled.div`
  padding: 24px 0 0 0;
  border-bottom: 1px solid ${colors.grey3};
`;

const CustomInput = styled.input`
  width: 100%;
  color: ${colors.black};

  background-color: ${colors.white};
  border: 0;
  font-size: ${fontSize.large};
  ::placeholder {
    color: ${colors.grey1};
  }
  :focus {
    border: 0;
  }
`;

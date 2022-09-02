import colors from '@constants/colors';
import { fontSize } from '@constants/fonts';
import styled from 'styled-components';
import React from 'react';
import { ValidationMessage } from '@components/common/ValidationMessage';
import { useForm } from '@components/CustomForm/useForm';

interface TitleInputProps {
  name?: string;
}

export default function TitleInput({ name }: TitleInputProps) {
  const validator = {
    min: {
      validate: (value: string) => value.length > 0,
      errorMessage: '값이 비어있습니다.',
    },
  };

  const initialValue = name || '';
  const { setInputValue, inputValue, validate, errorMessage } = useForm(
    'name',
    initialValue,
    validator,
    { isInitialValid: !!name },
  );

  const inputHandler = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    const { value } = currentTarget;
    validate({ value, validateProperties: ['min'] });
    setInputValue(value);
  };

  return (
    <Container>
      <CustomInput placeholder="글 제목" value={inputValue} onInput={inputHandler} />
      <ValidationMessage as="p">{errorMessage}</ValidationMessage>
    </Container>
  );
}

const Container = styled.div`
  padding: 24px 0 0 0;
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

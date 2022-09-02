import { useForm } from '@components/CustomForm/useForm';
import colors from '@constants/colors';
import { fontSize } from '@constants/fonts';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface DescriptionTextAreaProps {
  description?: string;
}

export default function DescriptionTextArea({ description }: DescriptionTextAreaProps) {
  const validator = {
    min: {
      validate: (value: string) => value.length > 0,
      errorMessage: '게시글 내용을 작성해야합니다.',
    },
  };
  const initialValue = description || '';

  const { validate, setInputValue, inputValue } = useForm('description', initialValue, validator, {
    isInitialValid: !!description,
  });
  const onChange = ({ currentTarget }: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = currentTarget;
    validate({ value });
    setInputValue(value);
  };

  return (
    <Container>
      <CustomTextArea
        value={inputValue}
        onChange={onChange}
        placeholder="게시글 내용을 작성해주세요"
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 24px 0 18px 0;
`;

const CustomTextArea = styled.textarea`
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  height: 350px;
  color: ${colors.black};
  line-height: 22px;
  resize: none;

  background-color: ${colors.white};
  border: 0;
  font-size: ${fontSize.medium};
  ::placeholder {
    color: ${colors.grey1};
  }
  :focus {
    border: 0;
    outline: 0;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  &[contenteditable='true'] {
    position: relative;
  }

  &[contenteditable='true']:empty:before {
    content: attr(placeholder);
    position: absolute;
    left: 0;
    right: 0;
    top: 4px;
    margin: auto;
    color: ${colors.grey2};
  }
`;

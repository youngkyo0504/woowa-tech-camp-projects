import colors from '@constants/colors';
import { fontSize } from '@constants/fonts';
import styled from 'styled-components';

const inputSizeMap = {
  medium: {
    padding: '0.6rem ',
    height: '2.3rem',
  },
  large: {
    padding: '0.8rem 1.2rem 0.6rem',
    height: '2.5rem',
  },
};

type InputSizeType = 'medium' | 'large';

const Input = styled.input<{ sizeType?: InputSizeType }>`
  width: 100%;
  height: ${({ sizeType }) =>
    sizeType ? inputSizeMap[sizeType].height : inputSizeMap.medium.height};
  padding: ${({ sizeType }) =>
    sizeType ? inputSizeMap[sizeType].padding : inputSizeMap.medium.padding};
  background-color: ${colors.white};
  border-radius: 0.5rem;
  border: 1px solid ${colors.grey3};
  font-size: ${fontSize.xsmall};
  ::placeholder {
    color: ${colors.grey1};
  }
  :focus {
    border: 1px solid ${colors.primary};
  }
`;

export default Input;

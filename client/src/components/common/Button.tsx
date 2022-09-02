import colors from '@constants/colors';
import { fontWeight } from '@constants/fonts';
import styled from 'styled-components';

const buttonSizeMap = {
  medium: {
    width: '8.5rem',
    height: '2.25rem',
  },
  large: {
    width: '100%',
    height: '2.625rem',
  },
};

type ButtonSizeType = 'medium' | 'large';

const Button = styled.button<{ size: ButtonSizeType }>`
  width: ${({ size }) => buttonSizeMap[size].width};
  height: ${({ size }) => buttonSizeMap[size].height};
  font-weight: ${fontWeight.link};
  color: ${colors.offWhite};
  background-color: ${colors.primary};
  border-radius: 0.5rem;

  :hover {
    background-color: ${colors.tertiary};
  }

  :disabled {
    background-color: ${colors.secondary};
  }

  :focus {
    border: 1px solid ${colors.tertiary};
  }
`;

export default Button;

import colors from '@constants/colors';
import styled from 'styled-components';
import { Text } from './Text';

export const ValidationMessage = styled(Text)<{ isValid?: boolean }>`
  color: ${({ isValid }) => (isValid ? colors.primary : colors.red)};
  font-size: 0.7rem;
  height: 0.5rem;
  margin: 0.4rem 0;
`;

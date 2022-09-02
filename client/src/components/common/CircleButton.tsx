import AddIcon from '@assets/icons/AddIcon';
import colors from '@constants/colors';
import styled from 'styled-components';

export default function CircleButton() {
  return (
    <CircleButtonWrapper>
      <AddIcon />
    </CircleButtonWrapper>
  );
}

const CircleButtonWrapper = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${colors.primary};
  border-radius: 50%;

  :hover {
    background-color: ${colors.tertiary};
  }

  :disabled {
    background-color: ${colors.secondary};
  }

  :focus {
    border: 1px solid ${colors.tertiary};
  }

  svg {
    stroke: ${colors.white};
  }
`;

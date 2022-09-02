import XIcon from '@assets/icons/XIcon';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled from 'styled-components';

interface CircleXButtonProps {
  onClick: () => void;
}

export default function CircleXButton({ onClick }: CircleXButtonProps) {
  return (
    <CircleButtonWrapper onClick={onClick} type="button">
      <XIcon />
    </CircleButtonWrapper>
  );
}

const CircleButtonWrapper = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${colors.black};
  border-radius: 50%;
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}

  :hover {
    background-color: ${colors.grey1};
  }

  :disabled {
    background-color: ${colors.secondary};
  }

  :focus {
    border: 1px solid ${colors.tertiary};
  }

  svg {
    stroke: ${colors.white};
    width: 1rem;
    height: 1rem;
  }
`;

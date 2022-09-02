import CheckIcon from '@assets/icons/CheckIcon';
import { useFormValidationState } from '@components/CustomForm/FormProvider';
import colors from '@constants/colors';
import styled from 'styled-components';

export function SubmitButton() {
  const { isAllValidated } = useFormValidationState();

  return (
    <SvgWrapper isActive={isAllValidated}>
      <CheckIcon />
    </SvgWrapper>
  );
}

const SvgWrapper = styled.button<{ isActive: boolean }>`
  svg {
    stroke: ${({ isActive }) => (isActive ? colors.primary : colors.black)};
  }
`;

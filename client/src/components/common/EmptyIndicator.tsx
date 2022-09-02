import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled from 'styled-components';
import { Text } from './Text';

interface EmptyIndicatorProps {
  message: string;
}

export default function EmptyIndicator({ message }: EmptyIndicatorProps) {
  return (
    <Container>
      <img src="/images/empty.png" alt="텅 비어있음" />
      <Message size="small">{message}</Message>
    </Container>
  );
}

const Container = styled.div`
  ${mixin.flexMixin({ direction: 'column', align: 'center' })}
  width: 50%;
  padding-top: 6rem;
  margin: 0 auto;

  & img {
    display: block;
    width: 75%;
  }
`;

const Message = styled(Text)`
  text-align: center;
  margin-top: 1rem;
  width: 100%;
  color: ${colors.grey1};
`;

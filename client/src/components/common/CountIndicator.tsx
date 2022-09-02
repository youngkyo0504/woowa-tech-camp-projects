import ChatIcon from '@assets/icons/ChatIcon';
import HeartIcon from '@assets/icons/HeartIcon';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled from 'styled-components';
import { Text } from './Text';

type CountType = 'chat' | 'like';

interface CountIndicatorProps {
  type: CountType;
  count: number;
}

const iconMap = {
  chat: ChatIcon,
  like: HeartIcon,
};

export default function CountIndicator({ type, count }: CountIndicatorProps) {
  const Icon = iconMap[type];

  return (
    <CountIndicatorWrapper>
      <Icon />
      <Text color={colors.grey1} size="small">
        {count}
      </Text>
    </CountIndicatorWrapper>
  );
}

const CountIndicatorWrapper = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })}
  width: 2rem;

  svg {
    scale: 0.8;
    stroke: ${colors.grey1};
  }
`;

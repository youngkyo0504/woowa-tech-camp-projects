import colors from '@constants/colors';
import { Text, TextSizeType } from './Text';

interface CaptionProps {
  captions: (string | undefined)[];
  size?: TextSizeType;
}

export default function Caption({ captions, size }: CaptionProps) {
  const captionString = captions.join(' · ');
  return (
    <Text color={colors.grey1} size={size}>
      {captionString}
    </Text>
  );
}

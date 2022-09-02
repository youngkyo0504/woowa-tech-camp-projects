import NavigationBar from '@components/common/NavigationBar';
import MoreButton from '@components/MoreButton';
import colors from '@constants/colors';
import { useUser } from '@queries/useUser';

interface DetailPageNavigationBarProps {
  sellerId: number;
  productId: number;
}

export default function DetailPageNavigationBar({
  sellerId,
  productId,
}: DetailPageNavigationBarProps) {
  const { user } = useUser();
  const isMyProduct = user.id === sellerId;
  return (
    <NavigationBar
      backgroundColor="transparent"
      shadowColor="transparent"
      actionItem={
        isMyProduct && <MoreButton color={colors.black} productId={productId} goBackAfterDelete />
      }
    />
  );
}

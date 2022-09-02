import MapPinIcon from '@assets/icons/MapPinIcon';
import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import { padding } from '@constants/padding';
import { useUser } from '@queries/useUser';
import mixin from '@style/mixin';
import { getLastAddress } from '@utils/product';
import styled from 'styled-components';

export default function RegionFooter() {
  const { user } = useUser();
  const primaryRegion = user.regions.find((region) => region.isPrimary) || user.regions[0];

  return (
    <>
      <Container>
        <MapPinIcon />
        <Text size="small"> {getLastAddress(primaryRegion.address)}</Text>
      </Container>
      <div />
    </>
  );
}

const Container = styled.div`
  position: absolute;
  color: ${colors.black};
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px ${padding.pageSide};
  border-top: 1px solid ${colors.grey3};
  ${mixin.flexMixin({ align: 'center' })}
  gap: 4px;

  svg {
    stroke: ${colors.black};
    width: 1rem;
    height: 1rem;
  }
`;

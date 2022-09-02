import MapPinIcon from '@assets/icons/MapPinIcon';
import DropDown from '@components/common/DropDown';
import LoadingIndicator from '@components/common/LoadingIndicator';
import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import useUserRegion from '@hooks/useUserRegion';
import { useUser } from '@queries/useUser';
import mixin from '@style/mixin';
import { getLastAddress } from '@utils/product';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function MainNavTitle() {
  const { user } = useUser();
  const { updateRegionPrimary, regions } = useUserRegion();

  const primaryRegion = user.regions.find((region) => region.isPrimary) || user.regions[0];
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownItems = [
    ...regions.map((region) => ({
      onClick: updateRegionPrimary(region),
      name: getLastAddress(region.address) || '',
    })),
    {
      name: '내 동네 설정하기',
      onClick: () => navigate('/user/region'),
    },
  ];

  return user ? (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        setIsDropDownOpen((prev) => !prev);
      }}
    >
      {primaryRegion.address && (
        <>
          <MapPinIcon />
          <Text color={colors.white}>{getLastAddress(primaryRegion.address)}</Text>
        </>
      )}
      {isDropDownOpen && (
        <DropDown dropDownItems={dropdownItems} top="85%" transform="translate(-25%,0)" />
      )}
    </Container>
  ) : (
    <LoadingIndicator />
  );
}

const Container = styled.button`
  ${mixin.flexMixin({ align: 'center' })}
  gap: 0.25rem;

  svg {
    scale: 0.9;
    stroke: ${colors.white};
  }
`;

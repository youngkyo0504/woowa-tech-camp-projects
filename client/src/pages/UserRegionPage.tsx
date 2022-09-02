import RegionModal from '@components/RegionModal.tsx';
import useRegionModal from '@hooks/useRegionModal';
import styled from 'styled-components';
import { useEffect } from 'react';
import NavigationBar from '@components/common/NavigationBar';
import PageContainer from '@components/common/PageContainer';
import { Text } from '@components/common/Text';
import Button from '@components/common/Button';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import { requestCreateUserRegion } from '@apis/user';
import { getLastAddress } from '@utils/product';
import XIcon from '@assets/icons/XIcon';
import PlusIcon from '@assets/icons/PlusIcon';
import useUserRegion from '@hooks/useUserRegion';
import { useUser } from '@queries/useUser';
import TransitionPage from '@components/TransitionPage';

export default function UserRegionPage() {
  const { isModalOpen, toggleModalOpen, selectedRegion, setSelectedRegion } = useRegionModal();
  const { refetchUser } = useUser();
  const { regions, deleteRegion, updateRegionPrimary } = useUserRegion();

  useEffect(() => {
    if (selectedRegion) {
      requestCreateUserRegion(selectedRegion).then((data) => {
        refetchUser();
        setSelectedRegion(null);
      });
    }
  }, [selectedRegion]);

  const RegionModalOpenButton = (
    <ModalOpenButton onClick={toggleModalOpen}>
      <IconWrapper>
        <PlusIcon />
      </IconWrapper>
    </ModalOpenButton>
  );

  return (
    <TransitionPage depth={1}>
      <NavigationBar title="내 동네 설정하기" />
      <SignUpPageWrapper>
        <Caption color={colors.grey3} as="p">
          지역은 최소 1개 이상 최대 2개까지 설정 가능해요
        </Caption>
        <RegionsContainer>
          {regions.map((region) => (
            <Region
              key={region.id}
              isPrimary={region.isPrimary}
              onClick={updateRegionPrimary(region)}
            >
              {getLastAddress(region.address)}
              <IconWrapper onClick={deleteRegion(region)}>
                <XIcon />
              </IconWrapper>
            </Region>
          ))}
          {regions.length < 2 && RegionModalOpenButton}
        </RegionsContainer>
      </SignUpPageWrapper>
      <RegionModal
        isModalOpen={isModalOpen}
        toggleModalOpen={toggleModalOpen}
        setSelectedRegion={setSelectedRegion}
      />
    </TransitionPage>
  );
}

const Caption = styled.div`
  color: #828282;
  word-break: keep-all;
  width: 180px;
  text-align: center;
  line-height: 20px;
  margin: 32px auto;
`;

const IconWrapper = styled.button`
  ${mixin.flexMixin({ justify: 'center', align: 'center' })};
`;

const SignUpPageWrapper = styled(PageContainer)`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;

  ${Button} {
    margin-top: 0.5rem;
  }
`;

const RegionsContainer = styled.div`
  ${mixin.flexMixin({ justify: 'center' })};
  gap: 24px;
`;

const ValidateMessage = styled(Text)<{ isValidate: boolean }>`
  color: ${({ isValidate }) => (isValidate ? colors.primary : colors.red)};
  font-size: 0.7rem;
  height: 0.5rem;
  margin-top: 0.4rem;
`;

const Region = styled.div<{ isPrimary?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  gap: 2px;
  color: ${({ isPrimary }) => (isPrimary ? colors.white : colors.primary3)};
  border: 1px solid ${({ isPrimary }) => (isPrimary ? colors.white : colors.primary2)};

  width: 130px;
  height: 36px;

  /* Primary1 */

  background: ${({ isPrimary }) => (isPrimary ? colors.primary : colors.white)};
  border-radius: 8px;

  svg {
    stroke: #a0e1e0;
    width: 18px;
    height: 18px;
    stroke-width: 2px;
  }
`;

const ModalOpenButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  gap: 2px;
  color: ${colors.white};
  width: 130px;
  height: 36px;

  /* White */
  background: ${colors.white};
  /* Primary1 */
  border: 1px solid ${colors.primary};
  border-radius: 8px;
`;

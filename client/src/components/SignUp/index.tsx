import RegionModal from '@components/RegionModal.tsx';
import useRegionModal from '@hooks/useRegionModal';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IOAuthUserInfo } from '@customTypes/auth';
import React, { useState } from 'react';
import Input from '@components/common/Input';
import NavigationBar from '@components/common/NavigationBar';
import PageContainer from '@components/common/PageContainer';
import { Text } from '@components/common/Text';
import Button from '@components/common/Button';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import { fontSize } from '@constants/fonts';
import { redirectToOAuthUrl } from '@utils/oAuth';
import { requestSignUp, checkDuplicatedUser } from '@apis/user';

export default function SignUpPage() {
  const { isModalOpen, toggleModalOpen, selectedRegion, setSelectedRegion } = useRegionModal();
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();
  const { state } = useLocation();
  const oAuthInfo = state as IOAuthUserInfo;

  const [isDuplicated, setIsDuplicated] = useState<boolean | null>(null);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState<string | null>(null);
  const validateSet = [
    {
      errorMessage: '닉네임을 입력해주세요',
      validate: isDuplicated === false,
    },
    {
      errorMessage: '우리 동네를 선택해주세요',
      validate: Boolean(selectedRegion?.id),
    },
  ];

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateResult = validateSet.filter(({ validate }) => !validate);
    if (validateResult.length !== 0) {
      setSignUpErrorMessage(validateResult[0].errorMessage);
      return;
    }
    if (!selectedRegion) return;
    try {
      await requestSignUp({ name: userName, regionId: selectedRegion.id, oAuthInfo });
      redirectToOAuthUrl(oAuthInfo.oAuthOrigin);
    } catch (error) {
      navigate('/error');
    }
  };

  const validateDuplicatedUser = async (nickname: string) => {
    const result = await checkDuplicatedUser(nickname);
    setIsDuplicated(result.isDuplicated);
  };

  const duplicatedMessage = isDuplicated ? '닉네임이 중복됐어요' : '사용가능한 닉네임이에요';

  return (
    <>
      <NavigationBar title="회원가입" />
      <SignUpPageWrapper>
        <form onSubmit={signUp}>
          <InputWrapper>
            <label htmlFor="nickname">
              <Text as="p" weight="bold" size="small">
                닉네임
              </Text>
              <Flex>
                <Input
                  type="text"
                  id="nickname"
                  placeholder="황금마켓에서 사용할 이름을 입력해주세요"
                  value={userName}
                  name="nickname"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <DuplicatedButton
                  type="button"
                  onClick={() => {
                    validateDuplicatedUser(userName);
                  }}
                  size="medium"
                >
                  {' '}
                  중복확인
                </DuplicatedButton>
              </Flex>
              <ValidateMessage as="p" isValidate={!isDuplicated} size="xSmall">
                {isDuplicated !== null && duplicatedMessage}
              </ValidateMessage>
            </label>
          </InputWrapper>
          <InputWrapper onClick={toggleModalOpen}>
            <Text weight="bold" size="small">
              우리 동네 선택
            </Text>
            <RegionInput isValue={Boolean(selectedRegion?.address)} as="div">
              {selectedRegion?.address || '동네를 선택해주세요'}
            </RegionInput>
          </InputWrapper>
          <Button size="large" type="submit">
            회원가입
          </Button>
          <ValidateMessage as="p" isValidate={false} size="xSmall">
            {signUpErrorMessage !== null && signUpErrorMessage}
          </ValidateMessage>
        </form>
      </SignUpPageWrapper>
      <RegionModal
        isModalOpen={isModalOpen}
        toggleModalOpen={toggleModalOpen}
        setSelectedRegion={setSelectedRegion}
      />
    </>
  );
}

const SignUpPageWrapper = styled(PageContainer)`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;

  ${Button} {
    margin-top: 0.5rem;
  }
`;

const InputWrapper = styled.div`
  margin-bottom: 1rem;
  ${Input} {
    margin-top: 0.5rem;
  }
`;

const RegionInput = styled(Input)<{ isValue: boolean }>`
  color: ${({ isValue }) => (isValue ? colors.black : colors.grey1)};
  ${mixin.flexMixin({ align: 'center' })}
`;

const Flex = styled.div`
  ${mixin.flexMixin({ justify: 'space-between' })}
  gap: 4px;
`;

const DuplicatedButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${colors.grey2};
  color: ${colors.grey1};
  font-size: ${fontSize.xsmall};
  :hover {
    background-color: transparent;
  }
`;

const ValidateMessage = styled(Text)<{ isValidate: boolean }>`
  color: ${({ isValidate }) => (isValidate ? colors.primary : colors.red)};
  font-size: 0.7rem;
  height: 0.5rem;
  margin-top: 0.4rem;
`;

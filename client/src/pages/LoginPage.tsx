import styled from 'styled-components';
import { redirectToOAuthUrl } from '@utils/oAuth';
import Button from '@components/common/Button';
import mixin from '@style/mixin';
import TransitionPage from '@components/TransitionPage';
import GithubIcon from '@assets/icons/Github';
import { Text } from '@components/common/Text';
import useLogin from '@hooks/useLogin';

export default function LoginPage() {
  const { testerLogin } = useLogin();

  return (
    <TransitionPage
      depth={2}
      mountAnimation={[
        { transform: 'translateY(-5%)', opacity: '1' },
        { transform: 'translateY(0)', opacity: '1' },
      ]}
      keyframeOption={{ easing: 'cubic-bezier(0.33, 1, 0.68, 1)', duration: 1000 }}
    >
      <LoginPageWrapper>
        <Logo src="/images/goldmarket-logo.png" />
        <WelcomeMessage>간편하게 황금마켓을 시작하세요</WelcomeMessage>
        <StartButtonWrapper>
          <LogoButton
            color="#21262d"
            type="button"
            size="large"
            onClick={() => redirectToOAuthUrl('GITHUB')}
          >
            <GithubIcon />
            <Text style={{}} size="small" color="white">
              Github로 시작
            </Text>
          </LogoButton>
          <Button type="button" size="large" onClick={testerLogin}>
            테스트 유저로 시작
          </Button>
        </StartButtonWrapper>
      </LoginPageWrapper>
    </TransitionPage>
  );
}

const LoginPageWrapper = styled.div`
  ${mixin.flexMixin({ direction: 'column', justify: 'center', align: 'center' })}
  height: 100%;
  padding: 1rem;
`;

const Logo = styled.img`
  width: 10rem;
  height: 8rem;
`;

const WelcomeMessage = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 3rem 0;
`;

const StartButtonWrapper = styled.div`
  width: 100%;
  ${mixin.flexMixin({ direction: 'column', align: 'center' })}
  gap: 1rem;
`;

const LogoButton = styled(Button)`
  background-color: #21262d;
  ${mixin.flexMixin({ align: 'center', justify: 'center' })};
  gap: 8px;
  &:hover {
    background-color: #0d1117;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;

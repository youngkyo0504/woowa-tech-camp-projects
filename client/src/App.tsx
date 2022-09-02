import GlobalStyle from '@style/GlobalStyle';
import Routes from '@pages/Routes';
import styled from 'styled-components';
import portalUtil from '@utils/portal';
import { useRef, useEffect } from 'react';
import mixin from '@style/mixin';
import colors from '@constants/colors';
import Toast from '@components/common/CommonToast';

export default function App() {
  const displayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!displayRef.current) return;
    portalUtil.setPortalRoot(displayRef.current);
  }, []);

  return (
    <Display ref={displayRef}>
      <GlobalStyle />
      <Routes />
      <Toast />
    </Display>
  );
}

const Display = styled.div`
  position: relative;
  max-width: 26rem;
  height: 100%;
  margin: 0 auto;
  background-color: ${colors.white};
  overflow-x: hidden;
  overflow-y: hidden;
`;

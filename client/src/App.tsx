import React, { useLayoutEffect } from 'react';
import { ClientRouter } from './lib/router';
import { FlexCenter, Mockup } from './styles/globalStyleComponent';
import GlobalStyle from './styles/GlobalStyles';
import { initAxios } from './api';
import PageRouter from './pages/PageRoutes';

function App() {
  useLayoutEffect(() => {
    initAxios();
  }, []);

  return (
    <>
      <GlobalStyle />
      <FlexCenter>
        <Mockup>
          <ClientRouter>
            <PageRouter />
          </ClientRouter>
        </Mockup>
      </FlexCenter>
    </>
  );
}

export default App;

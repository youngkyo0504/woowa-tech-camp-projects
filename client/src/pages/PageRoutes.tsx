import React from 'react';
import { getMenu } from '../api';
import useQuery from '../hooks/usequery';
import { AnimatePresence } from '../lib/animation/AnimatedPresence';
import { Route, Routes, useRouter } from '../lib/router';
import EntrancePage from './EntrancePage';
import MenuPage from './MenuPage';

function PageRouter() {
  const { data } = useQuery(getMenu);
  const { path } = useRouter();

  return (
    <AnimatePresence animateBeforeExit>
      <Routes path={path} key={path}>
        <Route path="/">
          <EntrancePage />
        </Route>
        <Route path="/menu">{data && <MenuPage menuItems={data} />}</Route>
      </Routes>
    </AnimatePresence>
  );
}

export default PageRouter;

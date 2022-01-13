import React from 'react';
import { useMediaQuery } from 'react-responsive';

import { useRecoilValue } from 'recoil';

import { isCalculatedState } from '../store';

import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Container from '../components/Container/Container.jsx';
import AdBar from '../components/AdBar/AdBar.jsx';

import { Wrapper } from '../components/Main/Main';

export default function Home() {
  const isCalculated = useRecoilValue(isCalculatedState);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)'
  });

  return (
    <Wrapper isCalculated={isCalculated}>
      {isDesktopOrLaptop && <Sidebar />}
      <Container />
      {isDesktopOrLaptop && <AdBar />}
    </Wrapper>
  );
}

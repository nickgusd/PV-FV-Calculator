import React from 'react';

import { useRecoilValue } from 'recoil';

import { isCalculatedState } from '../store';

import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Container from '../components/Container/Container.jsx';
// import AdBar from '../components/AdBar/AdBar';

import { Wrapper } from '../components/Main/Main';

export default function Home() {
  const isCalculated = useRecoilValue(isCalculatedState);
  return (
    <Wrapper isCalculated={isCalculated}>
      <Sidebar />
      <Container />
      {/* <AdBar /> */}
    </Wrapper>
  );
}

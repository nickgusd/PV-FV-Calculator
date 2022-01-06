import React, { useState, useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import { isCalculatedState } from '../store';

import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Container from '../components/Container/Container.jsx';
import AdBar from '../components/AdBar/AdBar.jsx';

import { Wrapper } from '../components/Main/Main';

export default function Home() {
  const isCalculated = useRecoilValue(isCalculatedState);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth < 1450);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 1450);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  return (
    <Wrapper isCalculated={isCalculated}>
      {isDesktop && <Sidebar />}
      <Container />
      {isDesktop && <AdBar />}
    </Wrapper>
  );
}

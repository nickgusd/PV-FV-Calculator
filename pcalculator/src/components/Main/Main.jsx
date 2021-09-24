import React from "react";
import { useRecoilValue } from 'recoil';
import Container from "../Container/Container.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import {
  Wrapper,
} from "./Main";
import {
  isCalculatedState,
} from "../../store";

export default function Main() {
  const isCalculated = useRecoilValue(isCalculatedState);

  return (
    <Wrapper isCalculated={isCalculated}>
      <Sidebar />
      <Container />
    </Wrapper>
  );
}

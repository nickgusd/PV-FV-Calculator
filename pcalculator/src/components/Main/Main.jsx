import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
      <Router>
        <Switch>
          <Route exact path="/">
            <Sidebar />
            <Container />
          </Route>
          <Route path="*">
            <h1>Hello World</h1>
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
}

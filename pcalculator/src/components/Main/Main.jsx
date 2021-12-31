import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NotFound from '../../pages/NotFound';
import Navbar from '../Navbar/Navbar.jsx';
import Home from '../../pages/Home';

export default function Main() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

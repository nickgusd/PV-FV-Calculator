import React from "react";

import {
  RecoilRoot,
} from 'recoil';

// import Navbar from "./components/Navbar/Navbar.jsx";
import Main from "./components/Main/Main.jsx";

function App() {
  return (
    <RecoilRoot>
      {/* <Navbar /> */}
      <Main />
    </RecoilRoot>
  );
}

export default App;

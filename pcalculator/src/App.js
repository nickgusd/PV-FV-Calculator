import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Navbar from "./components/Navbar/Navbar.jsx";
import Main from "./components/Main/Main.jsx";



function App() {
  const React_Version = React.version;
  
  return (
    <RecoilRoot>
      <Navbar />
      <Main/>
    </RecoilRoot>
  );
}

export default App;

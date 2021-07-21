import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
// import Container from "./components/Container/Container";
// import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main.jsx";



function App() {
  const React_Version = React.version;
  console.log(
    React_Version
  )
  return (
    <div className="App">
      <Navbar />
      <Main/>
    </div>
  );
}

export default App;

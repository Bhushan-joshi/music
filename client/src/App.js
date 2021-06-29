import Login from "./components/login";
import React from "react"
import Home from "./components/Home";

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
   code?<Home code={code}/>:<Login/>
  );
}

export default App;

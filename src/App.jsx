import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";   
import Temp from "./Temp";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Temp/>} />
      </Routes>
    </HashRouter>
  );
};

export default App;

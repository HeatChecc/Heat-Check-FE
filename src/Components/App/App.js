import React from 'react';
import Homepage from '../Homepage/Homepage';
import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Homepage />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

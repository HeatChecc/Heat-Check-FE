import React from 'react';
import Homepage from '../Homepage/Homepage';
import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ResturantsContainer from '../ResturantsContainer/ReviewsContainer'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Homepage />}/>
      <Route path="/search/:id" element={<ResturantsContainer />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

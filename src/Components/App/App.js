import React from 'react';
import Homepage from '../Homepage/Homepage';
import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ResturantsContainer from '../ResturantsContainer/ReviewsContainer'
import Resturant from '../Resturant/Resturant';
import Dish from '../Dish/Dish';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Homepage />}/>
      <Route path="/search/:lat/:long" element={<ResturantsContainer />}/>
      <Route path="/resturant/:id" element={<Resturant />}/>
      <Route path="/dish/:id" element={<Dish />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

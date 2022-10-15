import React, { useState } from 'react';
import Homepage from '../Homepage/Homepage';
import './App.css';
import { Route, BrowserRouter, Routes} from "react-router-dom";
import ResturantsContainer from '../ResturantsContainer/ReviewsContainer'
import Resturant from '../Resturant/Resturant';
import Dish from '../Dish/Dish';
import SideContainer from '../SideContainer/SideContainer';

const App = () => {
  const [search, setSearch] = useState("")
  const [resturantInApp, setResturantInApp] = useState("")
  const [dish, setDish] = useState("")

  console.log('serach var in app', search)

  return (
    <div className="App">
      <BrowserRouter>
      <SideContainer search={search} resturantInApp={resturantInApp}/>
      <Routes>
      <Route exact path="/" element={<Homepage />}/>
      <Route path="/search/:id" element={<ResturantsContainer setSearch={setSearch}/>}/>
      <Route path="/resturant/:id" element={<Resturant search={search} setResturantInApp={setResturantInApp}/>}/>
      <Route path="/dish/:id" element={<Dish />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

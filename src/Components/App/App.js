import React, { useState } from 'react';
import Homepage from '../Homepage/Homepage';
import './App.css';
import { Route, Routes, useLocation} from "react-router-dom";
import RestaurantsContainer from '../RestaurantsContainer/RestaurantsContainer'
import Restaurant from '../Restaurant/Restaurant';
import Dish from '../Dish/Dish';
import SideContainer from '../SideContainer/SideContainer';

const App = () => {
  const [search, setSearch] = useState("")
  const [restaurantInApp, setRestaurantInApp] = useState("")
  const location = useLocation()
  // const [dish, setDish] = useState("")

  return (
    <div className="App">
      {location.pathname !== "/" && <SideContainer search={search} restaurantInApp={restaurantInApp}/>}
      <Routes>
        <Route exact path="/" element={<Homepage />}/>
        <Route path="/search/:id" element={<RestaurantsContainer setSearch={setSearch}/>}/>
        <Route path="/restaurant/:id" element={<Restaurant setRestaurantInApp={setRestaurantInApp}/>}/>
        <Route path="/dish/:id" element={<Dish />}/>
      </Routes>
    </div>
  );
}

export default App;

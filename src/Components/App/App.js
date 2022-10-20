import React, { useState } from 'react';
import Homepage from '../Homepage/Homepage';
import './App.css';
import { Route, Routes, useLocation} from "react-router-dom";
import RestaurantsContainer from '../RestaurantsContainer/RestaurantsContainer'
import Restaurant from '../Restaurant/Restaurant';
import Dish from '../Dish/Dish';
import SideContainer from '../SideContainer/SideContainer';
import Header from '../Header/Header';
// import NewDishReviewForm from '../NewDishReviewForm/NewDishReviewForm';

const App = () => {
  const [search, setSearch] = useState("")
  const [restaurantInApp, setRestaurantInApp] = useState("")
  const [user] = useState({"user":{"id":"1","email":"eli@eli.com","username":"PHIL","__typename":"User"}})
  const location = useLocation()
  // const [dish, setDish] = useState("")

  return (
    <div className="App">
      {location.pathname !== "/" && <Header/>}
      {location.pathname !== "/" && <SideContainer search={search} restaurantInApp={restaurantInApp} username={user.user.username}/>}
      <Routes>
        <Route exact path="/" element={<Homepage />}/>
        <Route path="/search/:id" element={<RestaurantsContainer setSearch={setSearch}/>}/>
        <Route path="/restaurant/:id" element={<Restaurant setRestaurantInApp={setRestaurantInApp} user={user.user}/>}/>
        <Route path="/dish/:id" element={<Dish />}/>
        {/* <Route path="/restaurant/newDishForm" element={<NewDishReviewForm/>}/> */}
      </Routes>
    </div>
  );
}

export default App;

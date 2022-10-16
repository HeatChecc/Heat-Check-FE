import React, { useEffect, useState } from 'react'
import "./Restaurant.css"
import { useParams } from 'react-router-dom'
import NewDishReviewForm from '../NewDishReviewForm/NewDishReviewForm';
import OldDishReviewForm from '../OldDishReviewForm/OldDishReviewForm';

const Restaurant = ({ setRestaurantInApp }) => {
  let { id } = useParams();
  setRestaurantInApp(id)
  const [restaurant, setRestaurant] = useState("")
  const [location, setLocation] = useState("")
  const [newDishes, setNewDishes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showOldForm, setShowOldForm] = useState(false)
  const [oldDishObject, setOldDishObject] = useState({})

  const addDish = (newDish) => {
    setNewDishes([...newDishes, newDish])
  }

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer dJEWPcptSi0S89Fq0IOr6VU9OSmNVpfAP-L4Xmr0U3fNtUty7b2PeRmQylJCH_QGk5dcq2lUdlIt-juVbw4De3V9dPToVlq_7lT3kal84w1b3PPz1ytGx1es6vlKY3Yx");

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://arcane-hollows-12884.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setRestaurant(result)
        setLocation(result.location.display_address[2])
      })
      .catch(error => console.log('error', error));
  }, [id])

  const dishCard = () => {
    return newDishes.map(dish => {
      const oldFormSetUp = () => {
        setShowOldForm(true)
        setOldDishObject({
          dishId: dish.dishId,
          name: dish.name,
        })
      }
      return (<div key={dish.dishId}>
        <div>{dish.name}</div>
        <div>rating</div>
        <button onClick={() => oldFormSetUp()}>review</button>
        <div>{dish.description}</div>
      </div>)
    })
  }

  return (
    <div className='restaurantPage'>
      <h2 className='cityName'>{location}</h2>
      <h1>{restaurant.name}</h1>
      <div className='menuList'>
        <div className='menuHeader'>
          <h2 className='menuTitle'>Hot Menu</h2>
          <button className='addNewDishButton' onClick={() => setShowForm(true)}>Add New Dish Review</button>
          {showForm ? <NewDishReviewForm id={id} addDish={addDish} setShowForm={setShowForm} /> : null}
          {showOldForm ? <OldDishReviewForm oldDishObject={oldDishObject} setShowOldForm={setShowOldForm} /> : null}
        </div>

        <div className='dishList'>
          {newDishes.length && dishCard()}
        </div>
      </div>
    </div>
  )
}

export default Restaurant
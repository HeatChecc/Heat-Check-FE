import React, { useState } from 'react'
import { gql, useQuery} from '@apollo/client'
import "./Restaurant.css"
import { useParams } from 'react-router-dom'
import NewDishReviewForm from '../NewDishReviewForm/NewDishReviewForm';
import OldDishReviewForm from '../OldDishReviewForm/OldDishReviewForm';
import DishCard from '../DishCard/DishCard';
import Modal from "react-modal";
import Loading from '../Loading/Loading'

const Restaurant = ({ setRestaurantInApp }) => {
  let { id } = useParams();
  setRestaurantInApp(id)
  const [newDishes, setNewDishes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showOldForm, setShowOldForm] = useState(false)
  const [oldDishObject, setOldDishObject] = useState({})
  const [isOpen, setIsOpen] = useState(false);

  const GET_RESTAURANT = gql`
  query Restaurant($yelp_id: String! ) {
    restaurant(id: $yelp_id) {
      id
      name
      rating
      price
      imageUrl
      url
      categories
      address
      phone
      lat
      lon
      city
      dishes {
        id
        name
        yelpId
        spiceRating
        reviews {
          id
          description
          }
        }
      }
    }
  `;

  const addDish = (newDish) => {
    setNewDishes([...newDishes, newDish])
  }

  const toggleModal = () => {
    setShowForm(true)
    setIsOpen(!isOpen);
  }

  const dishCards = newDishes.map(dish => {
    const { dishId, name, rating, reviewcheck } = dish
    return <DishCard
      key={dishId}
      dishId={dishId}
      name={name}
      rating={rating}
      description={reviewcheck}
      setShowOldForm={setShowOldForm}
      setShowForm={setShowForm}
      setOldDishObject={setOldDishObject}
      toggleModal={toggleModal}
    />
  })

  function DisplayRestaurant() {
    const { loading, error, data } = useQuery(GET_RESTAURANT, {variables: {yelp_id: id}});
  
    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;
    setNewDishes(data.restaurant.dishes)
    return(
      <>
        <h2 className='cityName'>{data.restaurant.address}</h2>
        <h1 className='restaurantName'>{data.restaurant.name}</h1>
        <div className='menuList'>
          <div className='menuHeader'>
            <h2 className='menuTitle'>Hot Menu</h2>
            <button className='addNewDishButton' onClick={() => toggleModal()}>Add New Dish Review</button>
            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="My dialog"
              className="mymodal"
              overlayClassName="myoverlay"
              closeTimeoutMS={500}
            >
              {showForm && <NewDishReviewForm
                id={id}
                addDish={addDish}
                setShowForm={setShowForm}
                toggleModal={toggleModal} />}
              {showOldForm && <OldDishReviewForm
                oldDishObject={oldDishObject}
                setShowOldForm={setShowOldForm}
                toggleModal={toggleModal} />}
            </Modal>
          </div>

          <div className='dishList'>
            {dishCards}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='restaurantPage'>
      <DisplayRestaurant />
    </div>
  )
}

export default Restaurant
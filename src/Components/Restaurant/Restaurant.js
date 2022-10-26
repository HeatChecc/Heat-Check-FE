import React, { useState } from 'react'
import { gql, useQuery} from '@apollo/client'
import "./Restaurant.css"
import { useParams } from 'react-router-dom'
import NewDishReviewForm from '../NewDishReviewForm/NewDishReviewForm';
import DishCard from '../DishCard/DishCard';
import Modal from "react-modal";
import Loading from '../Loading/Loading'

const Restaurant = ({ setRestaurantInApp, user }) => {
  let { id } = useParams();
  setRestaurantInApp(id)
  const [newDishes, setNewDishes] = useState([])
  const [showForm, setShowForm] = useState(false)
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
        cuisineType
        yelpId
        spiceRating
        reviews {
          id
          description
          overallRating
          userId
          }
        }
      }
    }
  `;

  const toggleModal = () => {
    setShowForm(true)
    setIsOpen(!isOpen)
  }

  const dishCards = newDishes.map(dish => {
    const { name, spiceRating, reviews } = dish
    return <DishCard
      dishId={dish.id}
      name={name}
      user={user}
      rating={spiceRating}
      reviews={reviews}
      getRestaurant={GET_RESTAURANT}
      restaurantId={id}
    />
  })

  function DisplayRestaurant({ user }) {
    const { loading, error, data } = useQuery(GET_RESTAURANT, {variables: {yelp_id: id}});
  
    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;
    // console.log(data.restaurant.dishes)
    setNewDishes(data.restaurant.dishes)
    return(
      <>
        <h2 className='cityName'>{data.restaurant.address}</h2>
        <h1 className='restaurantName'>{data.restaurant.name}</h1>
        <div className='menuList'>
          <div className='menuHeader'>
            <h2 className='menuTitle'>Hot Menu</h2>
            {user.id && <button className='addNewDishButton' onClick={() => toggleModal()}>Add New Dish Review</button>}
            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="My dialog"
              className="mymodal"
              overlayClassName="myoverlay"
              closeTimeoutMS={500}
            >
              {showForm && <NewDishReviewForm
                restaurantId={id}
                user={user}
                setShowForm={setShowForm}
                category={data.restaurant.categories}
                getRestaurant={GET_RESTAURANT}
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
      <DisplayRestaurant user={user} />
    </div>
  )
}

export default Restaurant
import React, { useState } from 'react'
import "./DishCard.css"
// import { Link } from "react-router-dom";
import Modal from "react-modal";
import Dish from '../Dish/Dish';
// Modal.setAppElement("#root")
import { gql, useMutation, useQuery } from '@apollo/client'
import Loading from '../Loading/Loading';

const DishCard = ({ dishId, name, rating, description, setShowOldForm, setOldDishObject, setShowForm, toggleModal, getDishReviews, getRestaurant, restaurantId, user }) => {
  const [dishNameClicked, setDishNameClicked] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const oldFormSetUp = () => {
    setShowOldForm(true)
    setOldDishObject({
      dishId: dishId,
      name: name,
    })
    toggleModal()
    setShowForm(false)
  }

  const toggleDishModal = () => {
    setDishNameClicked(true)
    setIsOpen(!isOpen);
  }

  const DELETE_DISH = gql`
      mutation deleteDish($id: ID!){
        dish: deleteDish(
          input: {
            id: $id
          }) {
          id
        }
      }
      `

  function RandomDishReview() {
    const { loading, error, data } = useQuery(getDishReviews, {variables: {id: dishId}});
    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;

    if(data.dish.reviews.length > 0) {
      let reviewIndex = Math.floor(Math.random() * data.dish.reviews.length);
      return <p className='randomReviewClass'> A user said: "{data.dish.reviews[reviewIndex].description}"</p>
    } else {
      return <p className='randomReviewClass'>There are no reviews for this HAWT dish yet🥵</p>
    }
  }

  function RemoveDish() {

  const [deleteDish, { error, loading}] = useMutation(DELETE_DISH, {
    refetchQueries: [
      {query: getRestaurant,
        variables:{
          yelp_id: restaurantId
        }}
    ]
  })

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  const handleClick = () => {
    deleteDish({
      variables: {
        id: dishId
      }
    })
  }


  return (
    <div className='dishCardInfo'>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleDishModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        {dishNameClicked && <Dish dishId={dishId} name={name} toggleDishModal={toggleDishModal} setDishNameClicked={setDishNameClicked} getDishReviews={getDishReviews} />}
      </Modal>
      <div className='dishTopInfo'>
        <h2 className='dishName' onClick={() => toggleDishModal()}>{name}</h2>
        <p>{rating}X🌶</p>
        {user.id && <button className="reviewExistingDishButton" onClick={() => oldFormSetUp()}>Review Dish</button>}
        {user.id && <button className='deleteDishButton' onClick={() => handleClick()} > Delete Dish </button>}
      </div>
        <RandomDishReview />
    </div>
  )
  }

  return (
    <div className='dishCard'>
      <RemoveDish />
    </div>
  )
}

export default DishCard
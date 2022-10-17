import React, { useState } from 'react'
import fireIcon from '../Images/fire-svgrepo-com.svg'
import bathroomLogo from "../Images/gotta-go.png"
import "./NewDishReview.css"

const NewDishReviewForm = ({id, addDish, setShowForm, toggleModal}) => {
  const [dishName, setDishName] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault()
    const newDish = {
      restaurantId: id,
      dishId: Date.now(),
      name: dishName,
      description: description,
      rating: rating
    }
    addDish(newDish)
    setShowForm(false)
    toggleModal()
  }

  return (
    <div className='newFormPage'>
      <img onClick={() => toggleModal()} className="exitModalImage" src={bathroomLogo} alt="close modal"/>
      <form  className="newDishForm" onSubmit={handleSubmit}>
        <div className='ratingContainer'>
          <img className="fire" src={fireIcon} alt='fire1' onClick={() => {setRating(1)}}></img>
          <img className="fire" src={fireIcon} alt='fire2' onClick={() => {setRating(2)}}></img>
          <img className="fire" src={fireIcon} alt='fire3' onClick={() => {setRating(3)}}></img>
          <img className="fire" src={fireIcon} alt='fire4' onClick={() => {setRating(4)}}></img>
          <img className="fire" src={fireIcon} alt='fire5' onClick={() => {setRating(5)}}></img>
          <p className='spiceRating'>rating: {rating} </p>
        </div>
        <div className='inputSection'>
          <input
            placeholder='Dish Name'
            value={dishName}
            onChange={(event) => setDishName(event.target.value)}
            name='dishName'
          />
          <input
            placeholder='How hot was it?'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            name='description'
          />
          <button className="submitNewDishButton" type='submit'>Add New Dish Review</button>
        </div>
      </form>
    </div>
  )
}

export default NewDishReviewForm
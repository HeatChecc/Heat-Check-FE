import React, { useState } from 'react'
import fireIcon from '../Images/fire-svgrepo-com.svg'
import "./NewDishReview.css"

const NewDishReviewForm = ({id, addDish, setShowForm}) => {
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
  }

  return (
    <div>
      NewDishReviewForm
      <form onSubmit={handleSubmit}>
        <div className='ratingContainer'>
          <img src={fireIcon} alt='fire1' onClick={() => {setRating(1)}}></img>
          <img src={fireIcon} alt='fire2' onClick={() => {setRating(2)}}></img>
          <img src={fireIcon} alt='fire3' onClick={() => {setRating(3)}}></img>
          <img src={fireIcon} alt='fire4' onClick={() => {setRating(4)}}></img>
          <img src={fireIcon} alt='fire5' onClick={() => {setRating(5)}}></img>
          <p>rating: {rating} </p>
        </div>

        <input
          placeholder='New Dish?'
          value={dishName}
          onChange={(event) => setDishName(event.target.value)}
          name='dishName'
        ></input>

        <input
          placeholder='Review...'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          name='description'
        ></input>
        <button type='submit'>Add New Dish</button>
      </form>
    </div>
  )
}

export default NewDishReviewForm
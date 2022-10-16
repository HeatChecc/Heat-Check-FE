import React, { useState } from 'react'
import "./NewDishReview.css"

const NewDishReviewForm = ({id, addDish, setShowForm}) => {
  const [dishName, setDishName] = useState('')
  const [description, setDescription] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    const newDish = {
      restaurantId: id,
      dishId: Date.now(),
      name: dishName,
      description: description
    }
    addDish(newDish)
    setShowForm(false)
  }

  return (
    <div>
      NewDishReviewForm
      <form onSubmit={handleSubmit}>
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
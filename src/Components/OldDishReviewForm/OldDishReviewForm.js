import React, {useState} from 'react'
import "./OldDishReviewForm.css"


const OldDishReviewForm = ({oldDishObject, setShowOldForm}) => {
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')

  return (
    <div>
      OldDishReviewForm
      <form>
        <select
          placeholder='Dish Name...'
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          name='rating'
        ></select>

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

export default OldDishReviewForm
import React, {useState} from 'react'
import "./OldDishReviewForm.css"
import fireIcon from '../Images/fire-svgrepo-com.svg'

const OldDishReviewForm = ({oldDishObject, setShowOldForm}) => {
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')

  return (
    <div>
      OldDishReviewForm
      <form>
        <div className='ratingContainer'>
          <img src={fireIcon} alt='fire1' onClick={() => {setRating(1)}}></img>
          <img src={fireIcon} alt='fire2' onClick={() => {setRating(2)}}></img>
          <img src={fireIcon} alt='fire3' onClick={() => {setRating(3)}}></img>
          <img src={fireIcon} alt='fire4' onClick={() => {setRating(4)}}></img>
          <img src={fireIcon} alt='fire5' onClick={() => {setRating(5)}}></img>
          <p>rating: {rating} </p>
        </div>

        <input
          placeholder='Review...'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          name='description'
        ></input>
        <button type='submit'>Add New Review</button>
      </form>
      </div>
  )
}

export default OldDishReviewForm
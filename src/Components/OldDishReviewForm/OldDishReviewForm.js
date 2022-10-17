import React, { useState } from 'react'
import "./OldDishReviewForm.css"
import fireIcon from '../Images/fire-svgrepo-com.svg'
import bathroomLogo from "../Images/gotta-go.png"

const OldDishReviewForm = ({ oldDishObject, setShowOldForm, toggleModal }) => {
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!description || !rating) {
      return
    }
    setShowOldForm(false)
    toggleModal()
  }

  return (
    <div className='oldFormPage'>
      <img onClick={() => toggleModal()} className="exitModalImage" src={bathroomLogo} alt="close modal" />
      <form className="oldDishForm" onSubmit={handleSubmit}>
        <div className='ratingContainer'>
          <img className="fire" src={fireIcon} alt='fire1' onClick={() => { setRating(1) }}></img>
          <img className="fire" src={fireIcon} alt='fire2' onClick={() => { setRating(2) }}></img>
          <img className="fire" src={fireIcon} alt='fire3' onClick={() => { setRating(3) }}></img>
          <img className="fire" src={fireIcon} alt='fire4' onClick={() => { setRating(4) }}></img>
          <img className="fire" src={fireIcon} alt='fire5' onClick={() => { setRating(5) }}></img>
          <p className='spiceRating'>rating: {rating} </p>
        </div>

        <div className='inputSection'>
        <input
          placeholder='Review...'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          name='description'
        ></input>
        <button type='submit'>Add New Review</button>
        </div>
      </form>
    </div>
  )
}

export default OldDishReviewForm
import React, { useState } from 'react'
import { gql, useMutation} from '@apollo/client'
import "./OldDishReviewForm.css"
import bathroomLogo from "../Images/gotta-go2.png"
import Loading from '../Loading/Loading'

const OldDishReviewForm = ({ id, user, getDishReviews, toggleModal }) => {

  const ADD_REVIEW_TO_DISH = gql`
  mutation AddReview ($description: String!, $overallRating: Int!, $userId: ID!, $dishId: ID!){
    review: createReview(
      input: {
        description: $description
        overallRating: $overallRating
        userId: $userId
        dishId: $dishId
      }
  ) {
      description
      overallRating
      userId
      dishId
    }
  }
  `

  function ExistingDishForm() {
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')
    const [addReview, { loading, error}] = useMutation(ADD_REVIEW_TO_DISH, {
      refetchQueries: [
        {query: getDishReviews,
          variables:{
            id: id
          }}
      ],
    })

    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;

    const handleSubmit = (event) => {
      event.preventDefault()
      if (!description || !rating) {
        return
      }
      addReview({ variables: {
        description: description,
        overallRating: rating,
        userId: user.id,
        dishId: id,
      }})
      toggleModal()
    }

    return (
      <div className='oldFormPage'>
        <img onClick={() => toggleModal()} className="exitModalImage" src={bathroomLogo} alt="close modal" />
        <form className="oldDishForm" onSubmit={handleSubmit}>
          <div className='ratingContainer'>
          <i className="em em-confused" onClick={() => {setRating(1)}} aria-label="CONFUSED FACE"></i>
          <i className="em em-thinking_face" onClick={() => {setRating(2)}} aria-label="THINKING FACE"></i>
          <i className="em em-flushed" onClick={() => {setRating(3)}} aria-label="FLUSHED FACE"></i>
          <i className="em em-hot_face" onClick={() => {setRating(4)}} aria-label="OVERHEATED FACE"></i>
          <div className='womboCombo' onClick={() => {setRating(5)}}>
            <i className="em em-fire" aria-label="FIRE"></i>
            <i className="em em-toilet" aria-label="TOILET"></i>
          </div>
          </div>
            <p className='spiceRating'>rating: {rating} </p>
  
          <div className='inputSection'>
          <input
            className='dishReviewInput'
            placeholder='Review...'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            name='description'
          ></input>
          <button className="submitNewReviewButton" type='submit'>Add Review</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className='addReviewForm'>
      <ExistingDishForm />
    </div>
  )
  }


export default OldDishReviewForm
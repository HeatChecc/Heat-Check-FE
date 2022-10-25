import React, { useState } from 'react'
import bathroomLogo from "../Images/gotta-go2.png"
import { gql, useMutation} from '@apollo/client'
import Loading from '../Loading/Loading'
import "./NewDishReview.css"

const NewDishReviewForm = ({id, addDishToArray, setShowForm, toggleModal, user, category, getRestaurant}) => {

  const ADD_DISH = gql`
  mutation AddDish($name: String!, $cuisineType: String!, $yelpId: String!, $spiceRating: Int!){
    dish: createDish(
      input: {
        name: $name
        cuisineType: $cuisineType
        yelpId: $yelpId
        spiceRating: $spiceRating
      }
    ) {
      name
      cuisineType
      yelpId
      spiceRating
    }
  }
  `
function Form() {
  const [dishName, setDishName] = useState('')
  // const [description, setDescription] = useState('')
  const [rating, setRating] = useState(0)
  const [addDish, { loading, error}] = useMutation(ADD_DISH, {
    refetchQueries: [
      {query: getRestaurant,
        variables:{
          yelp_id: id
        }}
    ],
  })

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!dishName || !rating) {
      return
    }
    addDish({ variables: {
      name: dishName,
      cuisineType: category,
      yelpId: id,
      spiceRating: rating
    }})
    setShowForm(false)
    toggleModal()
  }

  return (
    <div className='newFormPage'>
      <img onClick={() => toggleModal()} className="exitModalImage" src={bathroomLogo} alt="close modal"/>
      <form  className="newDishForm" onSubmit={handleSubmit}>
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
            className='dishNameInput'
            placeholder='Dish Name'
            value={dishName}
            onChange={(event) => setDishName(event.target.value)}
            name='dishName'
          />
          <button className="submitNewDishButton" type='submit'>Add Dish</button>
        </div>
      </form>
    </div>
  )
}

return (
  <div className='addDishForm'>
    <Form/>
  </div>
)

}

export default NewDishReviewForm
import React from 'react'
import "./DishCard.css"
import { Link } from "react-router-dom";
import { gql, useMutation} from '@apollo/client'
import Loading from '../Loading/Loading';


const DishCard = ({ dishId, name, rating, getRestaurant, reviews, user, restaurantId }) => {

  const printPeppers = () => {
    console.log(rating)
    let spiceRatingIndex;
    if(reviews.length > 0) {
      spiceRatingIndex = Math.floor(Math.random() * reviews.length);
      console.log(reviews[spiceRatingIndex].overallRating)
      if (reviews[spiceRatingIndex].overallRating === 1) {
        return <>🌶</>
      } else if (reviews[spiceRatingIndex].overallRating === 2) {
        return <>🌶🌶</>
      } else if (reviews[spiceRatingIndex].overallRating === 3) {
        return <>🌶🌶🌶</>
      } else if (reviews[spiceRatingIndex].overallRating === 4) {
        return <>🌶🌶🌶🌶</>
      }
      else if (reviews[spiceRatingIndex].overallRating === 5) {
        return <>🌶🌶🌶🌶🌶</>
      }
    } else {
      if (rating === 1) {
        return <>🌶</>
      } else if (rating === 2) {
        return <>🌶🌶</>
      } else if (rating === 3) {
        return <>🌶🌶🌶</>
      } else if (rating === 4) {
        return <>🌶🌶🌶🌶</>
      }
      else if (rating === 5) {
        return <>🌶🌶🌶🌶🌶</>
      }
    }
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
    if(reviews.length > 0) {
      let reviewIndex = Math.floor(Math.random() * reviews.length);
      return <p className='randomReviewClass'> A user said: "{reviews[reviewIndex].description}"</p>
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
      <div className='dishTopInfo'>
      <Link className="dishName" to={`/dish/${dishId}`}> {name} </Link>
        <p className='pepperRating'>Rating: {printPeppers()}</p>
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
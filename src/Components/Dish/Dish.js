import React from 'react'
import {useQuery} from '@apollo/client'
import "./Dish.css"
import Loading from '../Loading/Loading'
import Review from '../Review/Review'

const Dish = ({dishId, name, toggleDishModal, setDishNameClicked, getDishReviews}) => {

  const setDefault = () => {
    toggleDishModal()
    setDishNameClicked(false)
  }

  function DishComponent() {
    const { loading, error, data } = useQuery(getDishReviews, {variables: {id: dishId}});
    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;

    const reviewCards = data.dish.reviews.map(review => {
      const {description, overallRating, id} = review
      return <Review key={id} description={description} overallRating={overallRating}/>
    })

    return (
      <div className='dishDetails'>
        <button className='backButton' onClick={() => setDefault()}>Go Back</button>
        <h2 className='dishName'>{name}</h2>
        <h2 className='reviewsHeader'>Customer Reviews</h2>
        <div className='reviewsContainer'>
          {reviewCards}
        </div>
      </div>
    )
  }

  return (
    <div>
      <DishComponent />
    </div>
  )
  
}

export default Dish
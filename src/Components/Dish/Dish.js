import React from 'react'
import {useQuery} from '@apollo/client'
import "./Dish.css"
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'

const Dish = ({dishId, name, toggleDishModal, setDishNameClicked, getDishReviews}) => {
  let {id} = useParams()

  const setDefault = () => {
    toggleDishModal()
    setDishNameClicked(false)
  }

  function DishComponent() {
    const { loading, error, data } = useQuery(getDishReviews, {variables: {id: dishId}});
    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;

    console.log(data.dish.reviews)
    const reviewCards = data.dish.reviews.map(review => {
      const {description, overallRating, id} = review
      return <div className='reviewContainer' key={id}>
              <p>{description}</p>
              <p>{overallRating}X🌶</p>
            </div>
    })

    return (
      <div className='dishDetails'>
        Dish page. This will one day do a call using the id: {id}
        <h2 className='dishName'>{name}</h2>
        <button className='backButton' onClick={() => setDefault()}>Go Back</button>
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
import React, { useState } from 'react'
import { gql, useQuery} from '@apollo/client'
import { useParams } from 'react-router-dom'
import "./Dish.css"
import Loading from '../Loading/Loading'
import OldDishReviewForm from '../OldDishReviewForm/OldDishReviewForm'
import Review from '../Review/Review'
import Modal from "react-modal";

const Dish = ({user, lastRestaurant}) => {
  let { id } = useParams();
  let [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const GET_DISH_REVIEWS = gql`
  query Dish($id: ID! ) {
    dish(id: $id) {
      id
      name
      cuisineType
      yelpId
      spiceRating
      reviews {
        id
        description
        overallRating
        userId
        dishId
      }
    }
  }
  `;

  function DishComponent() {
    const { loading, error, data } = useQuery(GET_DISH_REVIEWS, {variables: {id: id}});
    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;

    const reviewCards = data.dish.reviews.map(review => {
      const {description, overallRating, id, userId} = review
      return <Review key={id} description={description} overallRating={overallRating} userId={userId}/>
    })

    return (
      <div className='dishDetails'>
        <h2 className='dish'>{data.dish.name}{user.id && <button className='reviewFormButton' onClick={() => toggleModal()}>Add Review</button>}</h2>
        <h2 className='reviewsHeader'>Customer Reviews</h2>
        <div className='reviewsContainer'>
          {data.dish.reviews.length !== 0 ? reviewCards : <p className="noReviewText">No reviews yet.</p>}
        </div>
        <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="My dialog"
              className="mymodal"
              overlayClassName="myoverlay"
              closeTimeoutMS={500}
            >
        <OldDishReviewForm
    id={id}
    user={user}
    toggleModal={toggleModal}
    getDishReviews={GET_DISH_REVIEWS} />
        </Modal>
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
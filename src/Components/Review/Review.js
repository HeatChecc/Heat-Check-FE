import React from 'react'
import "./Review.css"

const Review = ({description, overallRating}) => {

  return (
  <div className='review'>
    <div className='reviewDetails'>
    <p className='reviewDescription'>{description}    {overallRating}X🌶</p>
    </div>
  </div>
  )
}

export default Review
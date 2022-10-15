import React from 'react'
import "./ReviewsContainer.css"
import { useParams } from 'react-router-dom'

const ReviewsContainer = () => {
  let {id} = useParams();
  return (
    <div>ReviewsContainer. This will one day do a call utilizing the id:{id}</div>
  )
}

export default ReviewsContainer